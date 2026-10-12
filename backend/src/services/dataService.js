import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Club } from '../models/Club.js';
import { 
  Leader, 
  getLeaderSubModel, 
  getAllLeaderSubModels, 
  getModelByCollectionName,
  LEADER_COLLECTIONS,
  LEADER_MODELS 
} from '../models/Leader.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { Gallery } from '../models/Gallery.js';
import { Setting } from '../models/Setting.js';


export const dataService = {
  // === CLUBS ===
  async getClubs() {
    return await Club.find().sort({ order: 1 });
  },

  async getClubBySlug(slug) {
    return await Club.findOne({ slug });
  },

  async createClub(data) {
    const club = new Club(data);
    return await club.save();
  },

  async updateClub(slug, data) {
    return await Club.findOneAndUpdate({ slug }, data, { new: true });
  },

  async deleteClub(slug) {
    return await Club.findOneAndDelete({ slug });
  },

  // === EVENTS ===
  async getEvents(filter = {}) {
    return await Event.find(filter).sort({ date: -1 });
  },

  async getEventByIdOrSlug(idOrSlug) {
    return await Event.findOne({
      $or: [{ slug: idOrSlug }, { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }]
    });
  },

  async createEvent(data) {
    const event = new Event(data);
    return await event.save();
  },

  async updateEvent(id, data) {
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    return await Event.findOneAndUpdate(filter, data, { new: true });
  },

  async deleteEvent(id) {
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    return await Event.findOneAndDelete(filter);
  },

  // === LEADERSHIP (6 DEDICATED COLLECTIONS) ===
  async getLeadership(filter = {}, collectionName = null) {
    // If a specific collection is requested
    if (collectionName) {
      const TargetModel = getModelByCollectionName(collectionName);
      if (TargetModel) {
        const docs = await TargetModel.find(filter).sort({ order: 1 }).lean();
        return docs.map(d => ({
          ...d,
          id: d._id ? d._id.toString() : null,
          collectionName: TargetModel.collection.name
        }));
      }
    }

    // Aggregate from all 6 dedicated collections
    const subModels = getAllLeaderSubModels();
    const results = await Promise.all(
      subModels.map(async (model) => {
        try {
          const docs = await model.find(filter).sort({ order: 1 }).lean();
          return docs.map(d => ({
            ...d,
            id: d._id ? d._id.toString() : null,
            collectionName: model.collection.name
          }));
        } catch (err) {
          console.warn(`Error reading ${model.collection.name}:`, err.message);
          return [];
        }
      })
    );

    const allLeaders = results.flat();

    // Fallback if all 6 collections are empty: check legacy Leader
    if (allLeaders.length === 0) {
      try {
        const legacyDocs = await Leader.find(filter).sort({ order: 1 }).lean();
        if (legacyDocs && legacyDocs.length > 0) {
          return legacyDocs.map(d => ({
            ...d,
            id: d._id ? d._id.toString() : null,
            collectionName: 'leaders'
          }));
        }
      } catch (lErr) {
        // safe ignore
      }
    }

    return allLeaders.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getLeadershipByCollections(filter = {}) {
    const subModels = getAllLeaderSubModels();
    const collections = {};
    const counts = {};

    await Promise.all(
      subModels.map(async (model) => {
        const cName = model.collection.name;
        try {
          const docs = await model.find(filter).sort({ order: 1 }).lean();
          const mapped = docs.map(d => ({
            ...d,
            id: d._id ? d._id.toString() : null,
            collectionName: cName
          }));
          collections[cName] = mapped;
          counts[cName] = mapped.length;
        } catch (err) {
          collections[cName] = [];
          counts[cName] = 0;
        }
      })
    );

    return { collections, counts };
  },

  async getLeaderById(id) {
    const subModels = getAllLeaderSubModels();
    for (const model of subModels) {
      const doc = await model.findById(id).lean();
      if (doc) {
        return {
          ...doc,
          id: doc._id ? doc._id.toString() : null,
          collectionName: model.collection.name
        };
      }
    }
    const legacy = await Leader.findById(id).lean();
    if (legacy) {
      return {
        ...legacy,
        id: legacy._id ? legacy._id.toString() : null,
        collectionName: 'leaders'
      };
    }
    return null;
  },

  async createLeader(data) {
    const SubModel = getLeaderSubModel(data.roleType);
    const newDoc = new SubModel(data);
    const saved = await newDoc.save();
    const obj = saved.toObject();
    obj.id = saved._id.toString();
    obj.collectionName = SubModel.collection.name;

    try {
      await Leader.findByIdAndUpdate(saved._id, saved.toObject(), { upsert: true, new: true });
    } catch (e) {
      // safe ignore
    }

    return obj;
  },

  async updateLeader(id, data) {
    const subModels = getAllLeaderSubModels();
    let currentModel = null;
    let existingDoc = null;

    for (const m of subModels) {
      const found = await m.findById(id);
      if (found) {
        currentModel = m;
        existingDoc = found;
        break;
      }
    }

    if (!existingDoc) {
      const legacy = await Leader.findById(id);
      if (legacy) {
        currentModel = Leader;
        existingDoc = legacy;
      }
    }

    if (!existingDoc) {
      return null;
    }

    const targetSubModel = data.roleType ? getLeaderSubModel(data.roleType) : currentModel;

    // If roleType moves doc to a different collection
    if (targetSubModel && currentModel && targetSubModel.collection.name !== currentModel.collection.name) {
      await currentModel.findByIdAndDelete(id);
      const updatedData = { ...existingDoc.toObject(), ...data, _id: id };
      const movedDoc = await targetSubModel.findByIdAndUpdate(id, updatedData, { upsert: true, new: true }).lean();
      return {
        ...movedDoc,
        id: movedDoc._id ? movedDoc._id.toString() : null,
        collectionName: targetSubModel.collection.name
      };
    }

    const updated = await currentModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return {
      ...updated,
      id: updated._id ? updated._id.toString() : null,
      collectionName: currentModel.collection.name
    };
  },

  async deleteLeader(id) {
    const subModels = getAllLeaderSubModels();
    let deletedDoc = null;

    for (const m of subModels) {
      const doc = await m.findByIdAndDelete(id);
      if (doc) {
        deletedDoc = doc;
        break;
      }
    }

    if (!deletedDoc) {
      deletedDoc = await Leader.findByIdAndDelete(id);
    }

    return deletedDoc;
  },

  async reorderLeaders(items) {
    const subModels = getAllLeaderSubModels();
    for (const item of items) {
      const { id, order } = item;
      if (!id || order === undefined) continue;

      let updated = false;
      for (const model of subModels) {
        const res = await model.findByIdAndUpdate(id, { order }, { new: true });
        if (res) {
          updated = true;
          break;
        }
      }
      if (!updated) {
        await Leader.findByIdAndUpdate(id, { order });
      }
    }
    return true;
  },

  // === ANNOUNCEMENTS ===
  async getAnnouncements(filter = {}) {
    let q = Announcement.find(filter);
    if (!filter.clubSlug) {
      q = q.sort({ priority: -1, createdAt: -1 });
    } else {
      q = q.sort({ createdAt: -1 });
    }
    return await q.exec();
  },

  async createAnnouncement(data) {
    const a = new Announcement(data);
    return await a.save();
  },

  async updateAnnouncement(id, data) {
    return await Announcement.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteAnnouncement(id) {
    return await Announcement.findByIdAndDelete(id);
  },

  // === GALLERY ===
  async getGallery(filter = {}) {
    return await Gallery.find(filter).sort({ date: -1, order: 1, createdAt: 1 });
  },

  async getGalleryItemById(id) {
    return await Gallery.findById(id);
  },

  async createGalleryItem(data) {
    const g = new Gallery(data);
    return await g.save();
  },

  async updateGalleryItem(id, data) {
    return await Gallery.findByIdAndUpdate(id, data, { new: true });
  },

  async renameGalleryAlbum(oldAlbumName, newAlbumName, extraData = {}) {
    const filter = { albumName: oldAlbumName };
    const update = {
      albumName: newAlbumName,
      folderSlug: newAlbumName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    };
    if (extraData.category) update.category = extraData.category;
    if (extraData.clubSlug) update.clubSlug = extraData.clubSlug;
    if (extraData.date) update.date = extraData.date;
    return await Gallery.updateMany(filter, { $set: update });
  },

  async deleteGalleryItem(id) {
    return await Gallery.findByIdAndDelete(id);
  },

  // === SETTINGS ===
  async getSettings() {
    let config = await Setting.findOne();
    if (!config) {
      config = await Setting.create({ lastUpdated: new Date() });
    }
    return config;
  },

  async updateSettings(data) {
    return await Setting.findOneAndUpdate({}, { ...data, lastUpdated: new Date() }, { new: true, upsert: true });
  },

  // === ADMIN / USERS ===
  async findUserByUsernameOrEmail(identifier) {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });
    if (user) return user;

    // Environment Super Admin fallback
    const envUser = (process.env.ADMIN_USERNAME || 'praxis_admin').trim().toLowerCase();
    const envPass = process.env.ADMIN_PASSWORD || 'praxis_sdes@2026';
    const cleanId = String(identifier || '').trim().toLowerCase();
    if (cleanId === envUser || cleanId === `${envUser}@praxis.sdes.ac.in`) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(envPass, salt);
      return {
        _id: 'admin-super-root',
        id: 'admin-super-root',
        username: 'praxis_admin',
        email: 'admin@praxis.sdes.ac.in',
        role: 'SUPER_ADMIN',
        fullName: 'PRAXIS Admin',
        assignedClubId: null,
        passwordHash,
        toObject() {
          return {
            _id: 'admin-super-root',
            id: 'admin-super-root',
            username: 'praxis_admin',
            email: 'admin@praxis.sdes.ac.in',
            role: 'SUPER_ADMIN',
            fullName: 'PRAXIS Admin',
            assignedClubId: null
          };
        }
      };
    }
    return null;
  },

  async findUserById(id) {
    if (id === 'admin-super-root') {
      return {
        _id: 'admin-super-root',
        id: 'admin-super-root',
        username: 'praxis_admin',
        email: 'admin@praxis.sdes.ac.in',
        role: 'SUPER_ADMIN',
        fullName: 'PRAXIS Admin',
        assignedClubId: null
      };
    }
    return await User.findById(id).select('-passwordHash');
  },

  async getAllAdmins() {
    return await User.find().select('-passwordHash').sort({ createdAt: -1 });
  },

  async createAdminUser(data) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const user = new User({
      username: data.username,
      email: data.email,
      passwordHash,
      role: data.role || 'CLUB_ADMIN',
      assignedClubId: data.assignedClubId || null,
      fullName: data.fullName || ''
    });
    return await user.save();
  },

  async deleteAdminUser(id) {
    return await User.findByIdAndDelete(id);
  },

  // Overview Stats for Admin Dashboard
  async getDashboardStats() {
    const leaderModels = getAllLeaderSubModels();
    const [clubsCount, techCount, nonTechCount, eventsCount, upcomingCount, completedCount, galleryCount, announcementsCount, ...leaderCounts] = await Promise.all([
      Club.countDocuments(),
      Club.countDocuments({ category: 'TECHNICAL' }),
      Club.countDocuments({ category: 'NON-TECHNICAL' }),
      Event.countDocuments(),
      Event.countDocuments({ status: 'UPCOMING' }),
      Event.countDocuments({ status: 'COMPLETED' }),
      Gallery.countDocuments(),
      Announcement.countDocuments(),
      ...leaderModels.map(m => m.countDocuments().catch(() => 0))
    ]);

    const totalLeaders = leaderCounts.reduce((acc, c) => acc + (c || 0), 0);

    return {
      totalClubs: clubsCount,
      technicalClubs: techCount,
      nonTechnicalClubs: nonTechCount,
      totalEvents: eventsCount,
      upcomingEvents: upcomingCount,
      completedEvents: completedCount,
      galleryCount,
      announcementsCount,
      totalLeaders
    };
  },

  async verifyAdmin(username, password) {
    const user = await this.findUserByUsernameOrEmail(username);
    if (!user) return null;
    if (user.passwordHash && await bcrypt.compare(password, user.passwordHash)) {
      return user;
    }
    if (user.password && user.password === password) {
      return user;
    }
    return null;
  }
};

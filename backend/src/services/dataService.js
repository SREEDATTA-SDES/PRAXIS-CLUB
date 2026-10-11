import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Club } from '../models/Club.js';
import { Leader } from '../models/Leader.js';
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
    return await Event.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteEvent(id) {
    return await Event.findByIdAndDelete(id);
  },

  // === LEADERSHIP ===
  async getLeadership(filter = {}) {
    return await Leader.find(filter).sort({ order: 1 });
  },

  async createLeader(data) {
    const l = new Leader(data);
    return await l.save();
  },

  async updateLeader(id, data) {
    return await Leader.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteLeader(id) {
    return await Leader.findByIdAndDelete(id);
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
    return await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
  },

  async createGalleryItem(data) {
    const g = new Gallery(data);
    return await g.save();
  },

  async updateGalleryItem(id, data) {
    return await Gallery.findByIdAndUpdate(id, data, { new: true });
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
    const envUser = process.env.ADMIN_USERNAME || 'praxis_admin';
    const envPass = process.env.ADMIN_PASSWORD || 'praxis_sdes@2026';
    if (identifier === envUser || identifier === `${envUser}@praxis.sdes.ac.in`) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(envPass, salt);
      return {
        _id: 'admin-super-root',
        id: 'admin-super-root',
        username: envUser,
        email: `${envUser}@praxis.sdes.ac.in`,
        role: 'SUPER_ADMIN',
        fullName: 'Chief System Administrator (SDES)',
        assignedClubId: null,
        passwordHash,
        toObject() {
          return {
            _id: 'admin-super-root',
            id: 'admin-super-root',
            username: envUser,
            email: `${envUser}@praxis.sdes.ac.in`,
            role: 'SUPER_ADMIN',
            fullName: 'Chief System Administrator (SDES)',
            assignedClubId: null
          };
        }
      };
    }
    return null;
  },

  async findUserById(id) {
    if (id === 'admin-super-root') {
      const envUser = process.env.ADMIN_USERNAME || 'praxis_admin';
      return {
        _id: 'admin-super-root',
        id: 'admin-super-root',
        username: envUser,
        email: `${envUser}@praxis.sdes.ac.in`,
        role: 'SUPER_ADMIN',
        fullName: 'Chief System Administrator (SDES)',
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
    const [clubsCount, techCount, nonTechCount, eventsCount, upcomingCount, completedCount, galleryCount, announcementsCount] = await Promise.all([
      Club.countDocuments(),
      Club.countDocuments({ category: 'TECHNICAL' }),
      Club.countDocuments({ category: 'NON-TECHNICAL' }),
      Event.countDocuments(),
      Event.countDocuments({ status: 'UPCOMING' }),
      Event.countDocuments({ status: 'COMPLETED' }),
      Gallery.countDocuments(),
      Announcement.countDocuments()
    ]);

    return {
      totalClubs: clubsCount,
      technicalClubs: techCount,
      nonTechnicalClubs: nonTechCount,
      totalEvents: eventsCount,
      upcomingEvents: upcomingCount,
      completedEvents: completedCount,
      galleryCount,
      announcementsCount
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

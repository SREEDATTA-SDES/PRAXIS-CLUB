import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { 
  DEFAULT_CLUBS, 
  DEFAULT_LEADERSHIP, 
  DEFAULT_EVENTS, 
  DEFAULT_ANNOUNCEMENTS, 
  DEFAULT_GALLERY, 
  DEFAULT_CONFIG, 
  DEFAULT_ADMINS 
} from '../data/defaultData.js';
import { User } from '../models/User.js';
import { Club } from '../models/Club.js';
import { Leader } from '../models/Leader.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { Gallery } from '../models/Gallery.js';
import { Setting } from '../models/Setting.js';

// In-Memory store for offline/local resilience
const memoryStore = {
  clubs: JSON.parse(JSON.stringify(DEFAULT_CLUBS)),
  leadership: JSON.parse(JSON.stringify(DEFAULT_LEADERSHIP)),
  events: JSON.parse(JSON.stringify(DEFAULT_EVENTS)),
  announcements: JSON.parse(JSON.stringify(DEFAULT_ANNOUNCEMENTS)),
  gallery: JSON.parse(JSON.stringify(DEFAULT_GALLERY)),
  settings: JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
  admins: JSON.parse(JSON.stringify(DEFAULT_ADMINS))
};

const isMongooseReady = () => mongoose.connection.readyState === 1;

export const dataService = {
  // === CLUBS ===
  async getClubs() {
    if (isMongooseReady()) {
      return await Club.find().sort({ order: 1 });
    }
    return memoryStore.clubs;
  },

  async getClubBySlug(slug) {
    if (isMongooseReady()) {
      return await Club.findOne({ slug });
    }
    return memoryStore.clubs.find(c => c.slug === slug);
  },

  async createClub(data) {
    if (isMongooseReady()) {
      const club = new Club(data);
      return await club.save();
    }
    const newClub = { id: data.slug || `club-${Date.now()}`, ...data };
    memoryStore.clubs.push(newClub);
    return newClub;
  },

  async updateClub(slug, data) {
    if (isMongooseReady()) {
      return await Club.findOneAndUpdate({ slug }, data, { new: true });
    }
    const idx = memoryStore.clubs.findIndex(c => c.slug === slug);
    if (idx !== -1) {
      memoryStore.clubs[idx] = { ...memoryStore.clubs[idx], ...data, updatedAt: new Date() };
      return memoryStore.clubs[idx];
    }
    return null;
  },

  async deleteClub(slug) {
    if (isMongooseReady()) {
      return await Club.findOneAndDelete({ slug });
    }
    const idx = memoryStore.clubs.findIndex(c => c.slug === slug);
    if (idx !== -1) {
      return memoryStore.clubs.splice(idx, 1)[0];
    }
    return null;
  },

  // === EVENTS ===
  async getEvents(filter = {}) {
    if (isMongooseReady()) {
      return await Event.find(filter).sort({ date: -1 });
    }
    let evts = [...memoryStore.events];
    if (filter.category) evts = evts.filter(e => e.category === filter.category);
    if (filter.clubSlug) evts = evts.filter(e => e.clubSlug === filter.clubSlug);
    if (filter.status) evts = evts.filter(e => e.status === filter.status);
    return evts;
  },

  async getEventByIdOrSlug(idOrSlug) {
    if (isMongooseReady()) {
      return await Event.findOne({
        $or: [{ slug: idOrSlug }, { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }]
      });
    }
    return memoryStore.events.find(e => e.id === idOrSlug || e.slug === idOrSlug);
  },

  async createEvent(data) {
    if (isMongooseReady()) {
      const evt = new Event(data);
      return await evt.save();
    }
    const newEvt = { 
      id: `evt-${Date.now()}`, 
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...data 
    };
    memoryStore.events.unshift(newEvt);
    return newEvt;
  },

  async updateEvent(idOrSlug, data) {
    if (isMongooseReady()) {
      return await Event.findOneAndUpdate(
        { $or: [{ slug: idOrSlug }, { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }] },
        data,
        { new: true }
      );
    }
    const idx = memoryStore.events.findIndex(e => e.id === idOrSlug || e.slug === idOrSlug);
    if (idx !== -1) {
      memoryStore.events[idx] = { ...memoryStore.events[idx], ...data, updatedAt: new Date() };
      return memoryStore.events[idx];
    }
    return null;
  },

  async deleteEvent(idOrSlug) {
    if (isMongooseReady()) {
      return await Event.findOneAndDelete({
        $or: [{ slug: idOrSlug }, { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }]
      });
    }
    const idx = memoryStore.events.findIndex(e => e.id === idOrSlug || e.slug === idOrSlug);
    if (idx !== -1) {
      return memoryStore.events.splice(idx, 1)[0];
    }
    return null;
  },

  // === ANNOUNCEMENTS ===
  async getAnnouncements(filter = {}) {
    if (isMongooseReady()) {
      return await Announcement.find(filter).sort({ isPinned: -1, date: -1 });
    }
    let list = [...memoryStore.announcements];
    if (filter.category) list = list.filter(a => a.category === filter.category);
    if (filter.clubSlug) list = list.filter(a => a.clubSlug === filter.clubSlug);
    return list.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  },

  async createAnnouncement(data) {
    if (isMongooseReady()) {
      const ann = new Announcement(data);
      return await ann.save();
    }
    const item = { id: `ann-${Date.now()}`, ...data, createdAt: new Date() };
    memoryStore.announcements.unshift(item);
    return item;
  },

  async updateAnnouncement(id, data) {
    if (isMongooseReady()) {
      return await Announcement.findByIdAndUpdate(id, data, { new: true });
    }
    const idx = memoryStore.announcements.findIndex(a => a.id === id);
    if (idx !== -1) {
      memoryStore.announcements[idx] = { ...memoryStore.announcements[idx], ...data };
      return memoryStore.announcements[idx];
    }
    return null;
  },

  async deleteAnnouncement(id) {
    if (isMongooseReady()) {
      return await Announcement.findByIdAndDelete(id);
    }
    const idx = memoryStore.announcements.findIndex(a => a.id === id);
    if (idx !== -1) {
      return memoryStore.announcements.splice(idx, 1)[0];
    }
    return null;
  },

  // === GALLERY ===
  async getGallery(filter = {}) {
    if (isMongooseReady()) {
      return await Gallery.find(filter).sort({ createdAt: -1 });
    }
    let list = [...memoryStore.gallery];
    if (filter.category && filter.category !== 'ALL') list = list.filter(g => g.category === filter.category);
    if (filter.clubSlug) list = list.filter(g => g.clubSlug === filter.clubSlug);
    return list;
  },

  async createGalleryItem(data) {
    if (isMongooseReady()) {
      const gal = new Gallery(data);
      return await gal.save();
    }
    const item = { id: `gal-${Date.now()}`, ...data, createdAt: new Date() };
    memoryStore.gallery.unshift(item);
    return item;
  },

  async deleteGalleryItem(id) {
    if (isMongooseReady()) {
      return await Gallery.findByIdAndDelete(id);
    }
    const idx = memoryStore.gallery.findIndex(g => g.id === id);
    if (idx !== -1) {
      return memoryStore.gallery.splice(idx, 1)[0];
    }
    return null;
  },

  // === LEADERSHIP ===
  async getLeadership(filter = {}) {
    if (isMongooseReady()) {
      return await Leader.find(filter).sort({ order: 1 });
    }
    let list = [...memoryStore.leadership];
    if (filter.clubSlug) list = list.filter(l => l.clubSlug === filter.clubSlug);
    if (filter.roleType) list = list.filter(l => l.roleType === filter.roleType);
    return list.sort((a, b) => a.order - b.order);
  },

  async createLeader(data) {
    if (isMongooseReady()) {
      const l = new Leader(data);
      return await l.save();
    }
    const item = { id: `lead-${Date.now()}`, ...data };
    memoryStore.leadership.push(item);
    return item;
  },

  async updateLeader(id, data) {
    if (isMongooseReady()) {
      return await Leader.findByIdAndUpdate(id, data, { new: true });
    }
    const idx = memoryStore.leadership.findIndex(l => l.id === id);
    if (idx !== -1) {
      memoryStore.leadership[idx] = { ...memoryStore.leadership[idx], ...data };
      return memoryStore.leadership[idx];
    }
    return null;
  },

  async deleteLeader(id) {
    if (isMongooseReady()) {
      return await Leader.findByIdAndDelete(id);
    }
    const idx = memoryStore.leadership.findIndex(l => l.id === id);
    if (idx !== -1) {
      return memoryStore.leadership.splice(idx, 1)[0];
    }
    return null;
  },

  // === SETTINGS ===
  async getSettings() {
    if (isMongooseReady()) {
      let cfg = await Setting.findOne();
      if (!cfg) {
        cfg = await Setting.create(DEFAULT_CONFIG);
      }
      return cfg;
    }
    return memoryStore.settings;
  },

  async updateSettings(data) {
    if (isMongooseReady()) {
      let cfg = await Setting.findOne();
      if (!cfg) {
        return await Setting.create(data);
      }
      return await Setting.findOneAndUpdate({}, data, { new: true });
    }
    memoryStore.settings = { ...memoryStore.settings, ...data, updatedAt: new Date() };
    return memoryStore.settings;
  },

  // === USERS / AUTH ===
  async findUserByUsernameOrEmail(identifier) {
    if (isMongooseReady()) {
      return await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });
    }
    return memoryStore.admins.find(u => u.username === identifier || u.email === identifier);
  },

  async findUserById(id) {
    if (isMongooseReady()) {
      return await User.findById(id).select('-passwordHash');
    }
    const user = memoryStore.admins.find(u => u.id === id);
    if (user) {
      const { passwordHash, ...rest } = user;
      return rest;
    }
    return null;
  },

  async getAllAdmins() {
    if (isMongooseReady()) {
      return await User.find().select('-passwordHash').sort({ createdAt: -1 });
    }
    return memoryStore.admins.map(({ passwordHash, ...rest }) => rest);
  },

  async createAdminUser(data) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    
    if (isMongooseReady()) {
      const user = new User({
        username: data.username,
        email: data.email,
        passwordHash,
        role: data.role || 'CLUB_ADMIN',
        assignedClubId: data.assignedClubId || null,
        fullName: data.fullName || ''
      });
      return await user.save();
    }

    const newUser = {
      id: `admin-${Date.now()}`,
      username: data.username,
      email: data.email,
      passwordHash,
      role: data.role || 'CLUB_ADMIN',
      assignedClubId: data.assignedClubId || null,
      fullName: data.fullName || '',
      createdAt: new Date()
    };
    memoryStore.admins.push(newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  },

  async deleteAdminUser(id) {
    if (isMongooseReady()) {
      return await User.findByIdAndDelete(id);
    }
    const idx = memoryStore.admins.findIndex(u => u.id === id);
    if (idx !== -1) {
      return memoryStore.admins.splice(idx, 1)[0];
    }
    return null;
  },

  // Overview Stats for Admin Dashboard
  async getDashboardStats() {
    const clubs = await this.getClubs();
    const events = await this.getEvents();
    const gallery = await this.getGallery();
    const announcements = await this.getAnnouncements();

    return {
      totalClubs: clubs.length,
      technicalClubs: clubs.filter(c => c.category === 'TECHNICAL').length,
      nonTechnicalClubs: clubs.filter(c => c.category === 'NON-TECHNICAL').length,
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.status === 'UPCOMING').length,
      completedEvents: events.filter(e => e.status === 'COMPLETED').length,
      galleryCount: gallery.length,
      announcementsCount: announcements.length
    };
  }
};

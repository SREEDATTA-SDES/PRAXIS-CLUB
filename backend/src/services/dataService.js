import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Club } from '../models/Club.js';
import { Leader } from '../models/Leader.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { Gallery } from '../models/Gallery.js';
import { Setting } from '../models/Setting.js';

const isMongooseReady = () => mongoose.connection.readyState === 1;

export const dataService = {
  // === CLUBS ===
  async getClubs() {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Club.find().sort({ order: 1 });
  },

  async getClubBySlug(slug) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Club.findOne({ slug });
  },

  async createClub(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const club = new Club(data);
    return await club.save();
  },

  async updateClub(slug, data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Club.findOneAndUpdate({ slug }, data, { new: true });
  },

  async deleteClub(slug) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Club.findOneAndDelete({ slug });
  },

  // === EVENTS ===
  async getEvents(filter = {}) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Event.find(filter).sort({ date: -1 });
  },

  async getEventByIdOrSlug(idOrSlug) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Event.findOne({
      $or: [{ slug: idOrSlug }, { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }]
    });
  },

  async createEvent(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const event = new Event(data);
    return await event.save();
  },

  async updateEvent(id, data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Event.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteEvent(id) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Event.findByIdAndDelete(id);
  },

  // === LEADERSHIP ===
  async getLeadership(filter = {}) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Leader.find(filter).sort({ order: 1 });
  },

  async createLeader(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const l = new Leader(data);
    return await l.save();
  },

  async updateLeader(id, data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Leader.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteLeader(id) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Leader.findByIdAndDelete(id);
  },

  // === ANNOUNCEMENTS ===
  async getAnnouncements(filter = {}) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    let q = Announcement.find(filter);
    if (!filter.clubSlug) {
      q = q.sort({ priority: -1, createdAt: -1 });
    } else {
      q = q.sort({ createdAt: -1 });
    }
    return await q.exec();
  },

  async createAnnouncement(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const a = new Announcement(data);
    return await a.save();
  },

  async updateAnnouncement(id, data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Announcement.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteAnnouncement(id) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Announcement.findByIdAndDelete(id);
  },

  // === GALLERY ===
  async getGallery(filter = {}) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
  },

  async createGalleryItem(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const g = new Gallery(data);
    return await g.save();
  },

  async updateGalleryItem(id, data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Gallery.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteGalleryItem(id) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Gallery.findByIdAndDelete(id);
  },

  // === SETTINGS ===
  async getSettings() {
    if (!isMongooseReady()) throw new Error('Database not connected');
    let config = await Setting.findOne();
    if (!config) {
      config = await Setting.create({ lastUpdated: new Date() });
    }
    return config;
  },

  async updateSettings(data) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    return await Setting.findOneAndUpdate({}, { ...data, lastUpdated: new Date() }, { new: true, upsert: true });
  },

  // === ADMIN / USERS ===
  async verifyAdmin(username, password) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        return {
          id: "admin-env",
          username: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_USERNAME + "@praxis.sdes.ac.in",
          role: "SUPER_ADMIN",
          assignedClubId: null,
          fullName: "System Administrator"
        };
      }
    }
    
    return null;
  }
};

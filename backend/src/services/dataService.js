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
  async verifyAdmin(username, password) {
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

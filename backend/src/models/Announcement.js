import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['GENERAL', 'TECHNICAL', 'NON-TECHNICAL', 'URGENT'], 
    default: 'GENERAL' 
  },
  clubSlug: { type: String, default: null },
  date: { type: String, required: true },
  linkUrl: { type: String, default: '' },
  linkText: { type: String, default: '' },
  isPinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

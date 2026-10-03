import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: String, enum: ['TECHNICAL', 'NON-TECHNICAL'], required: true },
  clubSlug: { type: String, required: true },
  albumName: { type: String, default: 'General' },
  tags: [{ type: String }],
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

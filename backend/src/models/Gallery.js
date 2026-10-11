import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  photos: [{ type: String }], // Optional multiple photos in this album entry
  caption: { type: String, default: '' },
  category: { type: String, enum: ['TECHNICAL', 'NON-TECHNICAL'], required: true },
  clubSlug: { type: String, required: true },
  albumName: { type: String, default: 'General' },
  folderSlug: { type: String, default: '' },
  tags: [{ type: String }],
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

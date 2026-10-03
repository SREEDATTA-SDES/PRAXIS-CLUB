import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, enum: ['TECHNICAL', 'NON-TECHNICAL'], required: true },
  clubSlug: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  posterUrl: { type: String, default: '' },
  scheduleUrl: { type: String, default: '' },
  googleFormUrl: { type: String, default: '' },
  photos: [{ type: String }],
  status: { type: String, enum: ['UPCOMING', 'COMPLETED'], default: 'UPCOMING' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

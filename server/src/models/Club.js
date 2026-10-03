import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['TECHNICAL', 'NON-TECHNICAL'], required: true },
  logoUrl: { type: String, required: true },
  tagline: { type: String, default: '' },
  description: { type: String, default: '' },
  purpose: { type: String, default: '' },
  vision: { type: String, default: '' },
  mission: { type: String, default: '' },
  accentPrimary: { type: String, default: '#2876B8' },
  accentSecondary: { type: String, default: '#20D9FF' },
  contactEmail: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Club = mongoose.models.Club || mongoose.model('Club', clubSchema);

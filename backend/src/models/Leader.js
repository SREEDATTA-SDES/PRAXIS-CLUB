import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { 
    type: String, 
    required: true 
  },
  position: { type: String, required: true },
  designation: { type: String, default: '' },
  qualifications: { type: String, default: '' },
  department: { type: String, default: 'CSE-Allied' },
  yearClass: { type: String, default: '' },
  section: { type: String, default: '' },
  rollNumber: { type: String, default: '' },
  gender: { type: String, default: '' },
  clubSlug: { type: String, default: null }, // e.g., 'genesis' or null if institutional
  photoUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  message: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Leader = mongoose.models.Leader || mongoose.model('Leader', leaderSchema);


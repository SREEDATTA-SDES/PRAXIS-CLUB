import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { 
    type: String, 
    enum: ['FACULTY_HEAD', 'FACULTY_COORDINATOR', 'PRAXIS_LEAD', 'CLUB_LEAD', 'COORDINATOR'], 
    required: true 
  },
  position: { type: String, required: true },
  department: { type: String, default: 'CSE-Allied' },
  yearClass: { type: String, default: '' },
  clubSlug: { type: String, default: null }, // e.g., 'genesis' or null if institutional
  photoUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Leader = mongoose.models.Leader || mongoose.model('Leader', leaderSchema);

import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  collegeName: { type: String, default: 'SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE' },
  collegeShortName: { type: String, default: 'SDES' },
  department: { type: String, default: 'CSE-Allied' },
  collegeLogoUrl: { type: String, default: 'https://ik.imagekit.io/SDES/LOGOS/CLG%20LOGO.png' },
  collegeWebsiteUrl: { type: String, default: 'https://www.sreedattha.ac.in/sdes/' },
  praxisLogoUrl: { type: String, default: 'https://ik.imagekit.io/SDES/LOGOS/PRAXIS%20Logo.png' },
  praxisTagline: { type: String, default: 'A platform for creativity, technology, community and innovation.' },
  address: { type: String, default: '' },
  officialEmail: { type: String, default: '' },
  officialPhone: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  facebookUrl: { type: String, default: '' },
  whatsappUrl: { type: String, default: '' },
  googleMapsUrl: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

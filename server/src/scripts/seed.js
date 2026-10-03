import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { 
  DEFAULT_CLUBS, 
  DEFAULT_LEADERSHIP, 
  DEFAULT_EVENTS, 
  DEFAULT_ANNOUNCEMENTS, 
  DEFAULT_GALLERY, 
  DEFAULT_CONFIG, 
  DEFAULT_ADMINS 
} from '../data/defaultData.js';
import { Club } from '../models/Club.js';
import { Leader } from '../models/Leader.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { Gallery } from '../models/Gallery.js';
import { Setting } from '../models/Setting.js';
import { User } from '../models/User.js';

dotenv.config();

const seed = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is required to run the seed script.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas for seeding...');

    console.log('Seeding settings...');
    await Setting.deleteMany({});
    await Setting.create(DEFAULT_CONFIG);

    console.log('Seeding clubs...');
    await Club.deleteMany({});
    await Club.insertMany(DEFAULT_CLUBS);

    console.log('Seeding leadership...');
    await Leader.deleteMany({});
    await Leader.insertMany(DEFAULT_LEADERSHIP);

    console.log('Seeding events...');
    await Event.deleteMany({});
    await Event.insertMany(DEFAULT_EVENTS);

    console.log('Seeding announcements...');
    await Announcement.deleteMany({});
    await Announcement.insertMany(DEFAULT_ANNOUNCEMENTS);

    console.log('Seeding gallery...');
    await Gallery.deleteMany({});
    await Gallery.insertMany(DEFAULT_GALLERY);

    console.log('Seeding admin accounts...');
    await User.deleteMany({});
    for (const admin of DEFAULT_ADMINS) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('password', salt);
      await User.create({
        username: admin.username,
        email: admin.email,
        passwordHash,
        role: admin.role,
        assignedClubId: admin.assignedClubId,
        fullName: admin.fullName
      });
    }

    console.log('✅ Seeding complete! Database successfully populated with PRAXIS official master dataset.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();

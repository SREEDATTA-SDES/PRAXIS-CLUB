import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas...');

    // 1. Delete all non-praxis_admin users
    const deleteRes = await User.deleteMany({ username: { $ne: 'praxis_admin' } });
    console.log(`Deleted ${deleteRes.deletedCount} non-praxis_admin users.`);

    // 2. Hash praxis_sdes@2026
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('praxis_sdes@2026', salt);

    // 3. Upsert praxis_admin
    const user = await User.findOneAndUpdate(
      { username: 'praxis_admin' },
      {
        username: 'praxis_admin',
        email: 'admin@praxis.sdes.ac.in',
        passwordHash,
        role: 'SUPER_ADMIN',
        assignedClubId: null,
        fullName: 'PRAXIS Admin'
      },
      { upsert: true, new: true }
    );

    console.log('Successfully secured praxis_admin user in MongoDB:', user.username);

    // 4. Verify remaining users
    const allUsers = await User.find({}, 'username email role fullName');
    console.log('Current users in DB:', JSON.stringify(allUsers, null, 2));

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin:', err);
    process.exit(1);
  }
};

run();

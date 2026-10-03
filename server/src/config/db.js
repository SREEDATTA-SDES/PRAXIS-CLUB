import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚡ [PRAXIS SERVER] MONGODB_URI not set. Running in resilient In-Memory / Seed storage mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🚀 [PRAXIS SERVER] MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [PRAXIS SERVER] MongoDB connection failed (${error.message}). Falling back to in-memory mode.`);
    return false;
  }
};

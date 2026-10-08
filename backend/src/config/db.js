import mongoose from 'mongoose';
import dns from 'dns';

// Configure reliable DNS servers to resolve MongoDB SRV records on Windows / local network DNS
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Fallback if environment doesn't allow setting custom DNS
}

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


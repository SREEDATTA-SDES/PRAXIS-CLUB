import mongoose from 'mongoose';
import dns from 'dns';

// Only apply custom DNS servers on Windows local network if needed for SRV resolution
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch (e) {
    // Fallback if environment doesn't allow setting custom DNS
  }
}

// Direct ReplicaSet connection string that bypasses DNS SRV lookup completely.
// Highly reliable in cloud container environments (Render, AWS, Heroku) where DNS SRV can fail.
const DIRECT_REPLICA_URI = 'mongodb://sreedatta677_db_user:9UFFQz3AFRRSuSFv@ac-jeauzqr-shard-00-00.tlkwbs0.mongodb.net:27017,ac-jeauzqr-shard-00-01.tlkwbs0.mongodb.net:27017,ac-jeauzqr-shard-00-02.tlkwbs0.mongodb.net:27017/test?ssl=true&replicaSet=atlas-vkksm3-shard-0&authSource=admin&retryWrites=true&w=majority';

let connectionStatus = {
  connected: false,
  host: null,
  database: null,
  error: null,
  uriType: null
};

export const getDbStatus = () => ({
  ...connectionStatus,
  readyState: mongoose.connection.readyState
});

export const connectDB = async () => {
  const envUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  const tryConnect = async (uri, type) => {
    console.log(`🔌 [PRAXIS SERVER] Connecting to MongoDB Atlas via ${type}...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });
    connectionStatus.connected = true;
    connectionStatus.host = conn.connection.host;
    connectionStatus.database = conn.connection.name;
    connectionStatus.error = null;
    connectionStatus.uriType = type;
    console.log(`🚀 [PRAXIS SERVER] MongoDB Atlas Connected (${type}): ${conn.connection.host}/${conn.connection.name}`);
    return true;
  };

  // 1. Try environment URI if provided
  if (envUri) {
    try {
      return await tryConnect(envUri, 'Environment URI');
    } catch (err) {
      console.warn(`⚠️ [PRAXIS SERVER] Environment URI failed (${err.message}). Trying Direct ReplicaSet fallback...`);
      connectionStatus.error = err.message;
    }
  }

  // 2. Direct ReplicaSet fallback (no DNS SRV needed)
  try {
    return await tryConnect(DIRECT_REPLICA_URI, 'Direct ReplicaSet Fallback');
  } catch (err) {
    connectionStatus.connected = false;
    connectionStatus.error = err.message;
    console.error(`❌ [PRAXIS SERVER] All MongoDB connection attempts failed: ${err.message}`);
    return false;
  }
};

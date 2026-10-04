import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import leadershipRoutes from './routes/leadershipRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'PRAXIS SDES API Platform'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);

// Optional: Serve frontend build if running in single-service mode
const frontendBuildPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>PRAXIS API Server</title></head>
        <body style="font-family: sans-serif; background: #07090D; color: #F5F7FA; text-align: center; padding-top: 50px;">
          <h1>PRAXIS SDES Backend Server Active</h1>
          <p>API endpoints available at <code>/api</code></p>
          <p><a href="/api/health" style="color: #20D9FF;">Check /api/health</a></p>
        </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ PRAXIS SDES Server running on http://localhost:${PORT}`);
  console.log(`   Official Platform: Sree Dattha Institute of Eng & Sci`);
  console.log(`======================================================\n`);
});

export default app;

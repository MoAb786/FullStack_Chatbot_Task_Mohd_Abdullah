import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`[Server] DroneTV API server running on port ${PORT}`);
      console.log(`[Server] Health check available at: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('[Server] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

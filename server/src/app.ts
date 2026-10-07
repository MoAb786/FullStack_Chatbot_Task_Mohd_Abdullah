import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import enquiryRoutes from './routes/enquiry.routes';
import authRoutes from './routes/auth.routes';
import { notFoundHandler } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/error.middleware';

export const createApp = (): Express => {
  const app = express();

  // Security Middleware
  app.use(helmet());

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  app.use(
    cors({
      origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parser with safe limit
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // Health Check Endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'DroneTV AI Support & Lead Assistant API is healthy and running',
      timestamp: new Date().toISOString(),
    });
  });

  // REST API Routes
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/auth', authRoutes);

  // 404 Handler
  app.use(notFoundHandler);

  // Global Centralized Error Handler
  app.use(errorHandler);

  return app;
};

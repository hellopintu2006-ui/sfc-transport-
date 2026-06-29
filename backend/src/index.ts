import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import feedbackRoutes from './routes/feedback.routes';
import contactRoutes from './routes/contact.routes';
import prisma from './lib/prisma';
import { logger } from './lib/logger';

// Load environment variables
dotenv.config();

const app = express();
app.set('trust proxy', 1); // trust first proxy to get correct client IP on Render

// Middleware
app.use(helmet());
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowed => allowed.replace(/\/$/, '') === normalizedOrigin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
  res.send('SFC Transport API is running.');
});
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date(),
    });
  } catch (error: any) {
    logger.error('Database connection error in health check:', error);
    return res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date(),
    });
  }
});

// Start Server with db connection retry (only if not running as a Vercel serverless function)
const startServer = async () => {
  if (process.env.VERCEL) {
    logger.info('Running in Vercel Serverless environment. Startup database check skipped.');
    return;
  }

  let dbConnected = false;
  let retries = 5;
  while (retries > 0 && !dbConnected) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbConnected = true;
      logger.info('Database connected successfully.');
    } catch (err: any) {
      retries -= 1;
      logger.error(`Database connection failed. Retries remaining: ${retries}`, err);
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  if (!dbConnected) {
    logger.error('Database connection failed after 5 retries. Exiting server.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();

// Export app for Vercel serverless function handler
export default app;


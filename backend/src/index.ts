import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './routes/feedback.routes';
import contactRoutes from './routes/contact.routes';
import prisma from './lib/prisma';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('SFC Transport API is running. Please access the website on http://localhost:3000');
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
    console.error('Database connection error in health check:', error);
    return res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date(),
    });
  }
});

// Start Server (only if not running as a Vercel serverless function)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app for Vercel serverless function handler
export default app;


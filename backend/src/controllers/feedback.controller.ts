import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

// Zod Schema for feedback validation
const feedbackSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  shopName: z.string().optional().nullable(),
  serviceUsed: z.enum(['full-load', 'part-load', 'nag-load']),
  starRating: z.number().int().min(1).max(5),
  serviceQuality: z.enum(['excellent', 'good', 'average', 'poor']),
  deliveryOnTime: z.boolean(),
  staffBehavior: z.enum(['excellent', 'good', 'average', 'poor']),
  wouldRecommend: z.boolean(),
  comment: z.string().optional().nullable(),
});

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown';
    const identifier = `feedback:${ip}`;
    
    // Simple Rate Limiting Check using the database
    const now = new Date();
    const rateLimit = await prisma.rateLimit.findUnique({
      where: { identifier },
    });

    if (rateLimit) {
      if (now < rateLimit.resetAt) {
        if (rateLimit.count >= 3) {
          return res.status(429).json({
            error: 'Too many feedback requests. Please try again after some time.',
          });
        }
        await prisma.rateLimit.update({
          where: { identifier },
          data: { count: rateLimit.count + 1 },
        });
      } else {
        // Reset limit window
        await prisma.rateLimit.update({
          where: { identifier },
          data: {
            count: 1,
            resetAt: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour from now
          },
        });
      }
    } else {
      // Create new limit entry
      await prisma.rateLimit.create({
        data: {
          identifier,
          count: 1,
          resetAt: new Date(now.getTime() + 60 * 60 * 1000),
        },
      });
    }

    // Validate request body
    const validatedData = feedbackSchema.parse(req.body);

    const feedback = await prisma.feedback.create({
      data: {
        ...validatedData,
        ipAddress: ip,
        isApproved: false,
        isFeatured: false,
      },
    });

    return res.status(201).json({
      message: 'Feedback submitted successfully. It will be visible after review.',
      feedback,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Submit feedback error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFeedbackList = async (req: Request, res: Response) => {
  try {
    const { serviceUsed, starRating, featured } = req.query;

    const where: any = {
      isApproved: true,
      isDeleted: false,
    };

    if (serviceUsed) {
      where.serviceUsed = String(serviceUsed);
    }

    if (starRating) {
      where.starRating = parseInt(String(starRating), 10);
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const feedbacks = await prisma.feedback.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Get feedback list error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

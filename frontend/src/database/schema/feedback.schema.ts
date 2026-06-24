import { z } from 'zod';

export const feedbackSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  shopName: z.string().optional().nullable(),
  serviceUsed: z.enum(['full-load', 'part-load', 'nag-load']),
  starRating: z.number().int().min(1).max(5),
  serviceQuality: z.enum(['excellent', 'good', 'average', 'poor']),
  deliveryOnTime: z.boolean(),
  staffBehavior: z.enum(['excellent', 'good', 'average', 'poor']),
  wouldRecommend: z.boolean(),
  comment: z.string().optional().nullable(),
});

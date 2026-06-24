import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address').optional().nullable().or(z.literal('')),
  subject: z.string().optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

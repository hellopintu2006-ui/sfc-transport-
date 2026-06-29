import { Request, Response } from 'express';
import { z } from 'zod';
import { Resend } from 'resend';
import prisma from '../lib/prisma';
import { logger } from '../lib/logger';

// Zod Schema for contact validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address').optional().nullable().or(z.literal('')),
  subject: z.string().optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    const rawIp = (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown';
    // Extract actual client IP from proxy list
    const ip = rawIp.split(',')[0].trim();
    const identifier = `contact:${ip}`;

    // Simple Rate Limiting Check using the database (max 5 contact requests per hour)
    const now = new Date();
    const rateLimit = await prisma.rateLimit.findUnique({
      where: { identifier },
    });

    if (rateLimit) {
      if (now < rateLimit.resetAt) {
        if (rateLimit.count >= 5) {
          logger.warn(`Rate limit triggered for contact submission by IP: ${ip}`);
          return res.status(429).json({
            error: 'Too many contact submissions. Please try again after some time.',
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

    // Validate body
    const validatedData = contactSchema.parse(req.body);

    // If email is empty string, convert to null
    const cleanEmail = validatedData.email === '' ? null : validatedData.email;

    // Save to Database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: cleanEmail,
        subject: validatedData.subject || 'General Inquiry',
        message: validatedData.message,
        ipAddress: ip,
      },
    });

    // Send Email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.CONTACT_EMAIL || 'sainifreightcarriertransport@gmail.com';

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'SFC Transport Website <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New Enquiry: ${validatedData.subject || 'General Inquiry'} - ${validatedData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${cleanEmail || 'Not Provided'}</p>
            <p><strong>Subject:</strong> ${validatedData.subject || 'General Inquiry'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f4f4f4; padding: 10px; border-left: 5px solid #1E40AF;">
              ${validatedData.message.replace(/\n/g, '<br/>')}
            </blockquote>
            <hr />
            <p style="font-size: 12px; color: #888;">Submitted from IP: ${ip} at ${now.toLocaleString()}</p>
          `,
        });
        logger.info(`Notification email sent successfully via Resend for submission: ${submission.id}`);
      } catch (emailErr) {
        logger.error(`Failed to send email via Resend for submission: ${submission.id}`, emailErr);
        // Do not fail the API request if email sending fails, as database write succeeded
      }
    } else {
      logger.warn('RESEND_API_KEY is not configured. Email notification skipped.');
    }

    return res.status(201).json({
      message: 'Your query has been submitted successfully. We will get back to you soon!',
      submission,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    logger.error('Contact submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

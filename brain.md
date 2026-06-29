# SFC Transport - Project Brain (Context & Documentation)

This file contains the complete system architecture, database schema, API endpoints, page routes, and guidelines for the **SFC Transport** project. 

> [!IMPORTANT]
> **INSTRUCTIONS FOR AI AGENTS:** 
> 1. Read this file at the start of every session to understand the codebase.
> 2. Whenever you make any changes, add new features, update endpoints, or modify database models, you **MUST** update this file to reflect the changes before completing your task.

---

## 1. Project Overview
**SFC Transport** (Saini Freight Carrier Transport) is a digital platform for a logistics and freight transport business. It consists of:
*   **Frontend**: A Next.js web application showcasing transport routes, services, feedback collection, quotes requests, tracking, and a customer portal.
*   **Backend**: An Express.js REST API server handling database operations, rate limiting, and email dispatch.

---

## 2. Technical Stack
*   **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React.
*   **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (Supabase), Zod (Validation), Resend (Emails).

---

## 3. Directory Layout

```
SFC transport/
├── backend/                   # Express.js backend API
│   ├── api/                   # Serverless / Vercel configurations
│   ├── prisma/                # Database migrations and schema
│   │   └── schema.prisma      # Prisma schema file
│   └── src/                   # Backend source code
│       ├── controllers/       # Route handlers (feedback, contact)
│       ├── lib/               # Database client (prisma)
│       ├── routes/            # API Route definitions
│       └── index.ts           # Server entry point
│
├── frontend/                  # Next.js frontend application
│   ├── public/                # Static assets (images, icons)
│   └── src/                   # Frontend source code
│       ├── app/               # Next.js pages/routes (App Router)
│       ├── components/        # UI components (home page sections, layout)
│       │   ├── layout/        # Navbar, Footer, ScrollSectionProgress, PageWrapper
│       │   └── home/          # Hero, Stats, Services, etc.
│       ├── config/            # Site, SEO, and feature configurations
│       ├── services/          # API client and communication functions
│       └── shared/            # Shared types and helpers
```

---

## 4. Database Schema (Prisma Models)
The backend uses Prisma with PostgreSQL. There are three core tables defined in `backend/prisma/schema.prisma`:

### `Feedback` (`feedbacks`)
Used to store customer testimonials and service ratings.
*   `id`: String (cuid, primary key)
*   `customerName`: String (mapped to `customer_name`)
*   `shopName`: String, Optional (mapped to `shop_name`)
*   `serviceUsed`: String (mapped to `service_used`, values: `"full-load" | "part-load" | "nag-load"`)
*   `starRating`: Integer (mapped to `star_rating`, values: `1-5`)
*   `serviceQuality`: String (mapped to `service_quality`, values: `"excellent" | "good" | "average" | "poor"`)
*   `deliveryOnTime`: Boolean (mapped to `delivery_on_time`)
*   `staffBehavior`: String (mapped to `staff_behavior`, values: `"excellent" | "good" | "average" | "poor"`)
*   `wouldRecommend`: Boolean (mapped to `would_recommend`)
*   `comment`: String, Optional
*   `isApproved`: Boolean (defaults to `false`, mapped to `is_approved`)
*   `isDeleted`: Boolean (defaults to `false`, mapped to `is_deleted`)
*   `isFeatured`: Boolean (defaults to `false`, mapped to `is_featured`)
*   `ipAddress`: String, Optional
*   `createdAt` & `updatedAt`: DateTime

### `ContactSubmission` (`contact_submissions`)
Stores queries submitted via the "Contact Us" form.
*   `id`: String (cuid, primary key)
*   `name`: String
*   `phone`: String
*   `email`: String, Optional
*   `subject`: String, Optional
*   `message`: String
*   `isRead`: Boolean (defaults to `false`, mapped to `is_read`)
*   `isDeleted`: Boolean (defaults to `false`, mapped to `is_deleted`)
*   `ipAddress`: String, Optional
*   `createdAt` & `updatedAt`: DateTime

### `RateLimit` (`rate_limits`)
Keeps track of IP-based requests for endpoint protection.
*   `id`: String (primary key)
*   `identifier`: String, Unique (format: `"feedback:IP"` or `"contact:IP"`)
*   `count`: Integer (default: `0`)
*   `resetAt`: DateTime (mapped to `reset_at`)
*   `createdAt` & `updatedAt`: DateTime

---

## 5. API Endpoints
Backend routes are prefix-mounted on `/api`.

| Method | Endpoint | Description | Controller Handler |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Checks server availability | Direct response in `index.ts` |
| `GET` | `/api/health` | Checks database connection health | Health check route in `index.ts` |
| `POST` | `/api/feedback` | Submits a customer feedback | `submitFeedback` in `feedback.controller.ts` |
| `GET` | `/api/feedback/list` | Gets list of approved feedback | `getFeedbackList` in `feedback.controller.ts` |
| `POST` | `/api/contact` | Submits contact/query message | `submitContact` in `contact.controller.ts` |

---

## 6. Frontend Pages & Routing (Next.js)
Pages are structured in the `frontend/src/app` directory:

| Route Path | Directory / Page Component | Purpose |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Home page displaying Hero, Stats, Services, Routes, Gallery, Feedback, CTA, and Career teaser. |
| `/about` | `src/app/about/page.tsx` | Informational page about SFC Transport. |
| `/admin` | `src/app/admin/page.tsx` | Portal for managing testimonials and contact submissions. |
| `/career` | `src/app/career/page.tsx` | Career/hiring page. |
| `/contact` | `src/app/contact/page.tsx` | Support/contact form submission interface. |
| `/customer-portal` | `src/app/customer-portal/page.tsx` | Portal for customers. |
| `/feedback` | `src/app/feedback/page.tsx` | Service review and rating submission page. Form on top (enlarged), reviews at bottom sorted by rating descending (5-star first), scrollable horizontally on desktop. |
| `/feedback/all` | `src/app/feedback/all/page.tsx` | Dedicated page displaying all approved client reviews from database, sorted by rating descending. |
| `/fleet` | `src/app/fleet/page.tsx` | Page listing transport vehicle categories. |
| `/quote` | `src/app/quote/page.tsx` | Pricing quote request form. |
| `/rate-card` | `src/app/rate-card/page.tsx` | Interactive rate cards for shipping routes. |
| `/services` | `src/app/services/page.tsx` | Page detailing full-load, part-load, etc. |
| `/tracking` | `src/app/tracking/page.tsx` | Consignment tracking page. |

---

## 7. Environment Variables Configuration

### Backend (`backend/.env`)
*   `PORT`: Port of Express server (default `5000`)
*   `FRONTEND_URL`: Comma-separated URLs of the frontend allowed by CORS (e.g., `http://localhost:3000,https://sainifreightcarrier.vercel.app`)
*   `DATABASE_URL`: Supabase Transaction Pooler URL (Prisma)
*   `DIRECT_URL`: Supabase Direct Database URL (Prisma)
*   `RESEND_API_KEY`: API Key for Resend mail dispatcher
*   `CONTACT_EMAIL`: Recipient email address for contact submissions (e.g., `sainifreightcarriertransport@gmail.com`)

### Frontend (`frontend/.env.local` / Environment)
*   `NEXT_PUBLIC_BACKEND_URL`: Express API endpoint (e.g., `http://localhost:5000`)

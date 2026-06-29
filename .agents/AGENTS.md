# Custom Agent Rules for SFC Transport

To optimize token usage, credits, and workflow efficiency, all AI agents operating in this workspace must follow these rules:

## 1. Context Acquisition
*   **Do NOT** run expensive full-project scans, recursive searches, or read all source code files to build context.
*   **Always** read the [brain.md](file:///c:/Users/hello/OneDrive/Desktop/SFC%20transport/brain.md) file in the root of the project first. It contains the architecture mapping, database models, route tables, and tech stack configurations.

## 2. Documentation Maintenance
*   Whenever you add a new page/route, edit an existing API route, modify a database model (Prisma), or add a major component, you **MUST** update [brain.md](file:///c:/Users/hello/OneDrive/Desktop/SFC%20transport/brain.md) before concluding your task.
*   Keep the document clean, accurate, and concise.

## 3. Technology Stack Constraints
*   **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React.
*   **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (Supabase), Zod (Validation), Resend (Emails).
*   Always respect this stack and build matching configurations when expanding the codebase.

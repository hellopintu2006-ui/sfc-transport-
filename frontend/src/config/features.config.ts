export const FEATURES = {
  // ─── PHASE 1 - LIVE NOW ───────────────────────────
  FEEDBACK_SYSTEM   : true,   // Feedback submit + view
  CONTACT_FORM      : true,   // Contact form active
  GALLERY_SECTION   : true,   // Home page gallery

  // ─── PHASE 1.5 - TOGGLE READY ─────────────────────
  CAREER_PAGE       : false,  // Job listings page
  RATE_TABLE        : false,  // Actual rate card table

  // ─── PHASE 2 - COMING SOON ────────────────────────
  QUOTE_SYSTEM      : false,  // Online quote request

  // ─── PHASE 3 - FUTURE ─────────────────────────────
  TRACKING          : false,  // Shipment tracking
  CUSTOMER_PORTAL   : false,  // Customer login

  // ─── PHASE 4 - FUTURE ─────────────────────────────
  ADMIN_DASHBOARD   : false,  // Admin panel
  INVOICE_SYSTEM    : false,  // Invoice generation
  PAYMENT_GATEWAY   : false,  // Online payments
  ANALYTICS         : false,  // Business analytics
} as const;

export type FeatureKey = keyof typeof FEATURES;

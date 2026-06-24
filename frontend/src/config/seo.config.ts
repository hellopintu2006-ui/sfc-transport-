import { SITE_CONFIG } from './site.config';

export const SEO_CONFIG = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "SFC Transport",
    "Saini Freight Carrier Transport",
    "VKI Jaipur Transport",
    "Jaipur Transport Service",
    "Full Load Transport Jaipur",
    "Part Load Transport Jaipur",
    "Nag Load Transport Jaipur",
    "Transport VKI to Sitapura",
    "Transport VKI to Vatika",
    "Saini Transport Jaipur",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.baseUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
};

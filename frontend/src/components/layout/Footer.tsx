'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { FEATURES } from '@/config/features.config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg text-slate-400 font-body border-t border-slate-800 shrink-0">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1.5 font-heading text-2xl font-bold">
              <span className="text-white">SFC</span>
              <span className="text-secondary">Transport</span>
            </Link>
            <p className="text-sm text-slate-300 font-medium font-heading italic">
              "{SITE_CONFIG.tagline}"
            </p>
            <p className="text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-2">
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-full bg-success text-white hover:bg-success/90 transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947 6.037.947 1.612 5.318 1.608 10.75c-.001 1.61.452 3.18 1.311 4.577l-.961 3.513 3.69-.966zm10.743-4.88c-.29-.145-1.714-.848-1.979-.944-.265-.096-.458-.145-.65.145-.192.291-.745.944-.913 1.137-.168.193-.337.217-.627.072-1.39-.696-2.296-1.087-3.219-2.678-.244-.418.244-.388.697-1.288.079-.163.039-.307-.02-.452-.06-.145-.458-1.107-.627-1.513-.165-.398-.332-.344-.458-.35-.119-.005-.255-.006-.392-.006-.137 0-.361.051-.55.257-.189.206-.723.707-.723 1.724 0 1.017.739 2.002.842 2.143.103.141 1.454 2.22 3.522 3.114.492.213.876.34 1.176.435.495.158.946.135 1.302.082.397-.06 1.714-.7 1.957-1.378.243-.678.243-1.258.17-1.378-.073-.121-.265-.193-.556-.339z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-heading font-semibold text-base mb-1">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-white transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/rate-card" className="hover:text-white transition-colors">
                  Rate Card
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-heading font-semibold text-base mb-1">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/services#full-load" className="hover:text-white transition-colors">
                  Full Load Delivery
                </Link>
              </li>
              <li>
                <Link href="/services#part-load" className="hover:text-white transition-colors">
                  Part Load Delivery
                </Link>
              </li>
              <li>
                <Link href="/services#nag-load" className="hover:text-white transition-colors">
                  Nag Load (Item Count)
                </Link>
              </li>
              <li>
                <Link href="/services#routes" className="hover:text-white transition-colors">
                  Routes Covered
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Details */}
          <div className="flex flex-col gap-3 text-sm">
            <h4 className="text-white font-heading font-semibold text-base mb-1">
              Contact Details
            </h4>
            <div className="flex gap-2 items-start">
              <span className="text-primary shrink-0 mt-0.5">📞</span>
              <div>
                <p>Call: {SITE_CONFIG.contact.phoneCall}</p>
                <p>WhatsApp: {SITE_CONFIG.contact.phoneWhatsApp}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-primary shrink-0">✉️</span>
              <p className="truncate">{SITE_CONFIG.contact.email}</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-primary shrink-0 mt-0.5">📍</span>
              <p>{SITE_CONFIG.address.full}</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-primary shrink-0 mt-0.5">⏰</span>
              <div>
                <p className="text-white font-medium">{SITE_CONFIG.hours.display}</p>
                <p className="text-xs text-slate-500">{SITE_CONFIG.hours.days}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">
              {SITE_CONFIG.fullName}
            </span>
            {FEATURES.CAREER_PAGE && (
              <>
                <span className="text-slate-700">|</span>
                <Link href="/career" className="text-secondary hover:text-white transition-colors font-semibold">
                  We're Hiring! Career Opportunities
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

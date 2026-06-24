'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/utils/cn';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === '/';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/fleet', label: 'Fleet' },
    { href: '/rate-card', label: 'Rate Card' },
    { href: '/contact', label: 'Contact' },
    { href: '/feedback', label: 'Feedback' },
  ];

  return (
    <>
      <nav className={cn(
        "z-40 w-full transition-all duration-300 border-b border-brand-border bg-white sticky top-0 font-body",
        isHome && "hidden"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 font-heading text-xl md:text-2xl font-bold">
              <span className="text-primary">SFC</span>
              <span className="text-secondary">Transport</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary border-b-2 border-primary py-1" : "text-text-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="accent"
                size="sm"
                onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
              >
                WhatsApp Karo
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-primary p-2 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden border-t border-brand-border bg-white px-4 pt-2 pb-4 flex flex-col gap-2 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-brand-border mt-1">
              <Button
                variant="accent"
                className="w-full text-center py-2.5"
                onClick={() => {
                  setIsOpen(false);
                  window.open(SITE_CONFIG.contact.whatsappLink, '_blank');
                }}
              >
                WhatsApp Karo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;

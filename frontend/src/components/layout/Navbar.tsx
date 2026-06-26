'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/utils/cn';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full font-body px-4 md:px-6 py-4 lg:py-6",
          (scrolled || !isHome) ? "bg-slate-950/90 backdrop-blur-md shadow-lg py-3 lg:py-4" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Desktop Curved Header Layout */}
          <div className="hidden lg:flex items-center justify-between relative h-16">
            
            {/* Left Pill: Menu Navigation */}
            <div className="bg-slate-950/70 border border-white/10 backdrop-blur-md rounded-full px-4 h-14 flex items-center shadow-lg">
              <nav className="flex items-center gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-[11px] xl:text-xs font-semibold tracking-wide transition-colors py-1 px-2.5 rounded-full",
                        isActive 
                          ? "bg-red-600 text-white font-bold" 
                          : "text-slate-300 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center Capsule: Dark rounded Badge containing Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 lg:-top-7 z-20">
              <div className="bg-slate-950 border border-white/10 rounded-t-2xl rounded-b-[2.25rem] px-6 h-24 flex items-center justify-center relative w-48 shadow-xl group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                
                {/* Logo Image */}
                <Link href="/" className="relative w-40 h-20 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo_new.jpg"
                    alt="SFC Transport Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Right Pill: Actions */}
            <div className="bg-slate-950/70 border border-white/10 backdrop-blur-md rounded-full px-4 h-14 flex items-center gap-3 shadow-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}
                className="gap-1.5 font-bold border-white/20 text-white hover:bg-white hover:text-slate-950 rounded-full text-xs h-10 px-4 flex items-center"
              >
                Call: {SITE_CONFIG.contact.phoneCall}
                <Phone size={12} className="ml-1" />
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
                className="font-bold bg-red-600 hover:bg-red-700 text-white border-0 rounded-full text-xs h-10 px-5 flex items-center gap-1.5 shadow-md shadow-red-600/30"
              >
                WhatsApp Karo
                <ArrowRight size={12} />
              </Button>
            </div>

          </div>

          {/* Mobile/Tablet Header Layout */}
          <div className="lg:hidden flex items-center justify-between bg-slate-950/70 border border-white/10 backdrop-blur-md rounded-full px-5 h-14 shadow-lg w-full">
            <Link href="/" className="flex items-center gap-1.5 font-heading font-black text-white text-base tracking-tight">
              <span className="text-red-500">SFC</span>
              <span>Transport</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none cursor-pointer hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="lg:hidden absolute left-4 right-4 mt-3 bg-slate-950/95 border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                      isActive 
                        ? "bg-red-600 text-white" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </Link>
                );
              })}
              
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    window.open(`tel:${SITE_CONFIG.contact.phoneCall}`);
                  }}
                  className="w-full text-xs text-center py-2.5 justify-center rounded-full border-white/15 text-white hover:bg-white/5 h-11"
                >
                  Call Karo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    window.open(SITE_CONFIG.contact.whatsappLink, '_blank');
                  }}
                  className="w-full text-xs text-center py-2.5 justify-center rounded-full bg-red-600 hover:bg-red-700 text-white border-0 h-11"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          )}

        </div>
      </nav>
    </>
  );
};

export default Navbar;

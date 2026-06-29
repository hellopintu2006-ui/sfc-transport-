'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/utils/cn';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    // Delay prefetching of non-home pages by 2 seconds to prioritize home page resources
    const timer = setTimeout(() => {
      const pages = ['/about', '/services', '/fleet', '/rate-card', '/contact', '/feedback'];
      pages.forEach(page => {
        router.prefetch(page);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full font-body px-4 md:px-6",
          isHome
            ? "bg-transparent border-transparent"
            : scrolled
              ? "bg-transparent border-transparent"
              : "bg-slate-950 border-b border-white/5",
          scrolled ? "py-2 lg:py-3" : "py-4 lg:py-6"
        )}
      >
        {/* Desktop Curved White Tab Container for Logo (hanging down from top) */}
        <div
          className="absolute transform -translate-x-1/2 top-10px z-20 hidden lg:block"
          style={{ left: 'calc(50% + 60px)' }}
        >
          <div className="bg-white rounded-b-[2rem] h-20 flex items-center justify-center w-48 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-x border-b border-black/5">
            <Link href="/" prefetch={false} className="relative w-36 h-18 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo_new.png"
                alt="SFC Transport Logo"
                fill
                sizes="144px"
                className="object-contain scale-[1.20]"
                priority
              />
            </Link>
          </div>
        </div>

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
                      prefetch={false}
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

            {/* Empty Center Spacer for Desktop Hanging Logo Tab */}
            <div className="w-48 h-1" />

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
            {/* White Capsule wrapping Mobile Logo for Contrast */}
            <div className="bg-white rounded-full px-3 py-1.5 h-10 w-28 flex items-center justify-center shadow-md">
              <Link href="/" prefetch={false} className="relative w-24 h-7 flex items-center overflow-hidden">
                <Image
                  src="/images/logo_new.png"
                  alt="SFC Transport Logo"
                  fill
                  sizes="96px"
                  className="object-contain scale-[1.22]"
                  priority
                />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none cursor-pointer hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="lg:hidden absolute left-4 right-4 mt-3 bg-slate-950/95 border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-100px)] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
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

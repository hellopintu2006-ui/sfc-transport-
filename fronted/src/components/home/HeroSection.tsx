'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/utils/cn';

const HERO_SLIDES = [
  {
    badge: "Jaipur Ki #1 Transport Service",
    title: "SFC Transport",
    subtitle: "Full Load Services",
    description: "Pura truck book karke apna bulk maal safely bhejo. VKI se Jaipur ke sabhi industrial aur commercial zones tak direct, non-stop delivery.",
    ctaText: "WhatsApp Karo",
    ctaLink: SITE_CONFIG.contact.whatsappLink,
    bgOverlay: "from-blue-900/40 to-slate-900/60"
  },
  {
    badge: "Cost-Effective Part Load",
    title: "Part Load Services",
    subtitle: "Bachat Bhi, Sahulyat Bhi",
    description: "Chhota ya medium maal? Pure truck ka kharcha bachao. Sirf apni space ka daam do aur safe routes par delivery pao.",
    ctaText: "Rate Poochho",
    ctaLink: SITE_CONFIG.contact.whatsappLink,
    bgOverlay: "from-red-900/40 to-slate-900/60"
  },
  {
    badge: "Item-Wise Precise Delivery",
    title: "Nag Load (Item Count)",
    subtitle: "Ek-Ek Carton Ki Safety",
    description: "Retailers aur suppliers ke liye best. Har item count karke delivery slip ke sath drop kiya jata hai. Vatika aur Sanganer area me retail supply ke liye perfect.",
    ctaText: "Route Rate Jano",
    ctaLink: "/contact",
    bgOverlay: "from-yellow-900/20 to-slate-900/60"
  }
];

export const HeroSection: React.FC = () => {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto slide rotation every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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
    <section className="relative min-h-[92vh] md:min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Dark Cinematic Background Overlay & Glow */}
      <div className="absolute inset-0 z-0 bg-radial-[circle_at_top_right] from-blue-900/30 via-slate-950 to-slate-950" />
      
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Giant Floating White Rounded Card */}
      <div className="relative z-10 w-full max-w-7xl bg-white/95 rounded-3xl border border-slate-200/50 shadow-2xl p-4 md:p-8 flex flex-col justify-between min-h-[85vh] backdrop-blur-md">
        
        {/* Navigation Bar Header inside the card */}
        <header className="relative w-full z-30">
          <div className="glass-nav rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-sm relative h-16">
            
            {/* Left: Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs xl:text-sm font-medium transition-colors hover:text-primary tracking-wide",
                      isActive ? "text-primary font-bold" : "text-text-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logo & Hamburger Trigger (Hidden on Desktop) */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <Link href="/" className="flex items-center gap-1 font-heading font-bold text-lg">
                <span className="text-primary">SFC</span>
                <span className="text-secondary">Transport</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-text-primary p-2 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Center: Absolute Floating Logo Capsule (Desktop Only) */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -top-5 z-40">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-md flex items-center justify-center w-24 h-24 overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/images/logo.jpeg"
                  alt="SFC Transport Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}
                className="gap-1.5 font-medium border-slate-300 text-text-primary"
              >
                Call: {SITE_CONFIG.contact.phoneCall}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
                className="font-medium bg-secondary text-white hover:bg-secondary/90 border-0"
              >
                WhatsApp Karo
              </Button>
            </div>
          </div>

          {/* Mobile Dropdown Nav Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl flex flex-col gap-3 z-50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-primary/5 text-primary" : "text-text-secondary hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open(`tel:${SITE_CONFIG.contact.phoneCall}`);
                  }}
                  className="w-full text-xs text-center py-2 justify-center"
                >
                  Call Karo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open(SITE_CONFIG.contact.whatsappLink, '_blank');
                  }}
                  className="w-full text-xs text-center py-2 justify-center"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Content Area: Two-Column (Headline on Left, Featured Image on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6 md:my-10 flex-1">
          
          {/* Left Column: Bold Marketing Headlines & Copy (Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 md:gap-6">
            
            {/* Tag Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              {HERO_SLIDES[currentSlide].badge}
            </span>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-none">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-wide">
                {HERO_SLIDES[currentSlide].subtitle}
              </h2>
              <p className="text-sm font-semibold tracking-widest text-slate-400 font-heading uppercase mt-0.5">
                {SITE_CONFIG.fullName}
              </p>
            </div>

            {/* Body Copy */}
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary max-w-xl">
              {HERO_SLIDES[currentSlide].description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  if (HERO_SLIDES[currentSlide].ctaLink.startsWith('http')) {
                    window.open(HERO_SLIDES[currentSlide].ctaLink, '_blank');
                  } else {
                    window.location.href = HERO_SLIDES[currentSlide].ctaLink;
                  }
                }}
                className="w-full sm:w-auto shadow-md"
              >
                {HERO_SLIDES[currentSlide].ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="w-full sm:w-auto border-slate-300 text-text-primary hover:bg-slate-50"
              >
                Routes Aur Rates
              </Button>
            </div>
            
            {/* Quick trust badges */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary font-medium">
              <span className="flex items-center gap-1">✅ Daily Service</span>
              <span className="flex items-center gap-1">⏰ 10 AM - 11 PM</span>
              <span className="flex items-center gap-1">📍 10+ Jaipur Routes</span>
            </div>
          </div>

          {/* Right Column: Featured Image inside beautiful styled frame (Span 5) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group bg-slate-900">
              <Image
                src="/images/hero section.png"
                alt="SFC Transport Fleet"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <p className="text-xs text-accent font-semibold tracking-widest uppercase">Safe Delivery</p>
                  <p className="text-sm font-bold">VKI Se Sitapura & Vatika Daily Routes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Stats on Left, Interactive Slider Navigation on Right */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Bottom Left: Statistics */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 md:gap-10">
            <div>
              <p className="text-2xl font-black text-primary leading-none">10+</p>
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">Routes Covered</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <p className="text-2xl font-black text-secondary leading-none">Daily</p>
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">Running Service</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <p className="text-2xl font-black text-slate-800 leading-none">13 Hr</p>
              <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">10 AM - 11 PM Support</p>
            </div>
          </div>

          {/* Bottom Right: Slider Control Actions */}
          <div className="flex items-center gap-4">
            {/* Slide Counter */}
            <span className="font-heading text-sm font-bold text-slate-400">
              <span className="text-text-primary">0{currentSlide + 1}</span> / 0{HERO_SLIDES.length}
            </span>

            {/* Nav Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-text-primary hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-text-primary hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
export default HeroSection;

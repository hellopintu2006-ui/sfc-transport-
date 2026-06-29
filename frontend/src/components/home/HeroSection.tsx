'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { cn } from '@/shared/utils/cn';

const HERO_SLIDES = [
  {
    badge: "SFC Transport Service",
    title: "Smarter Transport. Faster Deliveries. Nationwide Reach.",
    description: "Experience technology-driven transport solutions built for speed, safety, and efficiency — from freight and logistics to last-mile delivery.",
    ctaText: "See How It Works",
    ctaLink: "/services"
  },
  {
    badge: "Jaipur's Trusted Carrier",
    title: "Reliable Logistics. Damage-Free Delivery. Daily Running.",
    description: "Transporting your industrial materials and bulk commercial goods safely across 10+ Jaipur routes with item-wise counts and verified slips.",
    ctaText: "WhatsApp Rates",
    ctaLink: SITE_CONFIG.contact.whatsappLink
  },
  {
    badge: "GPS Tracked Fleet",
    title: "Real-time Tracking. Complete Security. 13 Hr Support.",
    description: "Our modern fleet of Mahindra Pik-Up, Tata Ace, and Tata 407 vehicles are GPS-enabled and driven by expert local route drivers.",
    ctaText: "Get a Quote",
    ctaLink: "/contact"
  }
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide rotation every 8 seconds
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

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between text-white overflow-hidden bg-slate-950 font-body">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/hero section.png"
          alt="SFC Transport Background Truck"
          fill
          // className="object-cover object-center brightness-[0.35] contrast-[1.05]"
          priority
        />
        {/* Radial Glow & Gradients to optimize text readability on left side */}
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-blue-900/10 via-slate-950/40 to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent z-10" />
      </div>

      {/* Main Layout Container (Padding-top adjusted for sticky transparent header) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between pt-24 pb-12">
        
        {/* Empty placeholder to occupy upper layout space */}
        <div />

        {/* Left Column Content Area */}
        <div className="max-w-3xl flex flex-col items-start gap-4 sm:gap-6 my-auto text-left">
          
          {/* Subtle Tag Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-600/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {HERO_SLIDES[currentSlide].badge}
          </span>

          {/* Main Slide Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] max-w-2xl font-heading">
            {HERO_SLIDES[currentSlide].title}
          </h1>

          {/* Slide Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
            {HERO_SLIDES[currentSlide].description}
          </p>

          {/* Action Call to Action Button */}
          <div className="mt-2 flex w-full sm:w-auto">
            <Link
              href={HERO_SLIDES[currentSlide].ctaLink}
              target={HERO_SLIDES[currentSlide].ctaLink.startsWith('http') ? '_blank' : '_self'}
              className="inline-flex items-center justify-between gap-4 bg-white text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-colors shadow-xl group text-sm sm:text-base w-full sm:w-auto cursor-pointer"
            >
              <span>{HERO_SLIDES[currentSlide].ctaText}</span>
              <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                <ArrowRight size={12} />
              </span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar: Statistics on Left, and empty space on Right */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Stats Section */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 md:gap-12 w-full">
            <div>
              <p className="text-3xl font-black text-white leading-none">10+</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Routes Covered</p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-3xl font-black text-white leading-none">Daily</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Running Service</p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-3xl font-black text-white leading-none">13 Hr</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Support Desk</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;

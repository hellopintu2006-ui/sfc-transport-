import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';

// Dynamically import components below the fold to optimize initial loading speed and SEO
const StatsSection = dynamic(() => import('@/components/home/StatsSection'), {
  loading: () => <div className="min-h-[100px] bg-slate-950 animate-pulse" />,
});
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'), {
  loading: () => <div className="min-h-[300px] bg-brand-bg animate-pulse" />,
});
const RoutesSection = dynamic(() => import('@/components/home/RoutesSection'), {
  loading: () => <div className="min-h-[300px] bg-brand-bg animate-pulse" />,
});
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection'), {
  loading: () => <div className="min-h-[300px] bg-brand-bg animate-pulse" />,
});
const GallerySection = dynamic(() => import('@/components/home/GallerySection'), {
  loading: () => <div className="min-h-[300px] bg-brand-bg animate-pulse" />,
});
const FeedbackPreviewSection = dynamic(() => import('@/components/home/FeedbackPreviewSection'), {
  loading: () => <div className="min-h-[300px] bg-brand-bg animate-pulse" />,
});
const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  loading: () => <div className="min-h-[200px] bg-brand-bg animate-pulse" />,
});
const CareerTeaserSection = dynamic(() => import('@/components/home/CareerTeaserSection'), {
  loading: () => <div className="min-h-[200px] bg-brand-bg animate-pulse" />,
});

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <RoutesSection />
      <WhyUsSection />
      <GallerySection />
      <FeedbackPreviewSection />
      <CTASection />
      <CareerTeaserSection />
    </div>
  );
}

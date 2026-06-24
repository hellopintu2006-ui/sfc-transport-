import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesSection from '@/components/home/ServicesSection';
import RoutesSection from '@/components/home/RoutesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import GallerySection from '@/components/home/GallerySection';
import FeedbackPreviewSection from '@/components/home/FeedbackPreviewSection';
import CTASection from '@/components/home/CTASection';
import CareerTeaserSection from '@/components/home/CareerTeaserSection';

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

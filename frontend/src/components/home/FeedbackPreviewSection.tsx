'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quote } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { StarRating } from '@/shared/ui/StarRating';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { Badge } from '@/shared/ui/Badge';
import { feedbackService, FeedbackResponse } from '@/services/feedback.service';

const FALLBACK_FEEDBACKS = [
  {
    id: "f1",
    customerName: 'Rajesh Sharma',
    shopName: 'Sharma Electronics, Sitapura',
    serviceUsed: 'nag-load',
    starRating: 5,
    serviceQuality: 'excellent',
    deliveryOnTime: true,
    staffBehavior: 'excellent',
    wouldRecommend: true,
    comment: 'VKI se Sitapura tak har ek item bilkul sahi count ke sath safely deliver ho gaya. Delivery slip me sab details proper thi. Staff ka behavior bohot achha tha.',
    isApproved: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "f2",
    customerName: 'Vijay Saini',
    shopName: 'Saini Kirana Store, Vatika',
    serviceUsed: 'part-load',
    starRating: 5,
    serviceQuality: 'excellent',
    deliveryOnTime: true,
    staffBehavior: 'excellent',
    wouldRecommend: true,
    comment: 'Hume thoda sa maal bhejna tha, pure truck ka paisa dene ki zaroorat nahi padi. Part load option bohot badiya hai. Rate bhi bohot sahi hai.',
    isApproved: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "f3",
    customerName: 'Amit Choudhary',
    shopName: 'Choudhary Agro Industries, Sanganer',
    serviceUsed: 'full-load',
    starRating: 4,
    serviceQuality: 'good',
    deliveryOnTime: true,
    staffBehavior: 'good',
    wouldRecommend: true,
    comment: 'SFC Transport ki service bohot fast aur reliable hai. Hamara full load maal time par bina kisi nuksan ke deliver ho gaya.',
    isApproved: true,
    isFeatured: true,
    createdAt: new Date().toISOString()
  }
];

export const FeedbackPreviewSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);

  useEffect(() => {
    const fetchFeaturedFeedbacks = async () => {
      try {
        const data = await feedbackService.getFeatured();
        if (data && data.length > 0) {
          setFeedbacks(data.slice(0, 3));
        } else {
          setFeedbacks(FALLBACK_FEEDBACKS as any);
        }
      } catch (err) {
        console.warn('Could not fetch featured feedbacks, using fallbacks:', err);
        setFeedbacks(FALLBACK_FEEDBACKS as any);
      }
    };
    fetchFeaturedFeedbacks();
  }, []);

  return (
    <section className="py-20 bg-brand-bg font-body" id="feedback-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Customers Kya Kehte Hain?"
          subtitle="Hamare regular clients aur partners ke anubhav aur vishwas"
          centered
        />

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 snap-x-mandatory overflow-x-auto pb-4 md:pb-0 md:overflow-visible flex-row md:flex-row flex-nowrap md:flex-wrap">
          {feedbacks.map((fb) => (
            <Card
              key={fb.id}
              hoverEffect
              className="bg-white flex flex-col justify-between text-left h-full border border-slate-100/80 snap-start shrink-0 w-[85vw] sm:w-[50vw] md:w-auto"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 leading-tight">
                      {fb.customerName}
                    </h4>
                    {fb.shopName && (
                      <p className="text-xs text-text-secondary mt-0.5">{fb.shopName}</p>
                    )}
                  </div>
                  <Quote size={24} className="text-primary/10 shrink-0" />
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={fb.starRating} starSize={16} />
                  <Badge variant="primary" className="text-[10px] capitalize">
                    {fb.serviceUsed.replace('-', ' ')}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed italic">
                  "{fb.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 text-xs flex justify-between text-slate-400">
                <span>Recommended: {fb.wouldRecommend ? 'Yes' : 'No'}</span>
                <span>Delivery: {fb.deliveryOnTime ? 'On Time' : 'Delayed'}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/feedback'}
          >
            Sab Reviews Dekho
          </Button>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/feedback#submit'}
          >
            Apna Review Do
          </Button>
        </div>
      </div>
    </section>
  );
};
export default FeedbackPreviewSection;

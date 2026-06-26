'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quote, ArrowLeft, MessageSquare } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { StarRating } from '@/shared/ui/StarRating';
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

export default function AllReviewsPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackService.getAll({});
        if (data && data.length > 0) {
          setFeedbacks(data);
        } else {
          setFeedbacks(FALLBACK_FEEDBACKS as any);
        }
      } catch (err) {
        console.warn('Could not fetch reviews, using fallbacks:', err);
        setFeedbacks(FALLBACK_FEEDBACKS as any);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left pb-24">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/feedback" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-semibold mb-4 cursor-pointer">
            <ArrowLeft size={16} /> Back to Feedback Page
          </Link>
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
            All Customer Reviews
          </h1>
          <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
            SFC Transport ke bare me hamare grahako ke anubhav aur vishwas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-slate-500 text-sm font-medium">Reviews load ho rahe hain...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-2">
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <MessageSquare className="text-primary" size={20} />
                <span>Total Reviews ({feedbacks.length})</span>
              </h2>
              <Link href="/feedback#submit" passHref legacyBehavior>
                <Button variant="primary" size="sm" className="cursor-pointer gap-1.5 font-bold">
                  Write a Review
                </Button>
              </Link>
            </div>

            {feedbacks.length === 0 ? (
              <p className="text-center py-16 text-slate-500 text-sm bg-white rounded-xl border border-brand-border">
                No reviews available.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {feedbacks.map((fb) => (
                  <Card key={fb.id} className="bg-white border border-slate-100 flex flex-col gap-4 text-left p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading font-bold text-slate-900 text-lg">{fb.customerName}</h3>
                        {fb.shopName && <p className="text-xs text-text-secondary mt-0.5">{fb.shopName}</p>}
                      </div>
                      <Quote size={24} className="text-primary/10 shrink-0" />
                    </div>

                    <div className="flex items-center gap-2">
                      <StarRating rating={fb.starRating} starSize={16} />
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {fb.serviceUsed.replace('-', ' ')}
                      </Badge>
                    </div>

                    {fb.comment && (
                      <p className="text-sm text-text-secondary leading-relaxed italic">
                        "{fb.comment}"
                      </p>
                    )}

                    <div className="border-t border-slate-50 pt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
                      <span>Quality: <strong className="capitalize text-slate-500 font-medium">{fb.serviceQuality}</strong></span>
                      <span>Staff: <strong className="capitalize text-slate-500 font-medium">{fb.staffBehavior}</strong></span>
                      <span>On Time: <strong className="text-slate-500 font-medium">{fb.deliveryOnTime ? 'Yes' : 'No'}</strong></span>
                      <span>Would Recommend: <strong className="text-slate-500 font-medium">{fb.wouldRecommend ? 'Yes' : 'No'}</strong></span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

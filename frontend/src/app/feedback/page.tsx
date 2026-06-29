'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quote, Plus } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { StarRating } from '@/shared/ui/StarRating';
import { feedbackService, FeedbackResponse } from '@/services/feedback.service';
import { toast } from '@/shared/hooks/useToast';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);

  const [formData, setFormData] = useState({
    customerName: '',
    shopName: '',
    serviceUsed: 'full-load' as 'full-load' | 'part-load' | 'nag-load',
    starRating: 5,
    serviceQuality: 'excellent' as 'excellent' | 'good' | 'average' | 'poor',
    deliveryOnTime: true,
    staffBehavior: 'excellent' as 'excellent' | 'good' | 'average' | 'poor',
    wouldRecommend: true,
    comment: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const data = await feedbackService.getAll({});
      setFeedbacks(data || []);
    } catch (err) {
      console.error('Could not fetch reviews from database:', err);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id === 'customerName' ? 'customerName' : id === 'shopName' ? 'shopName' : 'comment';
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      serviceUsed: e.target.value as any
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      starRating: rating
    }));
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      serviceQuality: e.target.value as any
    }));
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      staffBehavior: e.target.value as any
    }));
  };

  const handleToggle = (field: 'deliveryOnTime' | 'wouldRecommend', value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const cleanShop = formData.shopName === '' ? null : formData.shopName;
      const cleanComment = formData.comment === '' ? null : formData.comment;
      
      const res = await feedbackService.submit({
        ...formData,
        shopName: cleanShop,
        comment: cleanComment
      });

      toast.success(res.message || 'Feedback submitted successfully!');
      setSubmitSuccess(true);
      setFormData({
        customerName: '',
        shopName: '',
        serviceUsed: 'full-load',
        starRating: 5,
        serviceQuality: 'excellent',
        deliveryOnTime: true,
        staffBehavior: 'excellent',
        wouldRecommend: true,
        comment: ''
      });
      setErrors({});
      fetchFeedbacks();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  // Sort reviews descending: 5-star first, then 4-star, etc.
  const sortedFeedbacks = [...feedbacks].sort((a, b) => b.starRating - a.starRating);

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Customer Feedback
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Hamari services aur team ke bare me logo ke vishwas aur anubhav
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-12 flex-1 w-full">
        
        {/* Top: Submit Form (Centered and larger on desktop) */}
        <div className="max-w-3xl mx-auto w-full" id="submit">
          <Card className="bg-white border border-slate-200/80 p-8 md:p-10 shadow-md hover:shadow-xl hover:scale-[1.01] hover:border-primary/20 transition-all duration-300 group">
            <h3 className="text-2xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              📝 Apna Review Likhein
            </h3>

            {submitSuccess ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center text-slate-800 space-y-4">
                <span className="text-3xl">🎉</span>
                <h4 className="text-lg font-bold text-success font-heading">Thank You!</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Aapka review submit ho gaya hai. Admin review ke baad yeh website par live show hone lagega.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSubmitSuccess(false)} 
                  className="w-full hover:scale-105 hover:bg-slate-50 active:scale-95 transition-all duration-200"
                >
                  Naya Review Dijiye
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="customerName"
                    label="Aapka Naam (Required)"
                    placeholder="Naam likhein"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    error={errors.customerName}
                    className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />

                  <Input
                    id="shopName"
                    label="Dukaan / Company Naam (Optional)"
                    placeholder="Dukaan ka naam likhein"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    id="serviceUsed"
                    label="Service Used"
                    options={[
                      { value: 'full-load', label: 'Full Load' },
                      { value: 'part-load', label: 'Part Load' },
                      { value: 'nag-load', label: 'Nag Load' }
                    ]}
                    value={formData.serviceUsed}
                    onChange={handleServiceChange}
                    className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Star Rating</label>
                    <div className="py-2.5">
                      <StarRating rating={formData.starRating} interactive onChange={handleRatingChange} starSize={22} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    id="serviceQuality"
                    label="Service Quality"
                    options={[
                      { value: 'excellent', label: 'Excellent' },
                      { value: 'good', label: 'Good' },
                      { value: 'average', label: 'Average' },
                      { value: 'poor', label: 'Poor' }
                    ]}
                    value={formData.serviceQuality}
                    onChange={handleQualityChange}
                    className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                  <Select
                    id="staffBehavior"
                    label="Staff Behavior"
                    options={[
                      { value: 'excellent', label: 'Excellent' },
                      { value: 'good', label: 'Good' },
                      { value: 'average', label: 'Average' },
                      { value: 'poor', label: 'Poor' }
                    ]}
                    value={formData.staffBehavior}
                    onChange={handleStaffChange}
                    className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200/50 rounded-xl p-4 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">Delivery On Time?</p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggle('deliveryOnTime', true)}
                        className={`px-4 py-1.5 rounded-lg border font-bold cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                          formData.deliveryOnTime ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle('deliveryOnTime', false)}
                        className={`px-4 py-1.5 rounded-lg border font-bold cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                          !formData.deliveryOnTime ? 'bg-secondary text-white border-secondary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">Would Recommend?</p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggle('wouldRecommend', true)}
                        className={`px-4 py-1.5 rounded-lg border font-bold cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                          formData.wouldRecommend ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle('wouldRecommend', false)}
                        className={`px-4 py-1.5 rounded-lg border font-bold cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                          !formData.wouldRecommend ? 'bg-secondary text-white border-secondary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <Textarea
                  id="comment"
                  label="Aapka Feedback (Optional)"
                  placeholder="Apna experience detail me likhein..."
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  className="focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                />

                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={loading} 
                  className="w-full py-4 justify-center gap-1.5 font-bold hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  <Plus size={18} /> Review Submit Karein
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Bottom: Feedbacks List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-brand-border shadow-sm">
            <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <span>💬</span> Customer Reviews
            </h3>
          </div>

          {sortedFeedbacks.length === 0 ? (
            <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
              No reviews available yet. Be the first to write a review!
            </div>
          ) : (
            <div className="relative w-full">
              {/* Horizontal scroll container on desktop, vertical list on mobile */}
              <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-6 pt-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scroll-smooth">
                {sortedFeedbacks.map((fb) => (
                  <Card 
                    key={fb.id} 
                    className="bg-white border border-slate-100 flex flex-col gap-4 text-left p-6 hover:shadow-lg hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 md:w-[420px] md:min-w-[420px] shrink-0 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-heading font-bold text-slate-900 text-lg">{fb.customerName}</h4>
                        {fb.shopName && <p className="text-xs text-text-secondary mt-0.5">{fb.shopName}</p>}
                      </div>
                      <Quote size={20} className="text-primary/10 shrink-0" />
                    </div>

                    <div className="flex items-center gap-2">
                      <StarRating rating={fb.starRating} starSize={14} />
                      <Badge variant="primary" className="text-[10px] capitalize">
                        {fb.serviceUsed.replace('-', ' ')}
                      </Badge>
                    </div>

                    {fb.comment && (
                      <p className="text-sm text-text-secondary leading-relaxed italic flex-1">
                        "{fb.comment}"
                      </p>
                    )}

                    <div className="border-t border-slate-50 pt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
                      <span>Quality: <strong className="capitalize text-slate-500 font-medium">{fb.serviceQuality}</strong></span>
                      <span>Staff: <strong className="capitalize text-slate-500 font-medium">{fb.staffBehavior}</strong></span>
                      <span>On Time: <strong className="text-slate-500 font-medium">{fb.deliveryOnTime ? 'Yes' : 'No'}</strong></span>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Desktop Scroll Indicator Helper */}
              <div className="hidden md:flex justify-end text-xs text-slate-400 gap-1.5 mt-2 items-center">
                <span>Swipe left/right to view more reviews</span>
                <span>↔</span>
              </div>
            </div>
          )}

          {sortedFeedbacks.length > 0 && (
            <div className="text-center pt-4">
              <Link href="/feedback/all" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="w-full md:w-auto md:px-8 py-3.5 justify-center gap-2 cursor-pointer font-bold border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary hover:border-primary hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
                >
                  🔍 View All Reviews ({sortedFeedbacks.length})
                </Button>
              </Link>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}

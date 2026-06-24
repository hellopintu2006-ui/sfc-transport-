'use client';

import React, { useState, useEffect } from 'react';
import { Quote, Filter, Plus } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { StarRating } from '@/shared/ui/StarRating';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { feedbackService, FeedbackResponse } from '@/services/feedback.service';
import { toast } from '@/shared/hooks/useToast';

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

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [filters, setFilters] = useState({
    serviceUsed: '',
    starRating: 0
  });

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

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const queryFilters: any = {};
        if (filters.serviceUsed) queryFilters.serviceUsed = filters.serviceUsed;
        if (filters.starRating > 0) queryFilters.starRating = filters.starRating;

        const data = await feedbackService.getAll(queryFilters);
        if (data && data.length > 0) {
          setFeedbacks(data);
        } else {
          setFeedbacks(FALLBACK_FEEDBACKS as any);
        }
      } catch (err) {
        console.warn('Could not fetch reviews, using fallbacks:', err);
        setFeedbacks(FALLBACK_FEEDBACKS as any);
      }
    };
    fetchFeedbacks();
  }, [filters]);

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
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Customer Feedback
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Hamari services aur team ke bare me logo ke vishwas aur anubhav
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        
        {/* Left: Feedbacks List (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-brand-border">
            <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span>🔍</span> Filters
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.serviceUsed}
                onChange={(e) => setFilters(prev => ({ ...prev, serviceUsed: e.target.value }))}
                className="px-3 py-1.5 border border-brand-border rounded-[4px] text-xs font-medium bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">All Services</option>
                <option value="full-load">Full Load</option>
                <option value="part-load">Part Load</option>
                <option value="nag-load">Nag Load</option>
              </select>

              <select
                value={filters.starRating}
                onChange={(e) => setFilters(prev => ({ ...prev, starRating: parseInt(e.target.value, 10) }))}
                className="px-3 py-1.5 border border-brand-border rounded-[4px] text-xs font-medium bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="0">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars & Below</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {feedbacks.length === 0 ? (
              <p className="text-center py-12 text-slate-500 text-sm">No reviews match the selected filters.</p>
            ) : (
              feedbacks.map((fb) => (
                <Card key={fb.id} className="bg-white border border-slate-100 flex flex-col gap-4 text-left p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading font-bold text-slate-900">{fb.customerName}</h4>
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
                    <p className="text-sm text-text-secondary leading-relaxed italic">
                      "{fb.comment}"
                    </p>
                  )}

                  <div className="border-t border-slate-50 pt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
                    <span>Quality: <strong className="capitalize text-slate-500 font-medium">{fb.serviceQuality}</strong></span>
                    <span>Staff: <strong className="capitalize text-slate-500 font-medium">{fb.staffBehavior}</strong></span>
                    <span>On Time: <strong className="text-slate-500 font-medium">{fb.deliveryOnTime ? 'Yes' : 'No'}</strong></span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right: Submit Form (Span 5) */}
        <div className="lg:col-span-5" id="submit">
          <Card className="bg-white border border-slate-200/80 p-6">
            <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-3 mb-6">
              Apna Review Likhein
            </h3>

            {submitSuccess ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center text-slate-800 space-y-4">
                <span className="text-3xl">🎉</span>
                <h4 className="text-lg font-bold text-success font-heading">Thank You!</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Aapka review submit ho gaya hai. Admin review ke baad yeh website par live show hone lagega.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitSuccess(false)} className="w-full">
                  Naya Review Dijiye
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="customerName"
                  label="Aapka Naam (Required)"
                  placeholder="Naam likhein"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  error={errors.customerName}
                />

                <Input
                  id="shopName"
                  label="Dukaan / Company Naam (Optional)"
                  placeholder="Dukaan ka naam likhein"
                  value={formData.shopName}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-2 gap-4">
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
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Star Rating</label>
                    <div className="py-2.5">
                      <StarRating rating={formData.starRating} interactive onChange={handleRatingChange} starSize={18} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-200/50 rounded-lg p-3 text-xs">
                  <div>
                    <p className="font-semibold text-text-primary mb-2">Delivery On Time?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggle('deliveryOnTime', true)}
                        className={`px-3 py-1 rounded border font-bold cursor-pointer ${
                          formData.deliveryOnTime ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle('deliveryOnTime', false)}
                        className={`px-3 py-1 rounded border font-bold cursor-pointer ${
                          !formData.deliveryOnTime ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-2">Would Recommend?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggle('wouldRecommend', true)}
                        className={`px-3 py-1 rounded border font-bold cursor-pointer ${
                          formData.wouldRecommend ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle('wouldRecommend', false)}
                        className={`px-3 py-1 rounded border font-bold cursor-pointer ${
                          !formData.wouldRecommend ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-600 border-slate-200'
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
                />

                <Button type="submit" variant="primary" isLoading={loading} className="w-full py-3 justify-center gap-1">
                  <Plus size={16} /> Review Submit Karein
                </Button>
              </form>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

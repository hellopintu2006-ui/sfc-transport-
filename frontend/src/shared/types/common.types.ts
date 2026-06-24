export interface ContactEnquiry {
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message: string;
}

export interface FeedbackReview {
  customerName: string;
  shopName?: string | null;
  serviceUsed: 'full-load' | 'part-load' | 'nag-load';
  starRating: number;
  serviceQuality: 'excellent' | 'good' | 'average' | 'poor';
  deliveryOnTime: boolean;
  staffBehavior: 'excellent' | 'good' | 'average' | 'poor';
  wouldRecommend: boolean;
  comment?: string | null;
}

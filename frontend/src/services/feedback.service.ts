import { apiClient } from './api-client';

export interface FeedbackData {
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

export interface FeedbackResponse extends FeedbackData {
  id: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export const feedbackService = {
  async submit(data: FeedbackData): Promise<{ message: string; feedback: FeedbackResponse }> {
    return apiClient.post('/api/feedback', data);
  },

  async getFeatured(): Promise<FeedbackResponse[]> {
    return apiClient.get('/api/feedback/list?featured=true');
  },

  async getAll(filters?: { serviceUsed?: string; starRating?: number }): Promise<FeedbackResponse[]> {
    let query = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.serviceUsed) params.append('serviceUsed', filters.serviceUsed);
      if (filters.starRating) params.append('starRating', String(filters.starRating));
      query = `?${params.toString()}`;
    }
    return apiClient.get(`/api/feedback/list${query}`);
  },
};

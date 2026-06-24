import { apiClient } from './api-client';

export interface ContactData {
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message: string;
}

export const contactService = {
  async submit(data: ContactData): Promise<{ message: string; submission: any }> {
    return apiClient.post('/api/contact', data);
  },
};

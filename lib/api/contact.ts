import { apiClient } from './client';
import { ContactFormInput, Contact, PaginatedResponse, ApiResponse } from '@/types/api';

export const contactApi = {
  submit: async (data: ContactFormInput): Promise<ApiResponse<null>> => {
    return apiClient.post<null>('/contact', data);
  },

  getAll: async (token: string, page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Contact>> => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    const response = await apiClient.get<Contact[]>(`/contact/admin?${query.toString()}`, token);

    return response as PaginatedResponse<Contact>;
  }
};

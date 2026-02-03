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

    // Special handling: The backend response structure for getAllContacts seems to meet PaginatedResponse structure roughly.
    // Docs: data: [...], pagination: {...}
    // Our apiClient.get returns ApiResponse<T>.
    // So T should be T[]. Wait, ApiResponse has data?: T. 
    // If backend returns { success: true, data: [...], pagination: ... }
    // Then T in ApiResponse is [Contact]. And pagination is extra field in ApiResponse?
    // The interface in types/api.ts for PaginatedResponse extends ApiResponse<T[]> which matches.

    const response = await apiClient.get<Contact[]>(`/contact/admin?${query.toString()}`, token);

    // We need to cast or ensure response fits PaginatedResponse
    return response as PaginatedResponse<Contact>;
  }
};

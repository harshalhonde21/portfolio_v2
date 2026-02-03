import { apiClient } from './client';
import { AuthResponse, AdminUser, ApiResponse } from '@/types/api';

const TOKEN_KEY = 'admin_token'; // In-memory/localStorage for strict client-side SPA feeling

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/admin/login', { email, password });
    if (response.success && response.data) {
      // Securely handling token in memory/context is preferred, but for persistence across refresh we use localStorage
      // Since this is a "Hacker" interface, localStorage fits the client-heavy vulnerability theme (conceptually),
      // though HttpOnly cookies would be safer. Given the requirements for "Integrate MERN backend", we use standard JWT bearer pattern.
      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      return response.data;
    }
    throw new Error(response.message || 'Login failed');
  },

  verifyToken: async (): Promise<AdminUser> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) throw new Error('No token found');

    // Adjusted: The backend /verify-token returns token info, but standard usually returns user.
    // Based on docs: GET /admin/verify-token -> data: { id, role, iat, exp }
    // We might need to fetch profile separately or rely on this.
    // Let's assume verify-token confirms validity.
    // Actually, looking at the docs, verify-token returns minimal data.
    // If we need full user object we might need to rely on what login returned or if verify returns more.
    // The doc says success response has data: { id, role... }.
    // Let's type it loosely or exact as per doc.

    // However, usually we want the user object.
    // If the docs say verify-token returns { id, role }, we map it to AdminUser best effort or just validity.
    // Let's proceed with calling it.

    const response = await apiClient.get<any>('/admin/verify-token', token);

    // Synthesizing a user object from token verification if needed, or if the API returns full object.
    // The provided Example Doc response for verify-token is sparse.
    // For now we trust it validates the session. 
    // Ideally we would want a /me endpoint or similar.
    // We will return what we can.

    if (response.success && response.data) {
      return {
        _id: response.data.id,
        role: response.data.role,
        email: '', // Not provided by verify-token in docs, this is a limitation
        name: 'Admin', // Placeholder
        isVerified: true
      };
    }
    throw new Error('Token invalid');
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }
};

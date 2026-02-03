export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export interface Contact extends ContactFormInput {
  _id: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isVerified: boolean;
  lastLoginAt?: string;
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}

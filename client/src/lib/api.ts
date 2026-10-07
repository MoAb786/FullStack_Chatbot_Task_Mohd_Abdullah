import type {
  ApiResponse,
  Enquiry,
  EnquiryInput,
  EnquiryStats,
  EnquiryStatus,
  UserType,
} from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'dronetv_admin_token';

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

async function fetchJson<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        authStorage.removeToken();
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected network error occurred');
  }
}

// API Methods
export const api = {
  // Public
  async healthCheck(): Promise<ApiResponse> {
    return fetchJson('/health');
  },

  async createEnquiry(enquiry: EnquiryInput): Promise<ApiResponse<Enquiry>> {
    return fetchJson<Enquiry>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiry),
    });
  },

  // Auth
  async login(email: string, password: string): Promise<ApiResponse<{ admin: { email: string; role: string } }>> {
    const res = await fetchJson<{ admin: { email: string; role: string }; token?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (res as any).token;
    if (token) {
      authStorage.setToken(token);
    }
    return res;
  },

  async getMe(): Promise<ApiResponse<{ admin: { email: string; role: string } }>> {
    return fetchJson('/auth/me');
  },

  logout(): void {
    authStorage.removeToken();
  },

  // Protected Enquiries
  async getEnquiries(params?: {
    search?: string;
    userType?: UserType | 'All';
    status?: EnquiryStatus | 'All';
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Enquiry[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.userType && params.userType !== 'All') query.append('userType', params.userType);
    if (params?.status && params.status !== 'All') query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const qs = query.toString();
    return fetchJson<Enquiry[]>(`/enquiries${qs ? `?${qs}` : ''}`);
  },

  async getEnquiryStats(): Promise<ApiResponse<EnquiryStats>> {
    return fetchJson<EnquiryStats>('/enquiries/stats');
  },

  async getEnquiryById(id: string): Promise<ApiResponse<Enquiry>> {
    return fetchJson<Enquiry>(`/enquiries/${id}`);
  },

  async updateEnquiryStatus(
    id: string,
    status: EnquiryStatus
  ): Promise<ApiResponse<Enquiry>> {
    return fetchJson<Enquiry>(`/enquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async deleteEnquiry(id: string): Promise<ApiResponse<{ id: string }>> {
    return fetchJson<{ id: string }>(`/enquiries/${id}`, {
      method: 'DELETE',
    });
  },
};

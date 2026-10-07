export type UserType = 'Student' | 'Customer' | 'Other';

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
}

export interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  closed: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'enquiry' | 'navigate';
    label: string;
    payload?: string;
  };
}

export interface ChatIntent {
  id: string;
  keywords: string[];
  response: string;
  action?: {
    type: 'enquiry' | 'navigate';
    label: string;
    payload?: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  errors?: Array<{ field?: string; message: string }>;
}

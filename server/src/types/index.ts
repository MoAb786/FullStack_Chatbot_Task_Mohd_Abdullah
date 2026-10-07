export type UserType = 'Student' | 'Customer' | 'Other';

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface IEnquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthAdminPayload {
  email: string;
  role: 'admin';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field?: string; message: string }>;
}

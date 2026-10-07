import { z } from 'zod';

export const createEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(150, { message: 'Email cannot exceed 150 characters' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Phone number must be at least 7 digits' })
    .max(20, { message: 'Phone number cannot exceed 20 characters' })
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: 'Please enter a valid phone number',
    }),
  userType: z.enum(['Student', 'Customer', 'Other'] as const, {
    message: 'User type must be Student, Customer, or Other',
  }),
  interest: z
    .string()
    .trim()
    .min(2, { message: 'Please specify your area of interest' })
    .max(150, { message: 'Interest cannot exceed 150 characters' }),
  message: z
    .string()
    .trim()
    .min(5, { message: 'Message must be at least 5 characters long' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
});

export const updateEnquirySchema = z.object({
  status: z
    .enum(['New', 'Contacted', 'In Progress', 'Closed'] as const, {
      message: 'Status must be New, Contacted, In Progress, or Closed',
    })
    .optional(),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().trim().email().max(150).optional(),
  phone: z.string().trim().min(7).max(20).optional(),
  userType: z.enum(['Student', 'Customer', 'Other'] as const).optional(),
  interest: z.string().trim().min(2).max(150).optional(),
  message: z.string().trim().min(5).max(2000).optional(),
});

export const enquiryQuerySchema = z.object({
  search: z.string().optional(),
  userType: z.enum(['Student', 'Customer', 'Other', 'All'] as const).optional(),
  status: z.enum(['New', 'Contacted', 'In Progress', 'Closed', 'All'] as const).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  sortBy: z.enum(['createdAt', 'name', 'status', 'userType'] as const).optional(),
  sortOrder: z.enum(['asc', 'desc'] as const).optional(),
});

export const objectIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid enquiry ID format',
  }),
});

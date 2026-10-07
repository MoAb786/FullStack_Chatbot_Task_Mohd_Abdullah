import { Schema, model, Document } from 'mongoose';
import { IEnquiry, UserType, EnquiryStatus } from '../types';

export interface EnquiryDocument extends Document, Omit<IEnquiry, '_id'> {}

const enquirySchema = new Schema<EnquiryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address',
      ],
      maxlength: [150, 'Email cannot exceed 150 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [7, 'Phone number must be at least 7 characters'],
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: {
        values: ['Student', 'Customer', 'Other'] as UserType[],
        message: 'User type must be Student, Customer, or Other',
      },
    },
    interest: {
      type: String,
      required: [true, 'Service or course of interest is required'],
      trim: true,
      maxlength: [150, 'Interest cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters long'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'In Progress', 'Closed'] as EnquiryStatus[],
        message: 'Status must be New, Contacted, In Progress, or Closed',
      },
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast searching and filtering in Admin Dashboard
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ userType: 1, createdAt: -1 });
enquirySchema.index({ name: 'text', email: 'text', interest: 'text', message: 'text' });

export const Enquiry = model<EnquiryDocument>('Enquiry', enquirySchema);

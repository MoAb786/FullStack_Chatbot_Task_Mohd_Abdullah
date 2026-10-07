import { Request, Response, NextFunction } from 'express';
import { Enquiry } from '../models/enquiry.model';

// POST /api/enquiries (Public)
export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, userType, interest, message } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      userType,
      interest,
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully! Our team will contact you shortly.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiries (Protected)
export const getEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      search,
      userType,
      status,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query as {
      search?: string;
      userType?: string;
      status?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (userType && userType !== 'All') {
      filter.userType = userType;
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { interest: searchRegex },
        { message: searchRegex },
      ];
    }

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Math.min(100, Number(limit)));
    const skip = (pageNumber - 1) * limitNumber;

    const sortOption: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiries/stats (Protected)
export const getEnquiryStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [total, newCount, contactedCount, inProgressCount, closedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({ status: 'Contacted' }),
      Enquiry.countDocuments({ status: 'In Progress' }),
      Enquiry.countDocuments({ status: 'Closed' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted: contactedCount,
        inProgress: inProgressCount,
        closed: closedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiries/:id (Protected)
export const getEnquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/enquiries/:id (Protected)
export const updateEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/enquiries/:id (Protected)
export const deleteEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id).lean();

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

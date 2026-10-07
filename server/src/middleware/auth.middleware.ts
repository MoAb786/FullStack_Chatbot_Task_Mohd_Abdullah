import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthAdminPayload } from '../types';

export interface AuthenticatedRequest extends Request {
  admin?: AuthAdminPayload;
}

export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide a valid Bearer token.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'supersecretjwtkey_dronetv_intern_2026_change_in_production';

  try {
    const decoded = jwt.verify(token as string, secret) as AuthAdminPayload;
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};

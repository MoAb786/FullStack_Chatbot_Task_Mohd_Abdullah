import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthAdminPayload } from '../types';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dronetv.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@DroneTV2026';
    const secret = process.env.JWT_SECRET || 'supersecretjwtkey_dronetv_intern_2026_change_in_production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const payload: AuthAdminPayload = {
      email: adminEmail,
      role: 'admin',
    };

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      data: {
        admin: {
          email: adminEmail,
          role: 'admin',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dronetv.in';
    res.status(200).json({
      success: true,
      data: {
        admin: {
          email: adminEmail,
          role: 'admin',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export interface AppError extends Error {
  statusCode?: number;
  errors?: Array<{ field?: string; message: string }>;
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  console.error('[Error Middleware]:', err);

  // Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: `Invalid ID format for field '${err.path}'`,
    });
    return;
  }

  // Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    const valErr = err as mongoose.Error.ValidationError;
    const formattedErrors = Object.values(valErr.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400).json({
      success: false,
      message: 'Database validation failed',
      errors: formattedErrors,
    });
    return;
  }

  const appErr = err as AppError;
  // Generic status code or default to 500
  const statusCode = appErr.statusCode || 500;
  const message =
    statusCode === 500
      ? 'An unexpected error occurred on the server. Please try again later.'
      : appErr.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(appErr.errors && { errors: appErr.errors }),
  });
};

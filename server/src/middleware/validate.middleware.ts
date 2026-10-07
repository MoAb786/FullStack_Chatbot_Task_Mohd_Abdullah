import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate = (schema: ZodType, target: ValidationTarget = 'body') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(req[target]);
      if (target === 'query') {
        Object.defineProperty(req, 'query', {
          value: parsed,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        req[target] = parsed;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues || [];
        const formattedErrors = issues.map((issue) => ({
          field: issue.path.join('.') || target,
          message: issue.message,
        }));

        res.status(400).json({
          success: false,
          message: formattedErrors[0]?.message || 'Validation failed',
          errors: formattedErrors,
        });
        return;
      }
      next(error);
    }
  };
};

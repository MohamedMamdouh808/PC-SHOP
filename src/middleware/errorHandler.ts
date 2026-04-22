import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/errors';
import { ZodError } from 'zod';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // Structured AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      errors: [
        {
          code: err.code,
          message: err.message,
          field: err.field || null,
        },
      ],
    });
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.issues.map((issue) => ({
        code: 'VALIDATION_ERROR',
        message: issue.message,
        field: issue.path.join('.'),
      })),
    });
  }

  // Prisma known errors
  if (err.constructor.name === 'PrismaClientKnownRequestError') {
    const prismaErr = err as any;
    if (prismaErr.code === 'P2002') {
      const target = prismaErr.meta?.target?.[0] || 'field';
      return res.status(409).json({
        errors: [
          {
            code: 'CONFLICT',
            message: `A record with this ${target} already exists.`,
            field: target,
          },
        ],
      });
    }
    if (prismaErr.code === 'P2025') {
      return res.status(404).json({
        errors: [
          {
            code: 'NOT_FOUND',
            message: 'Record not found.',
            field: null,
          },
        ],
      });
    }
  }

  // Fallback: unexpected error
  console.error('Unhandled error:', err);
  return res.status(500).json({
    errors: [
      {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          process.env.NODE_ENV === 'development'
            ? err.message
            : 'An unexpected error occurred.',
        field: null,
      },
    ],
  });
}

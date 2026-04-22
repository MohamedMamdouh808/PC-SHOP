import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Express middleware factory for Zod schema validation.
 * Validates req.body, req.query, or req.params based on the `source` parameter.
 */
export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(result.error); // caught by errorHandler
    }
    req[source] = result.data;
    next();
  };
}

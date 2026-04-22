import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../lib/errors';

export interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

// Extend Express Request to include user data
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Verifies the JWT access token from the Authorization header.
 * Sets req.user on success.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or invalid Authorization header'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Access token expired'));
    }
    return next(new UnauthorizedError('Invalid access token'));
  }
}

/**
 * Requires the authenticated user to have one of the specified roles.
 * Must be used AFTER the `authenticate` middleware.
 */
export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError(`Requires one of: ${roles.join(', ')}`));
    }
    next();
  };
}

/**
 * Ensures the authenticated user can only access their own resources.
 * Compares req.user.sub with a userId param or field.
 */
export function resourceOwner(paramName = 'userId') {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    const targetUserId = req.params[paramName];
    if (targetUserId && targetUserId !== req.user.sub) {
      return next(new ForbiddenError('You can only access your own resources'));
    }
    next();
  };
}

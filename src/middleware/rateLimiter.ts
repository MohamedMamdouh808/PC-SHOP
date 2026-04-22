import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '../lib/redis';
import { RateLimitError } from '../lib/errors';

interface RateLimiterOptions {
  windowMs: number;    // Window size in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string;  // Redis key prefix
}

/**
 * Redis sliding-window rate limiter middleware.
 * Default: 100 requests per minute per IP.
 */
export function rateLimiter(options: RateLimiterOptions = {
  windowMs: 60_000,
  maxRequests: 100,
  keyPrefix: 'rate',
}) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const redis = await getRedisClient();
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const key = `${options.keyPrefix}:${ip}`;
      const now = Date.now();
      const windowStart = now - options.windowMs;

      // Use a Redis sorted set for sliding window
      await redis.zRemRangeByScore(key, 0, windowStart);
      const requestCount = await redis.zCard(key);

      if (requestCount >= options.maxRequests) {
        return next(new RateLimitError());
      }

      await redis.zAdd(key, { score: now, value: `${now}:${Math.random()}` });
      await redis.expire(key, Math.ceil(options.windowMs / 1000));

      // Set rate limit headers
      _res.setHeader('X-RateLimit-Limit', options.maxRequests);
      _res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - requestCount - 1));

      next();
    } catch (err) {
      // If Redis is down, allow the request through (fail-open)
      console.error('Rate limiter error:', err);
      next();
    }
  };
}

/**
 * Stricter rate limiter for auth endpoints: 10 requests per minute.
 */
export const authRateLimiter = rateLimiter({
  windowMs: 60_000,
  maxRequests: 10,
  keyPrefix: 'rate:auth',
});

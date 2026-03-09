import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * In-memory rate limit for public POST /crmlead/from-website.
 * Limits by IP: max 15 requests per 60 seconds (sliding window).
 * For production at scale, use Redis or @nestjs/throttler.
 */
@Injectable()
export class FromWebsiteRateLimitGuard implements CanActivate {
  private readonly windowMs = 60 * 1000; // 1 minute
  private readonly maxPerWindow = 15;
  private readonly hits = new Map<string, number[]>();

  private prune(now: number) {
    const cutoff = now - this.windowMs;
    for (const [key, times] of this.hits.entries()) {
      const kept = times.filter((t) => t > cutoff);
      if (kept.length === 0) this.hits.delete(key);
      else this.hits.set(key, kept);
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      request.ip ||
      request.socket?.remoteAddress ||
      'unknown';
    const now = Date.now();
    this.prune(now);

    const times = this.hits.get(ip) ?? [];
    if (times.length >= this.maxPerWindow) {
      throw new HttpException(
        { message: 'Too many submissions. Please try again later.' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    times.push(now);
    this.hits.set(ip, times);
    return true;
  }
}

import redis from '@algofox/db';

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; reason: 'RATE_LIMIT_EXCEEDED'; retryAfter: number }
  | { allowed: false; reason: 'REDIS_UNAVAILABLE' | 'REDIS_ERROR' };

const MAX_REQUESTS = 60;
const WINDOW_SECONDS = 60;

export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  try {
    const key = `ai:ratelimit:${userId}`;
    const now = Date.now();
    const secondsToNextMinute = WINDOW_SECONDS - (Math.floor(now / 1000) % WINDOW_SECONDS);

    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, secondsToNextMinute);
    }

    if (count > MAX_REQUESTS) {
      return { allowed: false, reason: 'RATE_LIMIT_EXCEEDED', retryAfter: secondsToNextMinute };
    }

    return { allowed: true, remaining: MAX_REQUESTS - count };
  } catch {
    return { allowed: false, reason: 'REDIS_UNAVAILABLE' };
  }
}

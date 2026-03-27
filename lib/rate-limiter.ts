import Redis from 'ioredis';

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

class RateLimiter {
  private redis: Redis | null = null;
  private memoryStore: Map<string, { count: number; resetTime: number }> = new Map();
  private useRedis: boolean;

  constructor() {
    this.useRedis = !!process.env.REDIS_URL;
    if (this.useRedis) {
      this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    }
  }

  async checkLimit(
    key: string,
    config: Readonly<RateLimitConfig> | RateLimitConfig
  ): Promise<RateLimitResult> {
    const prefixedKey = `${config.keyPrefix || 'rl'}:${key}`;
    const now = Date.now();

    if (this.useRedis && this.redis) {
      return this.checkRedisLimit(prefixedKey, config, now);
    }

    return this.checkMemoryLimit(prefixedKey, config, now);
  }

  private async checkRedisLimit(
    key: string,
    config: RateLimitConfig,
    now: number
  ): Promise<RateLimitResult> {
    const redis = this.redis!;
    const windowStart = now - config.windowMs;
    const resetTime = now + config.windowMs;

    try {
      // Increment counter and set expiry
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.pexpire(key, config.windowMs);
      }

      const remaining = Math.max(0, config.maxRequests - count);

      return {
        allowed: count <= config.maxRequests,
        remaining,
        resetTime,
        retryAfter: count > config.maxRequests ? config.windowMs / 1000 : undefined,
      };
    } catch (error) {
      console.error('Redis rate limit error:', error);
      // Fallback to memory store on Redis error
      return this.checkMemoryLimit(key, config, now);
    }
  }

  private checkMemoryLimit(
    key: string,
    config: RateLimitConfig,
    now: number
  ): RateLimitResult {
    let record = this.memoryStore.get(key);
    const resetTime = now + config.windowMs;

    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime };
      this.memoryStore.set(key, record);
    }

    record.count++;
    const remaining = Math.max(0, config.maxRequests - record.count);

    return {
      allowed: record.count <= config.maxRequests,
      remaining,
      resetTime: record.resetTime,
      retryAfter: record.count > config.maxRequests ? Math.ceil((record.resetTime - now) / 1000) : undefined,
    };
  }

  async reset(key: string, keyPrefix: string = 'rl'): Promise<void> {
    const prefixedKey = `${keyPrefix}:${key}`;
    if (this.useRedis && this.redis) {
      await this.redis.del(prefixedKey);
    } else {
      this.memoryStore.delete(prefixedKey);
    }
  }

  async resetAll(keyPrefix: string = 'rl'): Promise<void> {
    if (this.useRedis && this.redis) {
      const pattern = `${keyPrefix}:*`;
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } else {
      for (const key of this.memoryStore.keys()) {
        if (key.startsWith(`${keyPrefix}:`)) {
          this.memoryStore.delete(key);
        }
      }
    }
  }

  cleanup(): void {
    if (this.redis) {
      this.redis.disconnect();
    }
    this.memoryStore.clear();
  }
}

// Singleton instance
let rateLimiter: RateLimiter;

export function getRateLimiter(): RateLimiter {
  if (!rateLimiter) {
    rateLimiter = new RateLimiter();
  }
  return rateLimiter;
}

// Common rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  // Very strict for auth endpoints
  AUTH_LOGIN: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    keyPrefix: 'auth-login',
  },
  AUTH_REGISTER: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    keyPrefix: 'auth-register',
  },
  AUTH_PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    keyPrefix: 'auth-password-reset',
  },
  // Moderate for general API endpoints
  API_GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    keyPrefix: 'api-general',
  },
  // Stricter for submission endpoints
  SUBMISSIONS: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyPrefix: 'submissions',
  },
  // For user-specific operations
  USER_OPERATIONS: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    keyPrefix: 'user-ops',
  },
} as const;

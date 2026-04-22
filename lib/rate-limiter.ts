import connection from './redis';

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
  private redis = connection;
  private memoryStore: Map<string, { count: number; resetTime: number }> = new Map();
  private useRedis: boolean;

  constructor() {
    this.useRedis = true; // Always try to use Redis since we have a singleton

    // Cleanup interval to prevent memory leaks in memoryStore
    if (typeof setInterval !== 'undefined') {
      setInterval(() => {
        const now = Date.now();
        for (const [key, record] of this.memoryStore.entries()) {
          if (now > record.resetTime) {
            this.memoryStore.delete(key);
          }
        }
      }, 5 * 60 * 1000); // Clean up every 5 minutes
    }
  }

  async checkLimit(
    key: string,
    config: Readonly<RateLimitConfig> | RateLimitConfig
  ): Promise<RateLimitResult> {
    // DEV ONLY: Bypass rate limiting in development to prevent lockouts during testing
    // WARNING: Ensure NODE_ENV is never 'development' in production
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.ENABLE_LIMIT_IN_DEV !== 'true' &&
      !process.env.VERCEL_ENV // Additional guard: Vercel sets this in deployments
    ) {
        return { allowed: true, remaining: 999, resetTime: Date.now() + 60000 };
    }

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
    const windowMs = config.windowMs;

    try {
      // Use Lua script for atomic increment + ttl check to ensure reliability
      const luaScript = `
        local count = redis.call('INCR', KEYS[1])
        if count == 1 then
          redis.call('PEXPIRE', KEYS[1], ARGV[1])
        elseif redis.call('PTTL', KEYS[1]) == -1 then
          redis.call('PEXPIRE', KEYS[1], ARGV[1])
        end
        return {count, redis.call('PTTL', KEYS[1])}
      `;

      const [count, pttl] = await redis.eval(luaScript, 1, key, windowMs.toString()) as [number, number];
      const resetTime = now + (pttl > 0 ? pttl : windowMs);
      const remaining = Math.max(0, config.maxRequests - count);

      return {
        allowed: count <= config.maxRequests,
        remaining,
        resetTime,
        retryAfter: count > config.maxRequests ? Math.ceil(pttl / 1000) : undefined,
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
      // FIX: Use SCAN instead of KEYS to avoid blocking Redis.
      // KEYS is O(N) over all keys and blocks the entire Redis event loop.
      const pattern = `${keyPrefix}:*`;
      let cursor = '0';
      const keysToDelete: string[] = [];
      do {
        const [nextCursor, keys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', '100');
        cursor = nextCursor;
        keysToDelete.push(...keys);
      } while (cursor !== '0');

      if (keysToDelete.length > 0) {
        await this.redis.del(...keysToDelete);
      }
    } else {
      for (const key of this.memoryStore.keys()) {
        if (key.startsWith(`${keyPrefix}:`)) {
          this.memoryStore.delete(key);
        }
      }
    }
  }
}

// Declare global singleton to survive HMR
declare global {
  var rate_limiter_fox: RateLimiter | undefined;
}

export function getRateLimiter(): RateLimiter {
  if (!globalThis.rate_limiter_fox) {
    globalThis.rate_limiter_fox = new RateLimiter();
  }
  return globalThis.rate_limiter_fox;
}

// Common rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  // Very strict for auth endpoints
  AUTH_LOGIN: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 100, // Increased to 100 - prevent total lockout
    keyPrefix: 'auth-login',
  },
  AUTH_REGISTER: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 100, // Increased
    keyPrefix: 'auth-register',
  },
  AUTH_PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50, // Increased
    keyPrefix: 'auth-password-reset',
  },
  // Moderate for general API endpoints
  API_GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5000, // Significant increase to avoid prefetch/navigation lockouts in 4,000 user env
    keyPrefix: 'api-general',
  },
  // Stricter for submission endpoints
  SUBMISSIONS: {
    windowMs: 30 * 1000, // 30 seconds
    maxRequests: 50, // Permissive for quick tests/practice
    keyPrefix: 'submissions',
  },
  // For user-specific operations
  USER_OPERATIONS: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 200, // Increased
    keyPrefix: 'user-ops',
  },
} as const;

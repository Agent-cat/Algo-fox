import redis from "./redis";

/**
 * Generic Redis TTL tiers for cache-utils.
 * Renamed from CACHE_CONFIG to REDIS_CACHE_CONFIG to avoid import confusion with
 * the domain-specific CACHE_CONFIG in lib/cache-config.ts which has different structure.
 */
export const REDIS_CACHE_CONFIG = {
  // Short-lived cache for frequently changing data
  SHORT: { ttl: 30, stale: 15 },
  // Medium cache for moderately changing data
  MEDIUM: { ttl: 120, stale: 60 },
  // Long cache for rarely changing data
  LONG: { ttl: 600, stale: 300 },
  // Very long cache for static-ish data
  STATIC: { ttl: 3600, stale: 1800 },
} as const;


/**
 * Generate a consistent cache key
 */
export function cacheKey(prefix: string, ...parts: (string | number)[]): string {
  return `algofox:${prefix}:${parts.join(":")}`;
}

/**
 * Get data from Redis cache with automatic JSON parsing
 */
async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
     console.error("[Cache] Get error:", error);
    return null;
  }
}

/**
 * Set data in Redis cache with automatic JSON serialization
 */
async function setInCache<T>(
  key: string,
  data: T,
  ttlSeconds: number = REDIS_CACHE_CONFIG.MEDIUM.ttl
): Promise<void> {
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
  } catch (error) {
     console.error("[Cache] Set error:", error);
  }
}

/**
 * Delete a cache key
 */
export async function deleteFromCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
     console.error("[Cache] Delete error:", error);
  }
}

/**
 * Get or set pattern - tries cache first, falls back to fetcher
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = REDIS_CACHE_CONFIG.MEDIUM.ttl
): Promise<T> {
  // Try cache first
  const cached = await getFromCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const data = await fetcher();

  // Cache the result (don't await to not block response)
  setInCache(key, data, ttlSeconds).catch(() => {});

  return data;
}

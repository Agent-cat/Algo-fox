import redis from "./redis";

/**
 * Cache configuration for different data types
 */
export const CACHE_CONFIG = {
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
export async function getFromCache<T>(key: string): Promise<T | null> {
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
export async function setInCache<T>(
  key: string,
  data: T,
  ttlSeconds: number = CACHE_CONFIG.MEDIUM.ttl
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
 * Delete multiple cache keys by pattern
 */
export async function deleteByPattern(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error("[Cache] Delete pattern error:", error);
  }
}

/**
 * Get or set pattern - tries cache first, falls back to fetcher
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = CACHE_CONFIG.MEDIUM.ttl
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

/**
 * Invalidate cache keys for an entity
 */
export async function invalidateCache(
  prefix: string,
  ...ids: (string | number)[]
): Promise<void> {
  const pattern = `algofox:${prefix}:${ids.length > 0 ? ids.join(":") : "*"}`;
  await deleteByPattern(pattern);
}

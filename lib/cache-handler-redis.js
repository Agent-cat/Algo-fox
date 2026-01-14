// @ts-check
const IORedis = require("ioredis");

const CACHE_PREFIX = "nextjs:cache:";

// Create a separate Redis connection for the cache handler
// This avoids issues with the main Redis connection singleton
const redis = new IORedis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

/**
 * Redis-backed cache handler for Next.js Cache Components.
 * Enables shared caching across multiple server instances.
 * @type {import('next/dist/server/lib/cache-handlers/types').CacheHandler}
 */
const redisCacheHandler = {
  async get(cacheKey) {
    try {
      const data = await redis.get(`${CACHE_PREFIX}${cacheKey}`);
      if (!data) return undefined;

      const entry = JSON.parse(data);
      return entry;
    } catch (error) {
      console.error("[Redis Cache] Get error:", error);
      return undefined;
    }
  },

  async set(cacheKey, pendingEntry) {
    try {
      const entry = await pendingEntry;
      const serialized = JSON.stringify(entry);

      // Use expire time from entry or default to 1 hour
      const ttl = entry.expire ? Math.max(1, Math.floor(entry.expire - Date.now() / 1000)) : 3600;

      await redis.setex(`${CACHE_PREFIX}${cacheKey}`, ttl, serialized);
    } catch (error) {
      console.error("[Redis Cache] Set error:", error);
    }
  },

  async refreshTags() {
    // No-op for basic implementation
    // Tags are handled via revalidateTag calls
  },

  async getExpiration(tags) {
    // Return 0 to indicate tags haven't been revalidated
    try {
      const pipeline = redis.pipeline();
      for (const tag of tags) {
        pipeline.get(`${CACHE_PREFIX}tag:${tag}`);
      }
      const results = await pipeline.exec();

      if (!results) return 0;

      let maxExpiration = 0;
      for (const [err, result] of results) {
        if (!err && result) {
          const timestamp = parseInt(result, 10);
          if (timestamp > maxExpiration) {
            maxExpiration = timestamp;
          }
        }
      }
      return maxExpiration;
    } catch (error) {
      console.error("[Redis Cache] getExpiration error:", error);
      return 0;
    }
  },

  async updateTags(tags, durations) {
    try {
      const now = Date.now();
      const pipeline = redis.pipeline();

      for (const tag of tags) {
        // Store the revalidation timestamp for each tag
        pipeline.setex(
          `${CACHE_PREFIX}tag:${tag}`,
          Math.max(1, Math.floor(durations.expire)),
          now.toString()
        );
      }

      await pipeline.exec();
    } catch (error) {
      console.error("[Redis Cache] updateTags error:", error);
    }
  },
};

module.exports = redisCacheHandler;

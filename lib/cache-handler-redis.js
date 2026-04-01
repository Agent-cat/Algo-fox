// @ts-check
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Redis = require("ioredis").default || require("ioredis");
console.log("[redis] [Cache] Redis cache handler initialized");
const CACHE_PREFIX = "nextjs:cache:";

// Create a separate Redis connection for the cache handler
// This avoids issues with the main Redis connection singleton
const commonOptions = {
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,
  lazyConnect: true, // Only connect when needed
  connectTimeout: 500, // Fail fast (500ms)
  /** @param {number} times */
  retryStrategy: (times) => {
    // During build or if Redis is down, we want to fail fast so
    // Next.js falls back to local/no cache instead of timing out.
    if (times > 1) {
      return null; // Stop retrying
    }
    return 100; // Retry once after 100ms
  },
};

const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, commonOptions)
  : new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      ...commonOptions,
    });

redis.on("error", (error) => {
  console.warn("[Redis Cache Handler] Connection error:", error.message);
});

/**
 * Redis-backed cache handler for Next.js Cache Components.
 * Enables shared caching across multiple server instances.
 * @type {import('next/dist/server/lib/cache-handlers/types').CacheHandler}
 */
const redisCacheHandler = {
  async get(cacheKey) {
    console.log(`[redis] [Cache] GET ${cacheKey}`);
    try {
      const data = await redis.get(`${CACHE_PREFIX}${cacheKey}`);
      if (!data) return undefined;

      const entry = JSON.parse(data);
      console.log(`[redis] [Cache] HIT ${cacheKey}`);

      // Reconstruct the ReadableStream from stored base64 data
      return {
        ...entry,
        value: new ReadableStream({
          start(controller) {
            controller.enqueue(Buffer.from(entry.value, "base64"));
            controller.close();
          },
        }),
      };
    } catch (error) {
      console.error("[Redis Cache] Get error:", error);
      return undefined;
    }
  },

  async set(cacheKey, pendingEntry) {
    console.log(`[redis] [Cache] SET ${cacheKey}`);
    try {
      const entry = await pendingEntry;

      // Read the stream to get the data
      const reader = entry.value.getReader();
      const chunks = [];

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }

      const data = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));

      // Store in Redis with TTL from entry.expire (duration in seconds)
      const serialized = JSON.stringify({
        ...entry,
        value: data.toString("base64"),
      });

      const ttl = entry.expire ?? 3600;
      await redis.setex(`${CACHE_PREFIX}${cacheKey}`, ttl, serialized);

      // Ensure tags have an initialization timestamp if they don't already.
      // This allows getExpiration() to work correctly for fresh entries.
      if (entry.tags && entry.tags.length > 0) {
        const now = Date.now();
        const tagPipeline = redis.pipeline();
        for (const tag of entry.tags) {
          tagPipeline.setnx(`${CACHE_PREFIX}tag:${tag}`, now.toString());
        }
        await tagPipeline.exec();
      }

      console.log(`[redis] [Cache] SET completed ${cacheKey}`);

    } catch (error) {
      console.error("[Redis Cache] Set error:", error);
    }
  },

  async refreshTags() {
    // Background scanner to clean up stale entries in Redis.
    // While getExpiration() handles logical staleness, this periodically
    // purges keys from Redis to free up memory.
    try {
      const pattern = `${CACHE_PREFIX}*`;
      let cursor = "0";
      const keysToDelete = [];

      do {
        const [nextCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", "100");
        cursor = nextCursor;

        if (keys.length === 0) continue;

        const pipeline = redis.pipeline();
        keys.forEach((k) => pipeline.get(k));
        const results = await pipeline.exec();

        if (!results) continue;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const result = results[i];
          if (!result) continue;

          const [err, raw] = result;
          if (err || typeof raw !== "string") continue;
          if (key.includes(":tag:")) continue;

          try {
            const entry = JSON.parse(raw);
            const entryTags = Array.isArray(entry.tags) ? entry.tags : [];
            if (entryTags.length === 0) continue;

            const storedAt = entry.lastModified ?? entry.timestamp ?? 0;
            const tagPipeline = redis.pipeline();
            for (const tag of entryTags) {
              tagPipeline.get(`${CACHE_PREFIX}tag:${tag}`);
            }

            const tagResults = await tagPipeline.exec();
            if (!tagResults) continue;

            const isStale = tagResults.some((tagResult) => {
              if (!tagResult) return false;
              const [tagErr, tagTimestamp] = tagResult;
              if (tagErr || !tagTimestamp) return false;
              return parseInt(String(tagTimestamp), 10) > storedAt;
            });

            if (isStale) {
              keysToDelete.push(key);
            }
          } catch (_parseErr) {
            // Skip unparseable
          }
        }
      } while (cursor !== "0");

      if (keysToDelete.length > 0) {
        await redis.del(...keysToDelete);
        console.log(`[redis] [Cache] refreshTags deleted ${keysToDelete.length} stale entries`);
      }
    } catch (error) {
      console.error("[Redis Cache] refreshTags error:", error);
    }
  },

  async getExpiration(tags) {
    if (!tags || tags.length === 0) return 0;

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
          const timestamp = parseInt(String(result), 10);
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
    console.log(`[redis] [Cache] updateTags ${tags.join(", ")}`);
    try {
      const now = Date.now();
      const pipeline = redis.pipeline();
      for (const tag of tags) {
        pipeline.set(`${CACHE_PREFIX}tag:${tag}`, now.toString());
        // If an explicit expiration is provided for the tag revalidation, apply it
        if (durations?.expire) {
          pipeline.expire(`${CACHE_PREFIX}tag:${tag}`, durations.expire);
        }
      }
      await pipeline.exec();
    } catch (error) {
      console.error("[Redis Cache] updateTags error:", error);
    }
  },
};

module.exports = redisCacheHandler;

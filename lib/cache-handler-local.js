// @ts-check

/**
 * Local memory cache map.
 * Stores entries as Buffer instead of ReadableStream.
 * @type {Map<string, any>}
 */
const localCache = new Map();
console.log("[local] [Cache] Local cache handler initialized");
/**
 * Tag revalidation timestamps.
 * @type {Map<string, number>}
 */
const tagExpirations = new Map();

/** @type {import('next/dist/server/lib/cache-handlers/types').CacheHandler} */
const localCacheHandler = {
  async get(cacheKey, _softTags) {
    console.log(`[local] [Cache] GET ${cacheKey}`);
    const entry = localCache.get(cacheKey);

    if (!entry) return undefined;

    // Check if the entry is still valid according to tags
    if (entry.tags && Array.isArray(entry.tags) && entry.tags.length > 0) {
      const storedAt = entry.lastModified ?? entry.timestamp ?? 0;
      for (const tag of entry.tags) {
        const tagExpiration = tagExpirations.get(tag) || 0;
        if (tagExpiration > storedAt) {
          console.log(`[local] [Cache] STALE ${cacheKey} (due to tag: ${tag})`);
          localCache.delete(cacheKey);
          return undefined;
        }
      }
    }

    console.log(`[local] [Cache] HIT ${cacheKey}`);

    // Reconstruct ReadableStream from stored buffer
    return {
      ...entry,
      value: new ReadableStream({
        start(controller) {
          controller.enqueue(entry.value);
          controller.close();
        },
      }),
    };
  },

  async set(cacheKey, pendingEntry) {
    console.log(`[local] [Cache] SET ${cacheKey}`);
    try {
      const entry = await pendingEntry;

      // Consume the stream into a buffer
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

      const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));

      localCache.set(cacheKey, {
        ...entry,
        value: buffer,
      });

      // Simple memory management: cleanup oldest entries if map exceeds 5000
      if (localCache.size > 5000) {
        const firstKey = localCache.keys().next().value;
        if (firstKey) localCache.delete(firstKey);
      }

      console.log(`[local] [Cache] SET completed ${cacheKey}`);
    } catch (error) {
      console.error("[Local Cache] Set error:", error);
    }
  },

  async refreshTags() {
    // Local memory handler doesn't need external revalidation syncing like Redis
    return Promise.resolve();
  },

  async getExpiration(tags) {
    if (!tags || tags.length === 0) return 0;

    let maxExpiration = 0;
    for (const tag of tags) {
      const expiration = tagExpirations.get(tag) || 0;
      if (expiration > maxExpiration) {
        maxExpiration = expiration;
      }
    }
    return maxExpiration;
  },

  async updateTags(tags, _durations) {
    console.log(`[local] [Cache] updateTags ${tags.join(", ")}`);
    const now = Date.now();
    for (const tag of tags) {
      tagExpirations.set(tag, now);
    }
  },
};

module.exports = localCacheHandler;

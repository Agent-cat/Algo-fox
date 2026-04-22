import redis from "@/lib/redis";

/**
 * SCAN-based pattern delete — non-blocking alternative to KEYS.
 *
 * `redis.keys("pattern:*")` is O(N) and blocks the Redis event loop during traversal,
 * which causes latency spikes under high concurrency.
 *
 * `SCAN` iterates in small batches (COUNT 100), yielding control between each batch.
 * This is safe for production use even on large key spaces.
 */
export async function scanAndDelete(pattern: string): Promise<number> {
    let cursor = 0;
    let totalDeleted = 0;

    do {
        const [nextCursor, keys] = await redis.scan(
            cursor,
            "MATCH",
            pattern,
            "COUNT",
            100
        );
        cursor = parseInt(nextCursor, 10);

        if (keys.length > 0) {
            await redis.del(...keys);
            totalDeleted += keys.length;
        }
    } while (cursor !== 0);

    return totalDeleted;
}

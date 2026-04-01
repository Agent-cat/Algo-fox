import IORedis from "ioredis";

// FIX: Export a factory function so BullMQ Queue, Worker, and QueueEvents each get their own
// dedicated connection. Sharing a single connection causes head-of-line blocking because
// BullMQ's SUBSCRIBE/BRPOP commands block the connection for other commands.
export function createRedisConnection(overrides: Record<string, any> = {}): IORedis {
    const conn = new IORedis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        maxRetriesPerRequest: null,  // Required for BullMQ; safe for general use
        enableReadyCheck: false,
        lazyConnect: true,
        ...overrides,
    });

    conn.on("error", (error) => {
        // Log errors in all environments (essential for production debugging)
        console.warn("[Redis] Connection error:", error);
    });

    return conn;
}

// Default singleton for non-BullMQ usage (rate limiter, cache utils, leaderboard, etc.)
const redis = createRedisConnection();
export default redis;

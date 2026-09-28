import IORedis from "ioredis";
import { env } from "@algofox/env";

// FIX: Export a factory function so BullMQ Queue, Worker, and QueueEvents each get their own
// dedicated connection. Sharing a single connection causes head-of-line blocking because
// BullMQ's SUBSCRIBE/BRPOP commands block the connection for other commands.
export function createRedisConnection(overrides: Record<string, any> = {}): IORedis {
    const redisUrl = env.REDIS_URL && env.REDIS_URL !== "DISABLED" ? env.REDIS_URL : null;

    const options: any = {
        maxRetriesPerRequest: null, // Required for BullMQ; safe for general use
        enableReadyCheck: false,
        lazyConnect: true,
        ...overrides,
    };

    const conn = redisUrl
        ? new IORedis(redisUrl, options)
        : new IORedis({
            host: env.REDIS_HOST || "127.0.0.1",
            port: parseInt(env.REDIS_PORT || "6379"),
            ...options,
        });

    conn.on("error", (error) => {
        // Log errors in all environments (essential for production debugging)
        console.warn("[Redis] Connection error:", error);
    });

    return conn;
}

declare global {
    var redis_fox_singleton: IORedis | undefined;
}

const redis = globalThis.redis_fox_singleton ?? createRedisConnection();

if (env.NODE_ENV !== "production") {
    globalThis.redis_fox_singleton = redis;
}

export default redis;

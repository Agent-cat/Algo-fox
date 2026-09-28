/**
 * @algofox/db — datastores (Postgres via Prisma, Redis via ioredis).
 * Owns the Prisma schema; `prisma generate` runs here on install.
 */
export { prisma } from "./client";
export { createRedisConnection } from "./redis";
import redis from "./redis";
export default redis;

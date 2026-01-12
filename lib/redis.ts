import IORedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const connection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("error", (error) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[Redis] Connection error:", error);
  }
});

export default connection;

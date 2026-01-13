import IORedis from "ioredis";

const connection = new IORedis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

connection.on("error", (error) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[Redis] Connection error:", error);
  }
});

export default connection;

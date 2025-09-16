const { createClient } = require("redis");

class RedisClient {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  async connect() {
    try {
      this.client = createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_HOST || 6379,
          port: Number(process.env.REDIS_PORT),
        },
      });

      this.client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      this.client.on("connect", () => {
        console.log("✅ Redis client connected");
        this.connected = true;
      });

      await this.client.connect();
    } catch (error) {
      console.error("❌ Redis connection error:", error);
      this.connected = false;
    }
  }

  async set(key, data, expireSeconds = 3600) {
    if (!this.connected) return false;
    try {
      await this.client.setEx(key, expireSeconds, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Redis set error:", error);
      return false;
    }
  }

  async get(key) {
    if (!this.connected) return null;
    try {
      const str = await this.client.get(key);
      return str ? JSON.parse(str) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async del(key) {
    if (!this.connected) return false;
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error("Redis del error:", error);
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

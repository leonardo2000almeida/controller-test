import { redis } from "../../infrastructure/repository/redis";

class RedisUseCases {
  static create = async () => {
      const client = await redis();
  };
}

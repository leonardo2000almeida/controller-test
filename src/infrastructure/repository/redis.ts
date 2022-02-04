import { createClient, RedisClientType } from "redis";

export const redis = async () => {
  try {
    const client = createClient();
    await client.connect();
    return client;
  } catch (err) {
    console.log(err);
  }
};

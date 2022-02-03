import { createClient } from "redis";

export const redis = async () => {
  try {
    const client = createClient();
    return await client.connect();
  } catch (err) {
    console.log(err);
  }
};

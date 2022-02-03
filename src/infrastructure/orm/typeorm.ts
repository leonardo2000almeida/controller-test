import { createConnection } from "typeorm";

export const connectToPostgres = async () => {
  try {
    return await createConnection();
  } catch (err) {
    console.log(err);
  }
};

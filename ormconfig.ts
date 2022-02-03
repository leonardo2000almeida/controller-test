import dotenv from "dotenv";

dotenv.config({ path: "./src/infrastructure/config/config.env" });

export default {
  type: "postgres",
  host: process.env.PG_HOST,
  username: process.env.PG_USERNAME,
  password: `${process.env.PG_PASSWORD}`,
  migrationsTransactionMode: "none",
  migrations: ["./src/infrastructure/orm/migrations/*.ts"],
  entities: ["./src/infrastructure/orm/schema/*.entity.ts"],
  cli: {
    migrationsDir: "src/infrastructure/orm/migrations",
  },
};

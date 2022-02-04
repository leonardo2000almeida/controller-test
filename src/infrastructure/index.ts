import express, { Application } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

import { PostgresConfig } from "./types/database.d";
import { connectToPostgres } from "./orm/typeorm";
import { RouterConfig } from "../interface/types/routes";
import { join } from "path";
import { redis } from "./repository/redis";

class Microservice {
  port: number;
  app: Application;

  constructor(port: number, app?: Application) {
    this.port = port;
    this.app = app || express();
  }

  setupRoutes = (routes?: [RouterConfig]): Microservice => {
    routes?.map((route) => this.app.use(route.prefix, route.route));
    return new Microservice(this.port, this.app);
  };

  setupMiddlewares = (): Microservice => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.text());
    return new Microservice(this.port, this.app);
  };

  run = async (): Promise<void> => {
    //load vars
    dotenv.config({ path: join(__dirname, "./config/config.env") });

    this.app.listen(this.port, async () => {
      await redis();
      await connectToPostgres();
      console.log(`Server listen on port: ${this.port}`);
    });
  };
}

export default Microservice;

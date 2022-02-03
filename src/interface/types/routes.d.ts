import { Router } from "express";

export interface RouterConfig {
  route: Router;
  prefix: string;
}

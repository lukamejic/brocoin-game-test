import express, { Request, Response } from "express";

import { Config } from "../config/Config";
import { AppDependencies } from "../server";

export function getHealthRouter(dependencies: AppDependencies): express.Router {
  const router: express.Router = express.Router();

  // TODO: Implement
  // TODO: Might not need this after all, maybe there's a package solving it
  router.get("/", async (req: Request, res: Response) => {
    return res.status(200);
  });
  router.get("/test-bot", async (req: Request, res: Response) => {
    console.log(req);
    return res.status(200);
  });

  return router;
}

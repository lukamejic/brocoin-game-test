import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";

import { getHealthRouter } from "./controllers/healthController";

import { Config } from "./config/Config";
// import { generateUuid } from "./utils";

export interface IUuidGenerator{
  generateUuid(): string;
  generatePhoneNumberVerificationCode(): string;
}

export type AppDependencies = {
  config: Config;
  uuidGenerator: IUuidGenerator
};

const adjustedBodyparser = (req, res, next) => {
  bodyParser.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
};

export function getServerApp(dependencies: AppDependencies): Express {
  const app: Express = express();

  // app.use(bodyParser.json());
  app.use(adjustedBodyparser);
  app.use(cors());
  app.use("/health", getHealthRouter(dependencies));
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("Welcome to the bot server!");
  });
  // Must be the last middleware for the app to use. Don't change the order of the middleware.
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    // TODO: Error logging
    res.status(500).send({
      errors: ["It's not you, it's us. Sorry for the inconvenience."]
    });
    next();
  });

  return app;
}

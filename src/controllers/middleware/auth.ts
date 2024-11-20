import { Request, Response, NextFunction } from "express";
import { jwtWrappers, UserJwtPayload } from "../jwt";
import { Config } from "./../../config/Config";

function enrichRequestBody(req: Request, jwtPayload: UserJwtPayload) {
  // In case of /GET requests, we will add the body
  if (!req.body) {
    req.body = {};
  }

  req.body.email = jwtPayload.email;
  req.body.address = jwtPayload.address;
}

export const enrichAuth = {
  requestBody: enrichRequestBody
};

export function getCheckAuth(config: Config) {
  function checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return res.status(401).json({ errors: ["No token provided"] });
    }

    try {
      const decoded = jwtWrappers.verifyJwt(
        token,
        config.JWT_SECRET
      ) as UserJwtPayload;
      enrichAuth.requestBody(req, decoded);
      next();
    } catch (error) {
      return res.status(401).json({ errors: ["Failed to authenticate token"] });
    }
  }

  return checkAuth;
}

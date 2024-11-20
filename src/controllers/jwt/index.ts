import jwt from "jsonwebtoken";

export type UserJwtPayload = {
  address?: string;
  email?: string;
};

function createJwt(payload: UserJwtPayload, secret: jwt.Secret): string {
  const options: jwt.SignOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

function verifyJwt(token: string, secret: jwt.Secret) {
  // No options used for now.
  return jwt.verify(token, secret);
}

export const jwtWrappers = {
  verifyJwt,
  createJwt
};

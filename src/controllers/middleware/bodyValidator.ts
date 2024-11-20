import { utils } from "ethers";
import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).send(errors);
    const errorsArray = errors.array();
    return res.status(400).send({errors:[errorsArray[0].msg + ' - ' + errorsArray[0].param + '.']});
  }
  next();
}

export function isValidTier() {
  return function (value: any) {
    const numbericValue = Number.parseInt(value);
    // 0, 1, 2 are valid tiers.
    if (numbericValue >= 0 && numbericValue <= 2) {
      return true;
    }
    throw new Error(`${numbericValue} is not a valid tier`);
  }
}

export function isAddress() {
  return function (value: any) {
    if (utils.isAddress(value)) {
      return true;
    }
    throw new Error(`${value} is not an address`);
  };
}

export function isEmailArray() {
  return function (value: any) {
    const arr = value as Array<any>;
    throw new Error(`${value} is not an array of emails`);
  };
}

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isUnique = (value: any[]): boolean => {
  return new Set(value).size === value.length;
};

export const connectedEmailsValidator: ValidationChain[] = [
  body("connectedEmails")
    .exists()
    .withMessage("connectedEmails field is required")
    .isArray()
    .withMessage("connectedEmails must be an array")
    .isArray({ max: 10, min: 0 })
    .withMessage("connectedEmails array should not have more than 10 elements")
    .custom((value) => value.every((val: any) => typeof val === "string"))
    .withMessage("connectedEmails array should contains only strings")
    .custom((value) => value.every((val: any) => isValidEmail(val)))
    .withMessage("connectedEmails array should contains only valid emails")
    .custom((value) => isUnique(value))
    .withMessage("connectedEmails array should contains only unique values")
];

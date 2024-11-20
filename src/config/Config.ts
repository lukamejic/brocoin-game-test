import dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
  throw new Error("Config loading error");
}

export type Config = {
  MONGODB_USERNAME: string;
  MONGODB_PASSWORD: string;
  MONGODB_AT: string;
  JWT_SECRET: string;
};

// Keys as strings
const MONGODB_USERNAME = "MONGODB_USERNAME";
const MONGODB_PASSWORD = "MONGODB_PASSWORD";
const MONGODB_AT = "MONGODB_AT";
const JWT_SECRET = "JWT_SECRET";

// Required keys in an array
const REQUIRED_KEYS = [
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_AT,
  JWT_SECRET
];

/**
 * Checks for missing keys after loading the .env file.
 */
function errorCheck() {
  const missingKeys: string[] = [];

  for (const key of REQUIRED_KEYS) {
    if (process.env[key] === undefined) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length !== 0) {
    throw new Error(`Missing keys: ${missingKeys}`);
  }
}

let config: Config;

export function getConfig(): Config {
  if (!config) {
    const result = dotenv.config();

    if (result.error) {
      throw new Error("Config loading error");
    }

    errorCheck();

    config = {
      MONGODB_USERNAME: process.env[MONGODB_USERNAME] as string,
      MONGODB_PASSWORD: process.env[MONGODB_PASSWORD] as string,
      MONGODB_AT: process.env[MONGODB_AT] as string,
      JWT_SECRET: process.env[JWT_SECRET] as string
    };
  }

  return config;
}

import { getServerApp, AppDependencies, IUuidGenerator } from "./server";
import { Config, getConfig } from "./config/Config";
import { connectionHandling } from "./database/connection";
import { generatePhoneNumberVerificationCode, generateUuid } from "./utils";
import { webhookCallback } from "grammy";
import { bot } from "./utils/bot";

const config = getConfig();
const { openConnection, closeConnection } = connectionHandling(config);
const uuidGenerator: IUuidGenerator = {
  generateUuid: generateUuid,
  generatePhoneNumberVerificationCode: generatePhoneNumberVerificationCode
}

async function main() {
  await openConnection();
  const dependencies: AppDependencies = {
    config,
    uuidGenerator
  }


  const domain = String(process.env.DOMAIN);
  const secretPath = String(process.env.BOT_TOKEN);

  const server = getServerApp(dependencies);
  server.listen(process.env.PORT || 8080, async () => {
    console.log("Server is up and running!");
    await bot.api.setWebhook(`https://${domain}/${secretPath}`);
  });

  // TODO: Add close server on certain signals (gracefully)
}

main();
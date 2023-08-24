const util = require("util");
const { Input } = require("telegraf");
const { Telegraf } = require("telegraf");
const screenshot = require("desktop-screenshot");

require("dotenv").config();

const screenshotPromise = util.promisify(screenshot);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const token = process.env.APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.APP_CHAT_ID;
  const seconds = 1000 * 1 * 60;
  while (1) {
    try {
      await screenshotPromise("screenshot.png");
      try {
        const bot = new Telegraf(token);
        const photo = Input.fromLocalFile("./screenshot.png");
        bot.telegram.sendPhoto(chatId, photo);
        await sleep(seconds);
      } catch (exception) {}
    } catch (exception) {}
  }
}

main();

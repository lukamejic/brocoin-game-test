import { Bot, InlineKeyboard } from "grammy";
import jwt from "jsonwebtoken";
import { User } from "../database/models/User.js";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

export const bot = new Bot(token, {
    botInfo: {
        id: Number(process.env.BOT_ID),
        is_bot: true,
        first_name: "BrocoinTest",
        username: "brocointest_bot",
        can_join_groups: false,
        can_read_all_group_messages: false,
        supports_inline_queries: true,
        can_connect_to_business: false,
        has_main_web_app: true
    }
});

// Commands - Start, Play, Leaderboard, About, Help
bot.command("start", async (ctx) => {

    await User.updateOne({ telegramId: ctx.from?.id.toString() }, {
        telegramId: ctx.from?.id.toString(),
        name: ctx.from?.first_name || "" + " " + ctx.from?.last_name || "",
        username: ctx.from?.username || ""
      }, { upsert: true });

    // console.log("User doc id:", userDocId);
    ctx.reply("Hello!!! \nThis is a game bot");
    // ctx.replyWithPhoto("https://img.etimg.com/thumb/msid-106967420,width-300,height-225,imgsize-478624,resizemode-75/my-life-with-the-walter-boys-season-2-see-everything-we-know-about-renewal-production-plot-and-more.jpg", {
    //     "caption": `<b>Hi, ${ctx.from?.first_name}</b><br><p>Play the game now and become top players in the leaderboard!!!</p>`,
    //     "parse_mode": "HTML"
    // })
});
bot.command("play", async (ctx) => {
    await User.updateOne({ telegramId: ctx.from?.id.toString() }, {
        telegramId: ctx.from?.id.toString(),
        name: ctx.from?.first_name || "" + " " + ctx.from?.last_name || "",
        username: ctx.from?.username || ""
      }, { upsert: true });

    // console.log("User doc id:", userDocId);
    const keyboard = new InlineKeyboard().game("Play now!")
        .row()
        .text("Leaderboard", "leaderboard")
        .text("About", "about");
    ctx.replyWithGame("brocoin_game_test", {
        reply_markup: keyboard,
        protect_content: true,
        disable_notification: true
    });
});
bot.command("leaderboard", (ctx) => {
    ctx.reply("Leaderboard!!! \n1. User1\n2. User2\n3. User3");
});
bot.command("about", (ctx) => {
    ctx.reply("About!!! \nThis is a game bot");
});
bot.command("help", (ctx) => {
    ctx.reply(`
    <b>Settle Mints Game Bot Help</b><br>
    <p>Get in touch with the game support team.</p>
  `, { parse_mode: "HTML" })
});
bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === "leaderboard") {
        ctx.reply("Leaderboard!!! \n1. User1\n2. User2\n3. User3");
    } else if (data === "about") {
        ctx.reply("About!!! \nThis is a game bot");
    }
});
bot.on("callback_query:game_short_name", async (ctx) => {   
    const options: jwt.SignOptions = {
        expiresIn: "1h"
    };
    const tokenLocal = jwt.sign(ctx.from.id.toString(), process.env.JWT_SECRET, options);
    console.log("Token: " + tokenLocal);
    await ctx.answerCallbackQuery({ url: `https://${process.env.FRONTEND_URL}/?token=${tokenLocal}` });
});

bot.catch((err) => console.error(err));
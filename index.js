const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return
  if (msg.content.startsWith("/char")) {
    const args = msg.content.split(" ");
    const character = args[1];
    fetch(`https://animechan.vercel.app/api/random/character?name=${character}`)
      .then((response) => response.json())
      .then((quote) => {
        msg.reply(quote.quote);
      });
  } else {
    msg.reply(`Start the message like /char ${msg.content}`);
  }
})

client.login("token here")
require("dotenv").config();

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const mongoose = require("mongoose");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

async function startBot() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB: CONNECTED");

    client.once("ready", () => {
      console.log(`🤪 LIEMMY ONLINE: ${client.user.tag}`);
    });

    await client.login(process.env.DISCORD_TOKEN);

  } catch (error) {
    console.error("❌ BOT ERROR:", error);
  }
}

startBot();

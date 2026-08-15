require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  }
}

client.once("ready", () => {
  console.log(`🤪 LIEMMY ONLINE: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error("❌ Command Error:", error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "💀 LIEMMY vừa ngã sấp mặt. Thử lại sau.",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "💀 LIEMMY vừa ngã sấp mặt. Thử lại sau.",
        ephemeral: true
      });
    }
  }
});

async function startBot() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB: CONNECTED");

    await client.login(process.env.DISCORD_TOKEN);

  } catch (error) {
    console.error("❌ BOT ERROR:", error);
  }
}

startBot();

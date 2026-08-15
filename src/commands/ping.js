const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kiểm tra LIEMMY còn thở không 💀"),

  async execute(interaction) {
    await interaction.reply(
      "🏓 PONG!\n💰 LIEMMY vẫn còn sống.\n🗿 Tiền thì chưa có nhưng sĩ diện thì đầy."
    );
  }
};

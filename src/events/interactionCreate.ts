import { Events } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);

      // エラーがすでに応答済みの場合の処理
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '実行中にエラーが発生しました。', ephemeral: true });
      } else {
        await interaction.reply({ content: '実行中にエラーが発生しました。', ephemeral: true });
      }
    }
  },
};

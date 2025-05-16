import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with server info.');

export async function execute(interaction: CommandInteraction) {
  await interaction.reply({
    content: `This command was run on server ${interaction.guild?.name || ''}, which has ${
      interaction.guild?.memberCount || 0
    } members.`,
    ephemeral: true,
  });
}

import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop the bot.');

export async function execute(interaction: CommandInteraction): Promise<void> {
  await interaction.reply('Bot is stopping...');
  process.exit(0);
}
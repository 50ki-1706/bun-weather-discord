import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('add-forecasts')
  .setDescription('Add forecasts to the database.');

export async function execute(interaction: CommandInteraction): Promise<void> {
  await interaction.reply('Forecasts added to the database.');
}
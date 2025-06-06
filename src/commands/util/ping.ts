import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction): Promise<void> {
  await interaction.reply({ content: 'Pong!', ephemeral: true });
}

import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Replies with user info.');

export async function execute(interaction: CommandInteraction) {
  await interaction.reply({
    content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
    ephemeral: true,
  });
}

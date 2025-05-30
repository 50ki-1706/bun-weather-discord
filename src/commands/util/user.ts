import { SlashCommandBuilder, GuildMember, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Replies with user info.');

export async function execute(interaction: CommandInteraction): Promise<void> {
  await interaction.reply({
    content: `This command was run by ${interaction.user.username}, who joined on ${
      interaction.member instanceof GuildMember ? interaction.member.joinedAt : 'N/A'
    }.`,
    ephemeral: true,
  });
}

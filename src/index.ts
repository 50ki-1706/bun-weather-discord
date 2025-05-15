import fs from 'fs';
import path from 'path';
import { ActivityType, Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { CommandInteraction, ChatInputCommandInteraction } from 'discord.js';

// create a new Client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildPresences,
  ],
});

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error('Failed to login:', err);
  process.exit(1);
});

client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

const folderPath = path.join(__dirname, 'commands');
const commandFolderPath = path.join(folderPath, 'util');
const commandFolders = fs.readdirSync(commandFolderPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(commandFolderPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command.execute);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command(interaction as ChatInputCommandInteraction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    }
  }
});

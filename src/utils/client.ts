import { GatewayIntentBits } from 'discord.js';
import { Client } from 'discord.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildPresences,
  ],
});

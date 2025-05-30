import fs from 'fs';
import path from 'path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { CommandInteraction } from 'discord.js';

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

// コマンドを保存するコレクションを初期化
client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

// コマンドファイルの読み込み
const loadCommands = async (): Promise<void> => {
  const folderPath = path.join(__dirname, 'commands');
  const commandsPath = path.join(folderPath, 'util');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

  // 各コマンドファイルを読み込む
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    // コマンドに必要なプロパティがあるか確認
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command.execute);
      console.log(`Command ${command.data.name} loaded successfully`);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};

// イベントファイルの読み込み
const loadEvents = async (): Promise<void> => {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);

    if (event.default && 'execute' in event.default) {
      if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args));
      } else {
        client.on(event.default.name, (...args) => event.default.execute(...args));
      }
      console.log(`Event ${event.default.name} loaded successfully`);
    } else {
      console.log(`[WARNING] The event at ${filePath} is missing a required property.`);
    }
  }
};

// 起動処理
const start = async (): Promise<void> => {
  await loadCommands();
  await loadEvents();

  // login with the token from .env.local
  client.login(process.env.DISCORD_TOKEN).catch((err) => {
    console.error('Failed to login:', err);
    process.exit(1);
  });
};

start();

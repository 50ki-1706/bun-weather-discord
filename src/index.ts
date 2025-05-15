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

// コマンドを保存するコレクションを初期化
client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

// コマンドファイルの読み込み
const folderPath = path.join(__dirname, 'commands');
const commandsPath = path.join(folderPath, 'util');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

// 各コマンドファイルを読み込む
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

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

// インタラクションイベントのハンドラー
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

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
});

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // ステータスを設定（オプション）
  c.user.setActivity('コマンドを待機中', { type: ActivityType.Watching });
});

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error('Failed to login:', err);
  process.exit(1);
});

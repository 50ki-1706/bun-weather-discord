import { Collection } from 'discord.js';
import Baker from 'cronbake';
import { CommandInteraction } from 'discord.js';
import { client } from './utils/client';
import { loadCommands, loadEvents } from './utils/loaders';

// コマンドを保存するコレクションを初期化
client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

const baker = Baker.create();

const forecastSchedule = baker.add({
  name: 'daily-job',
  cron: '0 0 0,6,12,18 * * *',
  callback: () => {
    console.log('Daily job executed!');
  },
});

const test = baker.add({
  name: 'test',
  cron: '*/5 * * * * *',
  callback: () => {
    console.log('Test job executed!');
  },
});

// 起動処理
const start = async (): Promise<void> => {
  await loadCommands();
  await loadEvents();
  client
    .login(process.env.DISCORD_TOKEN)
    .then(() => {
      forecastSchedule.start();
      test.start();
    })
    .catch((err) => {
      console.error('Failed to login:', err);
      process.exit(1);
    });
};

start();

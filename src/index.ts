import { Collection } from 'discord.js';
import Baker from 'cronbake';
import { CommandInteraction } from 'discord.js';
import { client } from './utils/client';
import { loadCommands, loadEvents } from './utils/loaders';
import { env } from './schemas/env';
import { getWeather } from './api/weather/api';
import type { WeatherResponse, Forecast } from './schemas/WeatherResponse';
import { divideJsonContent } from './utils/divideJsonContent';

// コマンドを保存するコレクションを初期化
client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

const baker = Baker.create();

const forecastSchedule = baker.add({
  name: 'daily-job',
  cron: '0 0 0,6,12,18 * * *',
  callback: () => {
    const channel = client.channels.resolve(env.NOTIFICATION_CHANNEL_ID);
    if (!channel || !channel.isTextBased() || !('send' in channel)) return;
    getWeather()
      .then((res: WeatherResponse) => {
        const forecasts: Forecast[] = res.forecasts;
        channel.send(JSON.stringify(forecasts, null, 2));
      })
      .catch((error: Error) => {
        console.error('Error fetching weather data:', error);
        channel.send('天気予報の取得に失敗しました。error: ');
      });
  },
});

const test = baker.add({
  name: 'test',
  cron: '*/5 * * * * *',
  callback: async () => {
    const channel = client.channels.resolve(env.NOTIFICATION_CHANNEL_ID);
    if (!channel || !channel.isTextBased() || !('send' in channel)) return;
    const res = getWeather();
    const { title, description, forecasts, resMessage, error } = await divideJsonContent(res);
    if (error) {
      console.error('Error fetching weather data:', error);
      channel.send(`${resMessage}error: ${error}`);
      return;
    }
    if (!title && !description && !forecasts && !error) {
      channel.send({ content: resMessage });
      return;
    }
    channel.send({
      content: `title: ${title}, description: ${description}, forecasts: ${forecasts}`,
    });
  },
});
const start = async (): Promise<void> => {
  await loadCommands();
  await loadEvents();
  client
    .login(env.DISCORD_TOKEN)
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

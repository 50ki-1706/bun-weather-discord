import { Collection, EmbedBuilder } from 'discord.js';
import Baker from 'cronbake';
import { CommandInteraction } from 'discord.js';
import { client } from './utils/client';
import { loadCommands, loadEvents } from './utils/loaders';
import { env } from './schemas/env';
import { getWeather } from './api/weather/api';
import type { WeatherResponse, Forecast } from './schemas/WeatherResponse';
import { divideJsonContent } from './utils/divideJsonContent';
import { forecastFormatting } from './utils/forecastFormatting';
import type { forecastContentType } from './types/forecastContentType';
import { getWeatherIcon } from './utils/parseWeatherTerm';

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
  cron: '*/1 * * * *',
  callback: async () => {
    const channel = client.channels.resolve(env.NOTIFICATION_CHANNEL_ID);
    if (!channel || !channel.isTextBased() || !('send' in channel)) return;
    const res = getWeather();
    const { title, description, forecasts, resMessage, error } = await divideJsonContent(res);

    if (error) {
      channel.send(resMessage);
      return;
    }

    const forecastContents: forecastContentType[] = forecastFormatting(forecasts!);

    forecastContents.map((content) => {
      const iconArray = getWeatherIcon(content.telop);
      const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle(content.date)
        .setAuthor({
          name: title!,
        })
        .addFields([
          {
            name: '概要',
            value: description || 'N/A',
          },
          {
            name: '天気',
            value: `${iconArray.map((icon) => icon).join('/')} ${content.telop || 'N/A'}`,
          },
          {
            name: '最高気温',
            value: `${content.temperature.max.celsius || 'N/A'}°C`,
          },
          {
            name: '最低気温',
            value: `${content.temperature.min.celsius || 'N/A'}°C`,
          },
          {
            name: '降水確率',
            value: `${content.chanceOfRain.T00_06 || 'N/A'} (T00-06)\n${
              content.chanceOfRain.T06_12 || 'N/A'
            } (T06-12)\n${content.chanceOfRain.T12_18 || 'N/A'} (T12-18)\n${
              content.chanceOfRain.T18_24 || 'N/A'
            } (T18-24)`,
          },
        ]);
      channel.send({
        embeds: [embed],
      });
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

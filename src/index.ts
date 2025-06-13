import { Collection, EmbedBuilder } from 'discord.js';
import Baker from 'cronbake';
import { CommandInteraction } from 'discord.js';
import { client } from './utils/client';
import { loadCommands, loadEvents } from './utils/loaders';
import { env } from './schemas/env';
import { getWeather } from './api/weather/api';
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
  callback: async () => {
   const channel = client.channels.resolve(env.NOTIFICATION_CHANNEL_ID);
    if (!channel || !channel.isTextBased() || !('send' in channel)) return;
    const res = getWeather();
    const { title, forecasts, resMessage, error } = await divideJsonContent(res);

    if (error) {
      channel.send(resMessage);
      return;
    }

    const forecastContents: forecastContentType[] = forecastFormatting(forecasts!);

    if (!forecastContents[0]) {
      channel.send('予報データが空です');
      return;
    }

    const iconArray = getWeatherIcon(forecastContents[0].telop);
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle(title!)
      .setColor(0x0099ff)
        .addFields([
          {
            name: '天気',
            value: `${iconArray.map((icon) => icon).join('/')} ${forecastContents[0].telop || 'N/A'}`,
          },
          {
            name: '最高気温',
            value: `${forecastContents[0].temperature.max.celsius || 'N/A'}°C`,
          },
          {
            name: '最低気温',
            value: `${forecastContents[0].temperature.min.celsius || 'N/A'}°C`,
          },
          {
            name: '降水確率',
            value: `${forecastContents[0].chanceOfRain.T00_06 || 'N/A'} (T00-06)\n${
              forecastContents[0].chanceOfRain.T06_12 || 'N/A'
            } (T06-12)\n${forecastContents[0].chanceOfRain.T12_18 || 'N/A'} (T12-18)\n${
              forecastContents[0].chanceOfRain.T18_24 || 'N/A'
            } (T18-24)`,
          },
        ]).setTimestamp(new Date());
      channel.send({
        embeds: [embed]
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
    })
    .catch((err) => {
      console.error('Failed to login:', err);
      process.exit(1);
    });
};

start();

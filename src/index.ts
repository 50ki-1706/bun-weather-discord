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
import { convertJstToUtc } from './utils/cron';

// コマンドを保存するコレクションを初期化
client.commands = new Collection<string, (interaction: CommandInteraction) => Promise<void>>();

const baker = Baker.create();

const forecastSchedule = baker.add({
  name: 'daily-job',
  cron: `0 0 ${convertJstToUtc(6)},${convertJstToUtc(18)} * * *`,
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

    const now = new Date();
    const utcHour = now.getUTCHours();
    const jstHour = convertJstToUtc(utcHour);

    const forecastIndex = jstHour === 6 ? 0 : 1;

    if (!forecastContents[forecastIndex]) {
      channel.send(`予報データが空です（インデックス: ${forecastIndex}）`);
      return;
    }

    const iconArray = getWeatherIcon(forecastContents[forecastIndex].telop);
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle(title!)
      .setColor(0x0099ff)
        .addFields([
          {
            name: '天気',
            value: `${iconArray.map((icon) => icon).join('/')} ${forecastContents[forecastIndex].telop || 'N/A'}`,
          },
          {
            name: '最高気温',
            value: `${forecastContents[forecastIndex].temperature.max.celsius || 'N/A'}°C`,
          },
          {
            name: '最低気温',
            value: `${forecastContents[forecastIndex].temperature.min.celsius || 'N/A'}°C`,
          },
          {
            name: '降水確率',
            value: `${forecastContents[forecastIndex].chanceOfRain.T00_06 || 'N/A'} (0時から6時)\n${
              forecastContents[forecastIndex].chanceOfRain.T06_12 || 'N/A'
            } (6時から12時)\n${forecastContents[forecastIndex].chanceOfRain.T12_18 || 'N/A'} (12時から18時)\n${
              forecastContents[forecastIndex].chanceOfRain.T18_24 || 'N/A'
            } (18時から24時)`,
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

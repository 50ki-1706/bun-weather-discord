import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { getWeather } from '../../api/weather/api';
import type { Forecast, WeatherResponse } from '../../types/api/WeatherResponse';

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('天気予報のjsonを返すテスト');

export async function execute(interaction: CommandInteraction): Promise<void> {
  getWeather()
    .then((res: WeatherResponse) => {
      const forecasts: Forecast[] = res.forecasts;
      interaction.reply(JSON.stringify(forecasts, null, 2));
    })
    .catch((error: Error) => {
      console.error('Error fetching weather data:', error);
      interaction.reply('天気予報の取得に失敗しました。error: ');
    });
}

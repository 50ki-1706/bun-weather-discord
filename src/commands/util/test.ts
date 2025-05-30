import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { getWeather } from '../../api/weather/api';
import type { Forecast } from '../../types/api/WeatherResponse';

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('天気予報のjsonを返すテスト');

export async function execute(interaction: CommandInteraction): Promise<void> {
  try {
    const weatherData = await getWeather();
    const forecastsData: Forecast[] = weatherData.forecasts;
    const jsonString = JSON.stringify(forecastsData, null, 2);

    if (jsonString.length > 1900) {
      await interaction.reply({
        content: '天気予報データ（forecasts部分）:',
        files: [
          {
            attachment: Buffer.from(jsonString, 'utf-8'),
            name: 'weather-forecasts.json',
          },
        ],
      });
    } else {
      await interaction.reply({
        content: `天気予報データ（forecasts部分）:\n\`\`\`json\n${jsonString}\n\`\`\``,
      });
    }
  } catch (error) {
    console.error('Weather API error:', error);
    await interaction.reply({
      content: 'エラー: 天気データの取得に失敗しました。',
      ephemeral: true,
    });
  }
}

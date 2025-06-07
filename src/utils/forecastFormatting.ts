import type { ChanceOfRain, Detail, Forecast, Temperature } from '../schemas/WeatherResponse';
import type { forecastContentType } from '../types/forecastContentType';

export const forecastFormatting = (forecasts: Forecast[]): forecastContentType[] => {
  const forecastContents: forecastContentType[] = [];
  forecasts.map((forecast: Forecast) => {
    const date: string = forecast.date;
    const dateLabel: string = forecast.dateLabel;
    const detail: Detail = forecast.detail;
    const temperature: Temperature = forecast.temperature;
    const chanceOfRain: ChanceOfRain = forecast.chanceOfRain;
    const imageUrl: string = forecast.image.url;
    forecastContents.push({
      date: date,
      dateLabel: dateLabel,
      detail: detail,
      temperature: temperature,
      chanceOfRain: chanceOfRain,
      weatherIcon: imageUrl,
    });
  });
  return forecastContents;
};

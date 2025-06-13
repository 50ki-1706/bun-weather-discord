import type { Forecast } from '../schemas/WeatherResponse';
import type { forecastContentType } from '../types/forecastContentType';

export const forecastFormatting = (forecasts: Forecast[]): forecastContentType[] => {
  const forecastContents: forecastContentType[] = [];
  forecasts.map((forecast: Forecast) => {
    forecastContents.push({
      date: forecast.date,
      dateLabel: forecast.dateLabel,
      telop: forecast.telop,
      detail: forecast.detail,
      temperature: forecast.temperature,
      chanceOfRain: forecast.chanceOfRain,
      weatherIcon: forecast.image.url,
    });
  });
  return forecastContents;
};

import type { Detail, Temperature, ChanceOfRain } from '../schemas/WeatherResponse';

export type forecastContentType = {
  date: string;
  dateLabel: string;
  detail: Detail;
  temperature: Temperature;
  chanceOfRain: ChanceOfRain;
  weatherIcon: string;
};

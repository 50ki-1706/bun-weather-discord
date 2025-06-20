import { WeatherResponseSchema } from '../../schemas/WeatherResponse';
import type { WeatherResponse } from '../../schemas/WeatherResponse';

const url = 'https://weather.tsukumijima.net/api/forecast/city/110010';

export const getWeather = async (): Promise<WeatherResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return WeatherResponseSchema.parse(data);
};

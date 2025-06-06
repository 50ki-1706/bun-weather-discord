import type { WeatherResponse } from '../schemas/WeatherResponse';

export const divideJsonContent = (json: Promise<WeatherResponse>): string[] => {
  json
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
  return [];
};

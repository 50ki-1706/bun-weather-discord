import type { Forecast } from '../schemas/WeatherResponse';

export type divideJsonContentReturnType = {
  title: string | null;
  description: string | null;
  forecasts: Forecast[] | null;
  resMessage: string;
  error: string | null;
};

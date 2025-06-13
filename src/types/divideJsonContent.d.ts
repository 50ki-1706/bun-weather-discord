import type { Forecast } from '../schemas/WeatherResponse';

export type divideJsonContentReturnType = {
  title: string | null;
  forecasts: Forecast[] | null;
  resMessage: string;
  error: string | null;
};

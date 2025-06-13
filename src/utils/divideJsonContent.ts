import type { divideJsonContentReturnType } from '../types/divideJsonContent';
import type { WeatherResponse } from '../schemas/WeatherResponse';

export const divideJsonContent = async (
  req: Promise<WeatherResponse>
): Promise<divideJsonContentReturnType> => {
  try {
    const res = await req;
    const title = res.title;
    const forecasts = res.forecasts;
    return {
      title,
      forecasts,
      resMessage: '天気予報の取得に成功しました',
      error: null,
    };
  } catch (error: unknown) {
    return {
      title: null,
      forecasts: null,
      resMessage: '天気予報の取得に失敗しました',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

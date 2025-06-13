const weatherKeywords = [
  "晴",
  "雨",
  "曇",
  "雪",
  "雷",
  "みぞれ",
  "止む"
];

// 晴れ、曇り、雨、雪、雷などを含む天気のキーワードを抽出し配列に保管
export function extractWeatherTerm(weather: string | null): string[] | null {
  if (!weather) return null;
  const result: string[] = [];
  weatherKeywords.forEach((keyword) => {
    if (weather.includes(keyword) && !result.includes(keyword)) {
      result.push(keyword);
    }
  });
  return result;
}

export function getWeatherIcon(weather: string | null): string[] {
  if (weather === null) return ["❓"];
  const iconArray: string[] = [];
  const weatherTerms = extractWeatherTerm(weather);
  if (!weatherTerms) return ["❓"];
  weatherTerms.map((term) => {
    if (term === '晴') iconArray.push('☀️');
    if (term === '曇' || term == "止む") iconArray.push('☁️');
    if (term === '雨' || term === 'みぞれ') iconArray.push('🌧️');
    if (term === '雪') iconArray.push('❄️');
    if (term === '雷') iconArray.push('⚡️');
  });

  return iconArray;
}

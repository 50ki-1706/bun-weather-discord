const weatherKeywords = [
  "晴",
  "雨",
  "曇",
  "雪",
  "雷",
  "みぞれ",
  "止む"
];

export function extractWeatherTerm(weather: string | null): string[] | null {
  if (!weather) return null;
  const result: string[] = [];
  let remainingText = weather;
  while (remainingText.length > 0) {
    let found = false;
    for (const keyword of weatherKeywords) {
      if (remainingText.startsWith(keyword)) {
        if (!result.includes(keyword)) {
          result.push(keyword);
        }
        remainingText = remainingText.slice(keyword.length);
        found = true;
        break;
      }
    }
    if (!found) {
      remainingText = remainingText.slice(1);
    }
  }

  return result;
}

export function getWeatherIcon(weather: string | null): string[] {
  if (weather === null) return ["❓"];
  const iconArray: string[] = [];
  const weatherTerms = extractWeatherTerm(weather);
  if (!weatherTerms) return ["❓"];
  weatherTerms.map((term) => {
    if (term === '晴') iconArray.push('☀️');
    if (term === '曇' || term === "止む") iconArray.push('☁️');
    if (term === '雨' || term === 'みぞれ') iconArray.push('🌧️');
    if (term === '雪') iconArray.push('❄️');
    if (term === '雷') iconArray.push('⚡️');
  });

  return iconArray;
}

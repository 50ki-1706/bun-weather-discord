const weatherKeywords = [
  '晴',
  '晴れ',
  'はれ',
  '曇',
  '曇り',
  'くもり',
  '雨',
  '雪',
  'ゆき',
  '雷',
  'かみなり',
  'あめ',
  '霧',
  '霧雨',
  'きり',
  'きりさめ',
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

// 時々、一時など副次的な天気のキーワードを判定
// export function isSubWeatherTerm(weather: string | null): boolean {
//   let modifiedWeather = weather;
//   if (!modifiedWeather) return false;
//   weatherKeywords.forEach((keyword) => {
//     modifiedWeather = modifiedWeather!.replace(new RegExp(keyword, 'g'), '');
//   });

//   return modifiedWeather.length >= 2;
// }

export function getWeatherIcon(weather: string | null): string[] {
  const iconArray: string[] = [];
  const weatherTerms = extractWeatherTerm(weather);
  if (!weatherTerms) return ['❓'];
  weatherTerms.map((term) => {
    if (term === '晴' || term === '晴れ' || term === 'はれ') iconArray.push('☀️');
    if (term === '曇' || term === '曇り' || term === 'くもり') iconArray.push('☁️');
    if (term === '雨' || term === 'あめ') iconArray.push('🌧️');
    if (term === '雪' || term === 'ゆき') iconArray.push('❄️');
    if (term === '雷' || term === 'かみなり') iconArray.push('⚡️');
    else iconArray.push('❓');
  });
  return iconArray;
}

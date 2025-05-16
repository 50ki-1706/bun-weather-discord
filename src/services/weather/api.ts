const url = 'https://weather.tsukumijima.net/api/forecast/city/130010';

const getWeather = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const getWeatherByCity = async (cityCode: string) => {
  const response = await fetch(`https://weather.tsukumijima.net/api/forecast/city/${cityCode}`);
  const data = await response.json();
  return data;
};
const getWeatherByCityName = async (cityName: string) => {
  const response = await fetch(
    `https://weather.tsukumijima.net/api/forecast/city?city=${encodeURIComponent(cityName)}`
  );
  const data = await response.json();
  return data;
};

export { getWeather, getWeatherByCity, getWeatherByCityName };

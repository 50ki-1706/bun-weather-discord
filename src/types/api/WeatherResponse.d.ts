export interface WeatherResponse {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: description;
  forecasts: Forecast[];
  location: location;
  copyright: copyright;
}

export interface Forecast {
  date: string;
  dateLabel: string;
  telop: string;
  detail: {
    weather: string | null;
    wind: string | null;
    wave: string | null;
  };
  temperature: {
    min: {
      celsius: string | null;
      fahrenheit: string | null;
    };
    max: {
      celsius: string | null;
      fahrenheit: string | null;
    };
  };
  chanceOfRain: {
    T00_06: string;
    T06_12: string;
    T12_18: string;
    T18_24: string;
  };
  image: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
}

export interface description {
  publicTime: string;
  publicTimeFormatted: string;
  headlineText: string;
  bodyText: string;
  text: string;
}

export interface location {
  area: string;
  prefecture: string;
  district: string;
  city: string;
}

export interface copyright {
  title: string;
  link: string;
  image: {
    title: string;
    link: string;
    url: string;
    width: number;
    height: number;
  };
  provider: provider[];
}

export interface provider {
  link: string;
  name: string;
  note: string;
}

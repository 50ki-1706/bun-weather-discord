import { z } from 'zod';

const DescriptionSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  headlineText: z.string(),
  bodyText: z.string(),
  text: z.string(),
});

const detailSchema = z.object({
  weather: z.string().nullable(),
  wind: z.string().nullable(),
  wave: z.string().nullable(),
});

const temperatureSchema = z.object({
  min: z.object({
    celsius: z.string().nullable(),
    fahrenheit: z.string().nullable(),
  }),
  max: z.object({
    celsius: z.string().nullable(),
    fahrenheit: z.string().nullable(),
  }),
});

const chanceOfRainSchema = z.object({
  T00_06: z.string(),
  T06_12: z.string(),
  T12_18: z.string(),
  T18_24: z.string(),
});
const ForecastsSchema = z.object({
  date: z.string(),
  dateLabel: z.string(),
  telop: z.string(),
  detail: detailSchema,
  temperature: temperatureSchema,
  chanceOfRain: chanceOfRainSchema,
  image: z.object({
    title: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

const LocationSchema = z.object({
  area: z.string(),
  prefecture: z.string(),
  district: z.string(),
  city: z.string(),
});

const ProviderSchema = z.object({
  link: z.string(),
  name: z.string(),
  note: z.string(),
});

const CopyrightSchema = z.object({
  title: z.string(),
  link: z.string(),
  image: z.object({
    title: z.string(),
    link: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  provider: z.array(ProviderSchema),
});

export const WeatherResponseSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  publishingOffice: z.string(),
  title: z.string(),
  link: z.string(),
  description: DescriptionSchema,
  forecasts: z.array(ForecastsSchema),
  location: LocationSchema,
  copyright: CopyrightSchema,
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
export type Forecast = z.infer<typeof ForecastsSchema>;
export type Detail = z.infer<typeof detailSchema>;
export type Temperature = z.infer<typeof temperatureSchema>;
export type ChanceOfRain = z.infer<typeof chanceOfRainSchema>;

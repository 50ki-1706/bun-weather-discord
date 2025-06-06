import { z } from 'zod';

const DescriptionSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  headlineText: z.string(),
  bodyText: z.string(),
  text: z.string(),
});

const ForecastsSchema = z.object({
  date: z.string(),
  dateLabel: z.string(),
  telop: z.string(),
  detail: z.object({
    weather: z.string().nullable(),
    wind: z.string().nullable(),
    wave: z.string().nullable(),
  }),
  temperature: z.object({
    min: z.object({
      celsius: z.string().nullable(),
      fahrenheit: z.string().nullable(),
    }),
    max: z.object({
      celsius: z.string().nullable(),
      fahrenheit: z.string().nullable(),
    }),
  }),
  chanceOfRain: z.object({
    T00_06: z.string(),
    T06_12: z.string(),
    T12_18: z.string(),
    T18_24: z.string(),
  }),
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

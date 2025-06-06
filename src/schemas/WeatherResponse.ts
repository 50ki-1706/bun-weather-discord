import { z } from 'zod';

const descriptionSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  headlineText: z.string(),
  bodyText: z.string(),
  text: z.string(),
});

const forecastsSchema = z.object({
  date: z.string(),
  dateLabel: z.string(),
  telop: z.string(),
  detail: z.object({
    weather: z.string(),
    wind: z.string(),
    wave: z.string(),
  }),
  temperature: z.object({
    min: z.object({
      celsius: z.string(),
      fahrenheit: z.string(),
    }),
    max: z.object({
      celsius: z.string(),
      fahrenheit: z.string(),
    }),
  }),
  chanceOfRain: z.object({
    T00_06: z.string(),
    T06_12: z.string(),
    T12_18: z.string(),
    T18_24: z.string(),
  }),
  chanceOfSnow: z.object({
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

const locationSchema = z.object({
  area: z.string(),
  prefecture: z.string(),
  district: z.string(),
  city: z.string(),
});

const providerSchema = z.object({
  link: z.string(),
  name: z.string(),
  note: z.string(),
});

const copyrightSchema = z.object({
  title: z.string(),
  link: z.string(),
  image: z.object({
    title: z.string(),
    link: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  provider: z.array(providerSchema),
});

export const WeatherResponseSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  publishingOffice: z.string(),
  title: z.string(),
  link: z.string(),
  description: descriptionSchema,
  forecasts: z.array(forecastsSchema),
  location: locationSchema,
  copyright: copyrightSchema,
});

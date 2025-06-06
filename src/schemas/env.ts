import { z } from 'zod';

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  DISCORD_CLIENT_ID: z.string().min(1, 'DISCORD_CLIENT_ID is required'),
  DISCORD_GUILD_ID: z.string().min(1, 'DISCORD_GUILD_ID is required'),

  NOTIFICATION_CHANNEL_ID: z.string().min(1, 'NOTIFICATION_CHANNEL_ID is required'),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;

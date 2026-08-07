import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/ai_study_hub?schema=public'),
  JWT_SECRET: z.string().default('super-secret-jwt-key-change-in-production-min32chars'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  OPENAI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o'),
  GEMINI_MODEL: z.string().default('gemini-1.5-pro'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(rawEnv: Record<string, any> = process.env): EnvConfig {
  const result = envSchema.safeParse(rawEnv);
  if (!result.success) {
    console.error('❌ Invalid environment variable configuration:', result.error.format());
    throw new Error('Invalid environment variable configuration');
  }
  return result.data;
}

export const featureFlags = {
  enableDualModelFallback: true,
  enableRedisPromptCaching: true,
  enableRealtimeWhiteboard: true,
  enableVoiceRooms: false,
  enableRagPdfUploads: false,
};

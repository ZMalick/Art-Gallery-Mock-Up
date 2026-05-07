import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid connection string' }),

  // Auth
  JWT_SECRET: z.string().min(32, { message: 'JWT_SECRET must be at least 32 characters' }),

  // External Services
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', { message: 'STRIPE_SECRET_KEY must start with sk_' }),
  SENDGRID_API_KEY: z.string().startsWith('SG', { message: 'SENDGRID_API_KEY must start with SG' }),

  // App
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

function loadConfig() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment configuration:');
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  return result.data;
}

export const config = loadConfig();
export type Config = z.infer<typeof envSchema>;

import 'dotenv/config';

import { string, z } from 'zod';

const envSchema = z.object({
  API_PORT: z.coerce.number().default(5000),
  SECRET: z.string().default('SECRET'),
  DEFAULT_USER: z.string().default('test@test.com'),
  DEFAULT_PASSWORD: z.string().default('senha123'),
  DATABASE_NAME: z.string().default('test'),
  DATABASE_USERNAME: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_PORT: z.coerce.number().default(5432),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables!', _env.error.format());
  throw new Error('Invalid environment variables!');
}

export const env = _env.data;

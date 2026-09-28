/**
 * @algofox/env — centralized environment-variable schema.
 *
 * Every value is optional with the same fallback the app previously
 * applied inline at each call site, so importing this package never
 * throws during `next build` when env is absent. Production
 * hard-requirements are enforced at deploy time (see .env.example),
 * not at import time.
 *
 * Adoption is incremental: central infra modules (db, redis, email)
 * read from here; scattered `process.env` uses elsewhere migrate
 * over time. New code must use this package instead of `process.env`.
 */
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional(),

  // Postgres / Prisma
  DATABASE_URL: z.string().optional(),
  PRISMA_POOL_SIZE: z.string().optional(),

  // Redis (URL form or host/port form; "DISABLED" disables)
  REDIS_URL: z.string().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().optional(),

  // Email (Resend preferred, SMTP fallback, Ethereal last resort)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("Algo-fox Auth <noreply@klusurabhi.in>"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // Worker pull-model (shared by apps/web + apps/api triggers)
  WORKER_SECRET: z.string().optional(),
  APP_BASE_URL: z.string().optional(),
  // Worker host service base (apps/api). When set, immediate triggers
  // for github-sync + quiz-timer go to the API service; submission
  // triggers always stay on the web app. Unset = all self-targeted.
  WORKER_API_URL: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/** Validated, typed view of `process.env`. Unknown keys are stripped. */
export const env: Env = envSchema.parse(process.env);

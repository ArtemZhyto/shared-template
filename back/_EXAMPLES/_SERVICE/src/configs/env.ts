// Modules
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is not configured`)
  }

  return value
}

const parsePositiveNumber = (name: string, fallback?: number): number => {
  const rawValue = process.env[name] ?? fallback?.toString()

  if (!rawValue) {
    throw new Error(`${name} is not configured`)
  }

  const value = Number(rawValue)

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number`)
  }

  return value
}

const parsePort = (name: string, fallback?: number): number => {
  const value = parsePositiveNumber(name, fallback)

  if (!Number.isInteger(value) || value > 65535) {
    throw new Error(`${name} must be an integer between 1 and 65535`)
  }

  return value
}

const buildDatabaseUrl = (): string => {
  const user = requireEnvironmentVariable('POSTGRES_USER')
  const password = requireEnvironmentVariable('POSTGRES_PASSWORD')
  const host = process.env.POSTGRES_HOST ?? 'localhost'
  const port = parsePort('POSTGRES_PORT', 5432)
  const database = requireEnvironmentVariable('POSTGRES_DB')

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
    password,
  )}@${host}:${port}/${encodeURIComponent(database)}`
}

const mode = process.env.MODE ?? 'dev'

if (mode !== 'dev' && mode !== 'prod') {
  throw new Error('MODE must be either dev or prod')
}

export const env = {
  mode,
  databaseUrl: process.env.DATABASE_URL ?? buildDatabaseUrl(),
  servicePort: parsePort('SERVICE_PORT'),
  domain: process.env.DOMAIN ?? '<PROJECT_DOMAIN>',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:<FRONTEND_PORT>',
  accessSecret: requireEnvironmentVariable('ACCESS_SECRET'),
  refreshSecret: requireEnvironmentVariable('REFRESH_SECRET'),
  cookiesSecret: requireEnvironmentVariable('COOKIES_SECRET'),
  accessTokenMaxAge: parsePositiveNumber('ACCESS_AGE'),
  refreshTokenMaxAge: parsePositiveNumber('REFRESH_AGE'),
  emailVerificationExpiresHours: parsePositiveNumber('EMAIL_VERIFICATION_EXPIRES_HOURS'),
  emailVerificationResendCooldownSeconds: parsePositiveNumber(
    'EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS',
    60,
  ),
  passwordResetTokenTtlMinutes: parsePositiveNumber('PASSWORD_RESET_TOKEN_TTL_MINUTES', 30),
  passwordResetResendCooldownSeconds: parsePositiveNumber(
    'PASSWORD_RESET_RESEND_COOLDOWN_SECONDS',
    60,
  ),
} as const

export const isProduction = env.mode === 'prod'

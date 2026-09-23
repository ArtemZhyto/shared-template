// Types
import type { CorsOptions } from 'cors'

// Configs
import { env, isProduction } from './env'

const allowedOrigins = [env.frontendUrl]

if (isProduction) {
  allowedOrigins.push(`https://${env.domain}`, `https://www.${env.domain}`)
} else {
  allowedOrigins.push('http://localhost:<FRONTEND_PORT>')
}

export const corsOptions: CorsOptions = {
  origin: Array.from(new Set(allowedOrigins)),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-client-user-agent'],
  credentials: true,
}

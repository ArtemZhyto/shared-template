// Modules
import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'prisma/config'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const encode = (value: string): string => encodeURIComponent(value)

const databaseUrl =
  process.env.DATABASE_URL ??
  `postgresql://${encode(process.env.POSTGRES_USER ?? '')}:${encode(
    process.env.POSTGRES_PASSWORD ?? '',
  )}@${process.env.POSTGRES_HOST ?? 'localhost'}:${process.env.POSTGRES_PORT ?? '5432'}/${encode(
    process.env.POSTGRES_DB ?? '',
  )}`

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})

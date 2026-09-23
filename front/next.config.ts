// Modules
import createNextIntlPlugin from 'next-intl/plugin'

// Types
import type { NextConfig } from 'next'

const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? '<PUBLIC_API_URL>'
const publicSocketUrl = publicApiUrl.replace(/^http/, 'ws')
const isDevelopment = process.env.NODE_ENV !== 'production'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  output: 'standalone',

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            `default-src 'self'`,
            `frame-src 'self'`,
            `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
            `style-src 'self' 'unsafe-inline'`,
            `font-src 'self' data:`,
            `img-src 'self' data: blob:`,
            `connect-src 'self' ${publicApiUrl} ${publicSocketUrl}`,
            `object-src 'none'`,
            `base-uri 'self'`,
            `frame-ancestors 'self'`,
          ].join('; '),
        },
      ],
    },
  ],
}

export default withNextIntl(nextConfig)

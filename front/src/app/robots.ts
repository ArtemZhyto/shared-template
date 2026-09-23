// Modules
import type { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.MODE === 'prod'

  return {
    rules: {
      userAgent: '*',
      ...(isProduction ? { allow: '/' } : { disallow: '/' }),
    },

    host: siteConfig.metadataBase.origin,
  }
}

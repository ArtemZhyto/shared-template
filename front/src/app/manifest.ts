// Modules
import type { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: siteConfig.title.default,
    short_name: siteConfig.name,
    description: siteConfig.description,

    start_url: '/',
    scope: '/',

    display: 'standalone',
    orientation: 'any',

    background_color: '#F7F9FC',
    theme_color: '#06B6D4',

    categories: ['business', 'productivity', 'utilities'],

    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

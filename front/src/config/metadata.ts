const title = '<PROJECT_DISPLAY_NAME>'
const description = '<PROJECT_DESCRIPTION>'
const author = {
  name: 'Artem Zhytovoz',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE ?? 'http://localhost:<FRONTEND_PORT>'
const metadataBase = new URL(siteUrl)
const isProduction = process.env.MODE === 'prod'

export const siteConfig = {
  name: title,

  title: {
    default: title,
    template: `%s | ${title}`,
  },

  description,

  metadataBase,

  authors: [author],
  creator: author.name,
  publisher: title,

  applicationName: title,

  openGraph: {
    title,
    description,
    url: metadataBase.origin,
    siteName: title,

    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: `${title} logo`,
      },
    ],

    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: ['/icon-512.png'],
  },

  robots: {
    index: isProduction,
    follow: isProduction,
    nocache: !isProduction,

    googleBot: {
      index: isProduction,
      follow: isProduction,
      noimageindex: !isProduction,
      nosnippet: !isProduction,
    },
  },
}

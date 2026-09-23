// Styles
import '../global.css'
import '../variables.scss'

// Font
import { Prosto_One, Afacad, Coda } from 'next/font/google'

// Modules
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

// Types
import type { Metadata } from 'next'
import { LocalesLayoutT } from '@shared-types/layouts'

// Metadata
import { siteConfig } from '@config/metadata'

export const metadata: Metadata = siteConfig

const prosto = Prosto_One({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-prosto',
})

const afacad = Afacad({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-afacad',
})

const coda = Coda({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-coda',
})

const RootLayout = async ({ children, params }: LocalesLayoutT) => {
  const { locale } = await params

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${prosto.className} ${afacad.className} ${coda.className} ${prosto.variable} ${afacad.variable} ${coda.variable}`}
      >
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

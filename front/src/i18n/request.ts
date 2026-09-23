// Modules
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Types
import { LocalesT } from '@shared-types/locales'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as LocalesT

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  }
})

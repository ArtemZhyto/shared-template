// Modules
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

// Locals list
import { locales } from '@config/locales'

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

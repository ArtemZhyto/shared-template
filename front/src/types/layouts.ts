// Types
import type { ReactNode } from 'react'
import type { LocalesT } from './locales'

export interface LayoutT {
  children: ReactNode
}

export interface LocalesLayoutT {
  children: ReactNode
  params: Promise<{ locale: LocalesT }>
}

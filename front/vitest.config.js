// Modules
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    name: '<PROJECT_NAME>-frontend',

    environment: 'jsdom',

    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],

    setupFiles: ['./tests/setup/vitest.setup.ts'],

    clearMocks: true,
    restoreMocks: true,
  },

  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app'),
      '@components': resolve(__dirname, './src/components'),
      '@components-layout': resolve(__dirname, './src/components/layout'),
      '@components-settings': resolve(__dirname, './src/components/settings'),
      '@components-shared': resolve(__dirname, './src/components/shared'),
      '@components-ui': resolve(__dirname, './src/components/ui'),
      '@config': resolve(__dirname, './src/config'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@i18n': resolve(__dirname, './src/i18n'),
      '@lib': resolve(__dirname, './src/lib'),
      '@providers': resolve(__dirname, './src/providers'),
      '@shared-types': resolve(__dirname, './src/types'),
    },
  },
})

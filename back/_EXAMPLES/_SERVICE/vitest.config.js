// Modules
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  test: {
    environment: 'node',

    include: ['tests/**/*.test.ts'],

    clearMocks: true,
    restoreMocks: true,

    testTimeout: 15_000,
  },

  resolve: {
    alias: {
      '@configs': resolve(rootDir, 'src/configs'),
      '@controllers': resolve(rootDir, 'src/controllers'),
      '@errors': resolve(rootDir, 'src/errors'),
      '@helpers': resolve(rootDir, 'src/helpers'),
      '@middlewares': resolve(rootDir, 'src/middlewares'),
      '@routes': resolve(rootDir, 'src/routes'),
      '@services': resolve(rootDir, 'src/services'),
      '@sockets': resolve(rootDir, 'src/sockets'),
      '@validation': resolve(rootDir, 'src/validation'),
      '@workers': resolve(rootDir, 'src/workers'),
      '@src': resolve(rootDir, 'src'),
    },
  },
})

/** @type {import('jest').Config} */
module.exports = {
  displayName: '<PROJECT_NAME>-frontend',
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/tests/**/*.test.tsx'],

  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },

  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@components-layout/(.*)$': '<rootDir>/src/components/layout/$1',
    '^@components-settings/(.*)$': '<rootDir>/src/components/settings/$1',
    '^@components-shared/(.*)$': '<rootDir>/src/components/shared/$1',
    '^@components-ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@shared-types/(.*)$': '<rootDir>/src/types/$1',

    '\\.(css|scss|sass)$': '<rootDir>/tests/mocks/style.mock.js',
  },

  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  clearMocks: true,
  restoreMocks: true,
}

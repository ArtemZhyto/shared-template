// Modules
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [`**/node_modules/**`, `**/dist/**`, `**/generated/**`],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: [`**/*.{ts,js,mjs,cjs}`],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      [`quotes`]: [
        `error`,
        `single`,
        {
          allowTemplateLiterals: true,
        },
      ],

      [`semi`]: [`error`, `never`],
      [`@typescript-eslint/no-explicit-any`]: `error`,

      [`@typescript-eslint/no-unused-vars`]: [
        `error`,
        {
          argsIgnorePattern: `^_`,
          caughtErrorsIgnorePattern: `^_`,
          varsIgnorePattern: `^_`,
        },
      ],

      [`no-console`]: `warn`,
      [`prefer-const`]: `error`,
    },
  },

  {
    files: [
      `services/**/jest.config.js`,
      `services/**/jest.integration.config.js`,
      `services/**/scripts/**/*.mjs`,
      `scripts/**/*.mjs`,
    ],

    rules: {
      [`@typescript-eslint/no-require-imports`]: `off`,
      [`no-console`]: `off`,
    },
  },

  {
    files: [
      `services/*/prisma/**/*.ts`,
      `services/*/src/server.ts`,
      `services/*/src/workers/**/*.ts`,
    ],

    rules: {
      [`no-console`]: `off`,
    },
  },
)

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/services/*/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
}

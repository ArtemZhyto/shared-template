// Modules
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

const serviceRoot = fileURLToPath(new URL('../', import.meta.url))
const composeFile = path.join(serviceRoot, 'docker-compose.test.yml')
const isCi = process.env.CI === 'true'
const localDatabaseUrl =
  'postgresql://test:test@localhost:<SERVICE_TEST_DB_PORT>/<SERVICE_DB_NAME>_test'
const databaseUrl = process.env.DATABASE_URL ?? localDatabaseUrl
const composeProject = '<PROJECT_NAME>-<SERVICE_NAME>-test'

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: serviceRoot,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    shell: process.platform === 'win32',
    stdio: 'inherit',
    ...options,
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with code ${result.status ?? 1}`)
  }
}

let exitCode = 0

try {
  if (!isCi) {
    run('docker', [
      'compose',
      '-p',
      composeProject,
      '-f',
      composeFile,
      'up',
      '-d',
      '--wait',
    ])
  }

  if (existsSync(path.join(serviceRoot, 'prisma', 'migrations'))) {
    run('npx', ['prisma', 'migrate', 'deploy'])
  }

  run('npx', [
    'jest',
    '--config',
    'jest.integration.config.js',
    '--runInBand',
    '--verbose',
    '--passWithNoTests',
  ], {
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      NODE_OPTIONS: [process.env.NODE_OPTIONS, '--experimental-vm-modules'].filter(Boolean).join(' '),
    },
  })
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  exitCode = 1
} finally {
  if (!isCi) {
    const stopResult = spawnSync(
      'docker',
      [
        'compose',
        '-p',
        composeProject,
        '-f',
        composeFile,
        'down',
        '--volumes',
        '--remove-orphans',
      ],
      {
        cwd: serviceRoot,
        shell: process.platform === 'win32',
        stdio: 'inherit',
      },
    )

    if (stopResult.error) {
      console.error(stopResult.error)
      exitCode = 1
    } else if (stopResult.status !== 0 && exitCode === 0) {
      exitCode = stopResult.status ?? 1
    }
  }
}

process.exit(exitCode)

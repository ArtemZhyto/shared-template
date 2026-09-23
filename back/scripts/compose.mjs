// Modules
import { existsSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

const backendRoot = fileURLToPath(new URL('../', import.meta.url))
const servicesRoot = path.join(backendRoot, 'services')
const [mode = 'dev', ...composeArgs] = process.argv.slice(2)

if (mode !== 'dev' && mode !== 'prod') {
  console.error('Usage: node scripts/compose.mjs <dev|prod> [docker compose args...]')
  process.exit(1)
}

const baseComposeFile = path.join(backendRoot, `docker-compose.${mode}.yml`)
const serviceComposeFiles = existsSync(servicesRoot)
  ? readdirSync(servicesRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(servicesRoot, entry.name, `docker-compose.${mode}.yml`))
      .filter((composeFile) => existsSync(composeFile))
      .sort()
  : []

if (serviceComposeFiles.length === 0) {
  console.error(`No services with docker-compose.${mode}.yml were found in services/.`)
  process.exit(1)
}

const files = [baseComposeFile, ...serviceComposeFiles]
const args = [
  'compose',
  '--project-directory',
  backendRoot,
  ...files.flatMap((composeFile) => ['-f', composeFile]),
  ...(composeArgs.length > 0 ? composeArgs : ['up']),
]

const result = spawnSync('docker', args, {
  cwd: backendRoot,
  env: {
    ...process.env,
    BACKEND_ROOT: '.',
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 1)

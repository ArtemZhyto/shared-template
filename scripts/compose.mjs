// Modules
import { existsSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const backendServicesRoot = path.join(projectRoot, 'back', 'services')
const [mode = 'dev', ...composeArgs] = process.argv.slice(2)

if (mode !== 'dev' && mode !== 'prod') {
  console.error('Usage: node scripts/compose.mjs <dev|prod> [docker compose args...]')
  process.exit(1)
}

const composeFiles = [path.join(projectRoot, `compose.${mode}.yml`)]
const frontendComposeFile = path.join(projectRoot, 'front', `docker-compose.${mode}.yml`)

if (existsSync(frontendComposeFile)) {
  composeFiles.push(frontendComposeFile)
}

if (existsSync(backendServicesRoot)) {
  const serviceComposeFiles = readdirSync(backendServicesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(backendServicesRoot, entry.name, `docker-compose.${mode}.yml`))
    .filter((composeFile) => existsSync(composeFile))
    .sort()

  composeFiles.push(...serviceComposeFiles)
}

if (composeFiles.length === 1) {
  console.error(`No frontend or backend service Compose files were found for ${mode} mode.`)
  process.exit(1)
}

const args = [
  'compose',
  '--project-directory',
  projectRoot,
  ...composeFiles.flatMap((composeFile) => ['-f', composeFile]),
  ...(composeArgs.length > 0 ? composeArgs : ['up']),
]

const result = spawnSync('docker', args, {
  cwd: projectRoot,
  env: {
    ...process.env,
    BACKEND_ROOT: './back',
    FRONTEND_ROOT: './front',
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 1)

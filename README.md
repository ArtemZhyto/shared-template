# <PROJECT_DISPLAY_NAME>

> **Template aliases — keep this as the single source of truth.** First, replace the **project-wide aliases across the whole repository**: `<PROJECT_NAME>` → lowercase machine-safe slug such as `my-project`; `<PROJECT_DISPLAY_NAME>` → human-readable project name; `<PROJECT_DESCRIPTION>` → short description; `<PROJECT_DOMAIN>` → production base/cookie domain without protocol, such as `example.com`; `<FRONTEND_PORT>` → frontend port, such as `3030`; `<PUBLIC_FRONTEND_URL>` → browser-visible production frontend URL, such as `https://example.com`; `<PUBLIC_API_URL>` → browser-visible API/gateway URL, such as `https://api.example.com`; `<INTERNAL_API_URL>` → API/gateway URL reachable from the frontend container, such as `http://my-project_gateway:5000`. **Do not globally replace service aliases.** For every backend microservice, copy `back/_EXAMPLES/_SERVICE` to `back/services/<service-folder>`, then replace only inside that copied directory: `<SERVICE_NAME>` → service slug, such as `auth`; `<SERVICE_PORT>` → service HTTP port, such as `5001`; `<SERVICE_DB_NAME>` → that service's database name, such as `auth`; `<SERVICE_DB_PORT>` → host port for that service's development PostgreSQL container, such as `5101`; `<SERVICE_TEST_DB_PORT>` → host port for that service's local integration-test PostgreSQL container, such as `6101`. After creating services, copy each service `.env.example` to `.env`, create `.env.prod` where production Docker is used, copy `front/.env.example` to `front/.env` (and `front/.env.prod` for production), run `npm install` in `back` and/or `front`, and commit the generated lockfiles. Passwords and application secrets are intentionally **not aliases**: set real values only in ignored `.env`/`.env.prod` files or your deployment secret store.

## Repository modes

The same template can be used in three ways:

- Fullstack: keep `front/`, `back/`, the root `.github/workflows`, and the root Compose runner.
- Backend-only: use `back/` as the repository root; `back/.github/workflows/ci.yml` becomes the active CI workflow.
- Frontend-only: use `front/` as the repository root; `front/.github/workflows/ci.yml` becomes the active CI workflow.

Nested `.github/workflows` directories are ignored by GitHub while `front/` and `back/` remain subdirectories of the fullstack repository, so they do not duplicate the root CI runs.

## Backend services

`back/` is an npm-workspaces monorepo. CI automatically discovers every directory matching `back/services/*/package.json` and validates each service in a separate matrix job. Each generated service owns its Prisma schema, migrations, environment, Docker files, tests, and PostgreSQL container.

## Running the template

The same top-level command is intentionally available in every repository mode:

```bash
# Fullstack repository root
npm run dev

# Backend-only repository root (the former back/ directory)
npm run dev

# Frontend-only repository root (the former front/ directory)
npm run dev
```

In the fullstack root, `npm run dev` starts the frontend and every discovered backend service through Docker Compose. In a backend-only repository it starts every discovered backend microservice and its database. In a frontend-only repository it starts the Next.js development server directly.

Fullstack and backend-only repositories also provide `npm run dev:down`, `npm run dev:logs`, `npm run prod`, `npm run prod:down`, and `npm run prod:logs`. The root Compose runners discover backend services automatically, so adding a service does not require editing a central list.

The standalone frontend additionally provides `npm run docker:dev`, `npm run docker:dev:down`, `npm run docker:prod`, and `npm run docker:prod:down` when you want to run it through Docker instead of the native Next.js development server.

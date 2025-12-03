Up docker:
docker compose -f docker-compose.dev.yml up

See logs:
docker compose logs -f

## Running the project (without Docker)

This repository is a **pnpm monorepo** with two apps:

- `apps/backend` – NestJS API
- `apps/frontend` – Next.js 16 frontend

### Install dependencies

```bash
pnpm install
```

Run both backend and frontend:
pnpm dev

Run only the backend:
pnpm dev:backend

Run only the frontend:
pnpm dev:frontend

Same to build

pnpm build          # builds backend + frontend
pnpm build:backend  # build backend
pnpm build:frontend # build frontend

Production (without Docker)

```bash
pnpm build
pnpm start 
```

We use a custom STAGE environment variable to indicate the deployment stage:

local

staging

production

```bash
STAGE=local pnpm dev
STAGE=staging pnpm dev
STAGE=production pnpm dev
```

Development (docker-compose.dev.yml)
Run:

```bash
pnpm docker:dev:up
```

Stop:

```bash
pnpm docker:dev:down
```

Clean containers, volumes and local images:

```bash
pnpm docker:down:clean
```

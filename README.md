# Algo-fox — pnpm + Turborepo monorepo

A platform to practice Data Structures, Algorithms, and SQL: contests,
classrooms, quizzes, placements, and an AI teaching copilot.

```text
.
├── apps/
│   ├── web/            # Next.js 16 monolith (pages, API routes, server actions)
│   ├── api/            # Hono worker host (:3001) — github-sync + quiz-timer queues
│   └── cron-worker/    # Cloudflare cron — pokes the pull-worker endpoints every minute
│
├── packages/
│   ├── ui/             # @algofox/ui — shadcn-based design system (barrel imports only)
│   ├── utils/          # @algofox/utils — pure helpers (cn, dates, pagination, analytics math)
│   ├── types/          # @algofox/types — shared domain types (type-only package)
│   ├── db/             # @algofox/db — Prisma schema + client, Redis connections
│   ├── auth/           # @algofox/auth — Better-Auth server (+/client subpath for browsers)
│   ├── email/          # @algofox/email — Resend/SMTP/Ethereal sender
│   ├── env/            # @algofox/env — zod-validated typed env (central source of truth)
│   ├── queue/          # @algofox/queue — BullMQ plumbing + judge pipeline support
│   ├── typescript-config/  # shared base.json / nextjs.json
│   └── eslint-config/      # shared base.js / next.js
│
├── Dockerfile          # web image (turbo prune → standalone)
├── Dockerfile.api      # worker host image
├── docker-compose.yml  # postgres + pgbouncer + redis + app + api
├── ecosystem.config.js # PM2 bare-metal (web cluster + api + queue worker)
├── turbo.json · pnpm-workspace.yaml · pnpm-lock.yaml
└── .env.example        # copy to apps/web/.env, never commit secrets
```

`extension/` (browser Safe-Exam-Mode) is intentionally **outside** the
workspace — it is not a Node package. `ops/` holds k8s manifests.

## What each app does

| App | What | How it runs |
|---|---|---|
| `apps/web` (`@algofox/web`) | The product: 110+ pages, 36 API routes, 36 server-action modules, BullMQ submission-queue draining at `POST /api/worker/submission/run` | `pnpm dev` / Docker / PM2 cluster |
| `apps/api` (`algofox-api`) | Worker host: drains `github-sync` + `quiz-timer` queues at `POST /api/worker/{…}/run` (same paths as web, so triggers swap base URLs only) | `pnpm dev` / Docker / PM2 fork |
| `apps/cron-worker` | Cloudflare cron (`* * * * *`): submission→web, github-sync/quiz-timer→`API_BASE_URL` (falls back to web) | `wrangler deploy` |

The submission pipeline stays web-drained because its processor depends
on Next.js cache revalidation — see `apps/api/src/index.ts`.

## How packages are shared

```text
apps/web ─┬─▶ @algofox/ui ──▶ @algofox/utils ──▶ @algofox/types
          ├─▶ @algofox/auth ─┬─▶ @algofox/db ──▶ @algofox/env
          │                  └─▶ @algofox/email ─▶ @algofox/env
          ├─▶ @algofox/queue ─┬─▶ @algofox/db
          │                   └─▶ @algofox/env
          └─▶ @algofox/env
apps/api ───▶ @algofox/{queue,db,env}
```

Rules: packages never import from `apps/*`; dependencies flow leaf-ward
only (`env → types → utils → ui`, `env → db → {auth,email,queue}`).
Server/client boundaries are explicit: browsers import
`@algofox/auth/client` and `@algofox/queue/languages`, never the barrels
(which pull `next/headers` / BullMQ).

## Commands

```bash
pnpm install        # install the workspace (prisma generates via @algofox/db)
pnpm dev            # turbo: run all dev servers
pnpm build          # turbo: build (cached)
pnpm lint           # turbo: lint
pnpm typecheck      # turbo: tsc --noEmit everywhere
```

Per-package: `pnpm --filter @algofox/web build`, `pnpm --filter algofox-api start`.
No test runner exists yet — contract tests for `apps/api` seams are the
recommended first addition (vitest).

## Environment

Copy `.env.example` to `apps/web/.env` for local dev. New server code
must read env via `@algofox/env`, not `process.env` directly.
`WORKER_SECRET` must match across web, api, and the cron worker.
`WORKER_API_URL` (web) / `API_BASE_URL` (cron) point traffic at the
worker host; unset = everything self-targets the web app.

## Deploy

- **Docker Compose** (single host): `docker compose up --build`
- **Bare metal** (PM2): `pnpm install --frozen-lockfile && pnpm build && pm2 start ecosystem.config.js`
- **CI**: push to `main` → SSH → `pnpm install + typecheck + build` → `pm2 restart`
- **Cron worker**: `pnpm --filter algofox-cron-worker deploy` (wrangler)

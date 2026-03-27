# Codebase Structure

**Analysis Date:** 2026-03-27

## Directory Layout

```
algofox/
├── actions/            # Server Actions (mutations)
├── app/               # Next.js App Router (routes, layouts)
│   ├── (auth)/        # Authentication-related routes
│   ├── (main)/        # Core application routes (dashboard, contests)
│   ├── (workspace)/   # Coding workspace/editor interfaces
│   └── api/           # API endpoints (auth, webhooks)
├── components/        # React components
│   ├── ui/           # Shadcn/Radix primitive components
│   └── [feature]/     # Feature-specific components
├── core/              # Core business logic and domain services
├── hooks/             # Custom React hooks
├── lib/               # Shared utilities, client initializations (Prisma, Redis)
├── ops/               # Infrastructure and Kubernetes configurations
├── prisma/            # Database schema and migrations
├── public/            # Static assets (images, fonts)
├── scripts/           # Standalone scripts (Telegram bot, debug tools)
├── package.json       # Project manifest and dependencies
└── next.config.ts     # Next.js configuration
```

## Directory Purposes

**actions/**
- Purpose: Contains Next.js Server Actions for processing data updates.
- Contains: TypeScript files with "use server" directive.

**app/**
- Purpose: The main routing and page structure of the application.
- Contains: layouts, pages, and route-specific components.
- Key subdirectories: `(main)` for authenticated dashboard, `(workspace)` for editing.

**components/**
- Purpose: Reusable UI logic.
- Subdirectories: `ui/` for design system atoms, others for feature-specific molecules.

**core/**
- Purpose: Domain-specific services and logic that aren't tied to a specific framework layer.

**lib/**
- Purpose: Integration glue and shared utilities.
- Key files: `cache-handler-redis.js`, client initializations for Redis/Prisma.

**prisma/**
- Purpose: Database source of truth.
- Key files: `schema.prisma`.

**scripts/**
- Purpose: Side-car processes and maintenance tools.
- Key files: `telegram-bot.ts`.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout for the application.
- `scripts/telegram-bot.ts`: Entry point for the Telegram bot.

**Configuration:**
- `next.config.ts`: Main framework configuration.
- `tsconfig.json`: TypeScript compiler options.
- `package.json`: Dependency and script management.
- `.env`: Local environment variables.

**Core Logic:**
- `actions/`: Mutation logic.
- `app/(main)/page.tsx`: Main dashboard landing.
- `lib/`: Shared clients.

## Naming Conventions

**Files:**
- `PascalCase.tsx`: React components.
- `kebab-case.ts`: Utilities, actions, and services.
- `page.tsx`, `layout.tsx`: Standard Next.js route files.

**Directories:**
- `kebab-case`: All directories.
- `(group)`: Next.js route groups (organizational only).

## Where to Add New Code

**New Feature (UI):**
- Components: `components/[feature-name]/`
- Page: `app/(main)/[feature-name]/page.tsx`
- Actions: `actions/[feature-name].ts`

**New API Endpoint:**
- Location: `app/api/[path]/route.ts`

**New Domain Logic:**
- Location: `core/[service].ts`

**New Shared Utility:**
- Location: `lib/[name].ts` or `lib/[category]/`

## Special Directories

**ops/**
- Purpose: Kubernetes and deployment manifest.
- Source: Developer maintained.
- Committed: Yes.

**.planning/**
- Purpose: Project management and codebase mapping (GSD).
- Committed: Recommended (Yes).

---

*Structure analysis: 2026-03-27*
*Update when directory structure changes*

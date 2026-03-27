# Technology Stack

**Analysis Date:** 2026-03-27

## Languages

**Primary:**
- TypeScript 5.x - All application code and scripts
- CSS (Tailwind 4) - Styling and design system

**Secondary:**
- SQL (via Prisma) - Database schema and migrations
- Shell - Tooling and setup scripts

## Runtime

**Environment:**
- Node.js 20+ (Next.js 16 requirements)
- Distributed as a Next.js application

**Package Manager:**
- Bun - Lockfile `bun.lockb/bun.lock` detected
- npm (via fallback)

## Frameworks

**Core:**
- Next.js 16.1.x - Web framework (App Router)
- React 19.x - UI library
- Prisma 5.x - Database ORM

**Testing:**
- (TBD: No testing framework detected in `devDependencies`, but `package.json` names `algofox`)

**Build/Dev:**
- Next.js Turbopack - Development server
- ESLint 9.x - Linting
- TypeScript 5.x - Compiler

## Key Dependencies

**Critical:**
- `better-auth` ^1.4.6 - Authentication framework
- `prisma` 5.x - Database access and management
- `zod` ^4.3.4 - Schema validation
- `framer-motion` ^12.38.0 - UI animations
- `bullmq` ^5.66.2 - Message queue / Job processing
- `ioredis` ^5.8.2 - Redis client for caching and queues

**Infrastructure:**
- `next-themes` - Dark mode support
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `radix-ui` (via `@radix-ui/react-slot`) - Accessible primitive components

## Configuration

**Environment:**
- `.env` files for environment variable management
- Key configs: `DATABASE_URL`, `REDIS_URL`

**Build:**
- `next.config.ts` - Next.js configuration (Cache Components enabled)
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration

## Platform Requirements

**Development:**
- Cross-platform (Linux/macOS/Windows) with Bun/Node.js
- Local Redis and PostgreSQL/DB required

**Production:**
- Docker - Deployment via Docker container supported (`Dockerfile` present)
- Redis and Database required as external services

---

*Stack analysis: 2026-03-27*
*Update after major dependency changes*

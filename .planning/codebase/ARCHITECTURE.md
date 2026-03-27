# Architecture

**Analysis Date:** 2026-03-27

## Pattern Overview

**Overall:** Full-stack Next.js Application (App Router)

**Key Characteristics:**
- Server-side rendering (SSR) and Client-side transitions
- Server Actions for data mutations
- Event-driven background jobs via BullMQ
- Centralized database access via Prisma ORM
- Redis-backed caching and job queuing

## Layers

**App Layer (Routing & Presentation):**
- Purpose: Defines application routes, layouts, and page-level components
- Contains: Next.js Pages, Layouts, Loading/Error boundaries
- Location: `app/`
- Depends on: Action layer, Lib layer, Component layer
- Used by: Web browser clients

**Action Layer (Data Mutations):**
- Purpose: Handles form submissions and state changes from the client
- Contains: "use server" actions for contests, assignments, etc.
- Location: `actions/`
- Depends on: Lib layer, Core layer
- Used by: Client components

**Core/Service Layer (Business Logic):**
- Purpose: Encapsulates domain-specific logic and complex business rules
- Contains: Logic for contests, submissions, and integrations
- Location: `core/`, `lib/`
- Depends on: Prisma client, external SDKs (LeetCode, Telegram)
- Used by: App layer, Action layer, API routes

**Component Layer (UI):**
- Purpose: Reusable UI elements and feature-specific components
- Contains: Shadcn/Radix primitives, complex data tables, editors
- Location: `components/`
- Depends on: Hooks, Tailwind utilities
- Used by: App layer

**Data Layer (Persistence):**
- Purpose: Database schema and connection management
- Contains: Prisma schema and generated client
- Location: `prisma/`
- Used by: Core layer, Action layer

## Data Flow

**User Interaction (Web):**
1. User interacts with a Client Component in `app/(main)`.
2. Component invokes a Server Action in `actions/`.
3. Action calls a function in `core/` or `lib/` to process logic.
4. Logic interacts with Prisma (`prisma/`) or Redis (`lib/cache-handler-redis.js`).
5. Result returned to Action, then to Component, triggering UI update via React 19.

**Background Tasks:**
1. Action or API route adds a job to BullMQ (`bullmq`).
2. Redis stores the queue state.
3. Worker (likely in `scripts/` or standalone process) picks up and executes the job.

## Key Abstractions

**Server Actions:**
- Purpose: Secure, type-safe RPC-like calls to the server
- Pattern: "use server" directives in separate files

**Prisma Client:**
- Purpose: Type-safe database access
- Pattern: Auto-generated client from `prisma/schema.prisma`

**Better Auth:**
- Purpose: Robust authentication and session management
- Pattern: Integrated via `lib/auth.ts` (assumed) and `app/api/auth`

## Entry Points

**Web Entry:**
- Location: `app/layout.tsx`
- Triggers: User visits the site
- Responsibilities: Main layout, provider injection, global styles

**Background Bot:**
- Location: `scripts/telegram-bot.ts`
- Triggers: Process startup
- Responsibilities: Listen for Telegram events, interact with the app core

## Error Handling

**Strategy:**
- Next.js `error.tsx` file for page-level error catching.
- Zod for input validation at the action/API boundary.
- Sonner toasts for user-facing feedback.

## Cross-Cutting Concerns

**Authentication:**
- Handled via Better Auth middleware and protected route groups (`(main)`, `(auth)`).

**Caching:**
- Redis-based cache handler configured in `next.config.ts`.
- `cacheLife` profiles for fine-grained revalidation.

**Validation:**
- Zod schemas used for all external input (actions, API).

---

*Architecture analysis: 2026-03-27*
*Update when major patterns change*

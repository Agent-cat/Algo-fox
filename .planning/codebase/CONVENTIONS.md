# Coding Conventions

**Analysis Date:** 2026-03-27

## Naming Patterns

**Files:**
- `kebab-case.ts`: General TypeScript modules, services, and actions.
- `PascalCase.tsx`: React components.
- `prefix.action.ts`: Some server action files (inconsistent, but present).
- `page.tsx`, `layout.tsx`, `error.tsx`: Standard Next.js route files.

**Functions:**
- `camelCase`: All functions and variables.
- `handleEventName`: Client event handlers in React components.
- `actionName`: Server action exports (e.g., `deleteContest`, `createContest`).

**Types:**
- `PascalCase`: Interfaces and Type aliases.
- No `I` prefix for interfaces.
- `export type [Name] = ...` preferred for domain types.

## Code Style

**Formatting:**
- 4 space indentation observed in many files.
- TypeScript strictly enforced.
- "use server" at top of mutation files (`actions/`).
- "use client" for interactive components.

**Linting:**
- ESLint 9.x used with Next.js configuration (`eslint.config.mjs`).
- Scripts: `npm run lint`.

## Import Organization

**Order:**
1. Next.js/React built-ins (`next/*`, `react`).
2. Primary libraries (`prisma`, `zod`, `better-auth`).
3. Path aliases (`@/lib/*`, `@/core/*`, `@/components/*`).
4. Relative imports (`./[file]`, `../[dir]`).

**Path Aliases:**
- `@/` maps to the project root.

## Error Handling

**Patterns:**
- **Server Actions:** Wrapped in `try/catch`. Return an object `{ success: boolean, error?: string, ...data }`.
- **Validation:** Zod schemas defined at the top of action files. Input parsed with `.parse()` or `.safeParse()`.
- **Logging:** `console.error` with descriptive messages and the original error object used in catch blocks.

**React Components:**
- Page-level error boundaries via `error.tsx`.
- Form errors handled via `react-hook-form` and displayed inline or via `sonner` toasts.

## Logging

**Framework:**
- `console.log` and `console.error` for server-side logging.
- No dedicated structured logger detected.

## Comments

**When to Comment:**
- JSDoc-style comments for complex server actions and service methods.
- Optimization notes (e.g., `// OPTIMIZATION: ...`).
- Mentions of what can be improved (e.g., `// TODO: ...`).

## Function Design

**Server Actions:**
- Exported async functions.
- Destructure session/headers at the start for auth checks.
- Implement guard clauses for authorization before processing logic.
- Standardized return format for client-side consumption.

## Module Design

**Exports:**
- Named exports preferred for services and actions.
- Default exports for Next.js route pages and main layout files.

---

*Convention analysis: 2026-03-27*
*Update when patterns change*

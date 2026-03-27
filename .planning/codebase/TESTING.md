# Testing Patterns

**Analysis Date:** 2026-03-27

## Test Framework

**Runner:**
- **No automated test runner detected.**
- `package.json` does not include scripts or dependencies for Jest, Vitest, Cypress, or Playwright at the project level.

**Assertion Library:**
- None configured.

**Run Commands:**
- Manual verification via `npm run dev` or `bun dev`.
- Static analysis via `npm run lint`.

## Test File Organization

**Location:**
- No dedicated test directories found (`tests/` or `__tests__` are absent).
- No `*.test.ts` or `*.spec.ts` files found in the source tree (excluding `node_modules`).

## Test Structure

**Manual Testing:**
- Features are primarily verified through local execution of the Next.js development server.
- Interactive testing of contests, problems, and dashboards.

## Mocking

- No mocking framework (like Mock Service Worker or Vitest vi) is currently in use for automated tests.
- Likely manual mocking or environment branching for local versus production data.

## Fixtures and Factories

- `prisma/seed.ts`: Used for seeding the database with initial/test data.
  - Run via: `npx prisma db seed`.

## Coverage

- No coverage reporting configured.

## Test Types

**Static Analysis:**
- ESLint for code quality and matching conventions.
- TypeScript compiler for type safety.

**Manual UAT:**
- Verification of feature requirements through browser-based interaction.

---

*Testing analysis: 2026-03-27*
*Note: Automated testing infrastructure is a potential area for future technical debt improvement.*

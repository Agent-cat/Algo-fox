# Codebase Concerns

**Analysis Date:** 2026-03-27

## Tech Debt

**Large Action Files:**
- Issue: `actions/contest.ts` is over 1400 lines and contains mixed responsibilities (validation, DB access, logic helpers like `seededShuffle`).
- Why: Incremental building of contest features without refactoring into smaller services or action groups.
- Impact: High cognitive load for developers, difficult to unit test specifically.
- Fix approach: Extract business logic to `core/services/contest.service.ts` or split into multiple action files.

**Inconsistent Action Naming:**
- Issue: Mixture of `[name].ts` and `[name].action.ts` in the `actions/` directory.
- Why: Evolved over time with different naming preferences.
- Impact: Confusing for developers when looking for specific handlers.
- Fix approach: Standardize on one convention (e.g., `*.action.ts`) across all mutation files.

## Known Bugs

**External API Rate Limiting (LeetCode):**
- Symptoms: Occasional failures when fetching problem or contest data via `leetcode-query`.
- Trigger: Multiple concurrent requests or high-frequency updates.
- Workaround: Redis caching is in place, but cold starts can still trigger it.
- Root cause: Dependence on external unofficial API wrappers.

## Security Considerations

**IP Restrictive Contests:**
- Risk: IP restriction check in `actions/contest.ts` relies on `getClientIP` which can be bypassed via header spoofing if the proxy is not correctly configured to trust specific `X-Forwarded-For` headers.
- File: `actions/contest.ts`, `lib/ip.ts`
- Current mitigation: Basic `X-Forwarded-For` check.
- Recommendations: Ensure Next.js/Vercel trusted proxy configuration is solid; consider session-based or token-based secondary verification.

**Direct DB Logic in Actions:**
- Risk: Complex transaction logic is written directly in server actions.
- Current mitigation: Using `$transaction` in some places.
- Recommendations: Move critical database mutations to service layer to ensure atomic operations and easier verification.

## Performance Bottlenecks

**Prisma Schema Complexity:**
- Problem: `prisma/schema.prisma` is 17kb, indicating a very dense relational model.
- Cause: Modeling comprehensive institutional structures, contests, and assignments in a single monolith.
- Improvement path: Monitor query performance; ensure indices are present on all frequently filtered fields like `userId`, `contestId`, and `institutionId`.

## Fragile Areas

**BullMQ Worker Dependences:**
- Why fragile: Background jobs (ranking updates, bot interactions) depend on a healthy BullMQ/Redis connection.
- Common failures: Redis downtime or memory limits could halt critical async processes without fallback.
- Test coverage: No automated tests for worker reliability.

## Scaling Limits

**Redis Memory for Leaderboards:**
- Current capacity: Leaderboards are cached with 10-minute TTL.
- Limit: As the number of institutions and search combinations grows, Redis memory usage for these keys will increase significantly.
- Scaling path: Implement LRU eviction policy; use more granular cache invalidation instead of broad TTL if needed.

## Test Coverage Gaps

**Server Action Logic:**
- What's not tested: Complex authorization logic and data transformations in server actions.
- Risk: Authorization bypass or data corruption could occur during refactoring.
- Priority: High.

---

*Concerns audit: 2026-03-27*
*Note: The project is well-featured but lacks the automated testing required for confident large-scale refactoring.*

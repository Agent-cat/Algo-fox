# Implementation Plan: Teacher Classroom Analytics Dashboard

## Overview

Build the Teacher Classroom Analytics Dashboard as a new lazy-loaded tab in the existing classroom detail page at `/dashboard/classrooms/[id]`. The implementation follows a strict dependency order: schema first, pure formula utilities second (independently testable), Redis cache layer third, server actions fourth, cache invalidation hooks fifth, and UI components last, finishing with page integration.

All analytics data flows through Next.js server actions consistent with the existing `actions/` pattern. Pure computation utilities live in `lib/analytics/` and are tested with **fast-check** property-based tests. The UI uses `next/dynamic` for lazy loading and matches the existing shadcn/ui + Recharts + framer-motion patterns found in the classroom components.

---

## Tasks

- [x] 1. Extend Prisma schema with AssignmentStudent model and run migration
  - Add the `AssignmentStudentStatus` enum (`NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `OVERDUE`) to `prisma/schema.prisma`
  - Add the `AssignmentStudent` model with all fields: `id` (cuid), `assignmentId`, `userId`, `startedAt` (DateTime?), `completedAt` (DateTime?), `status` (default `NOT_STARTED`), `problemsSolved` (Int, default 0), `problemsAttempted` (Int, default 0), `createdAt`, `updatedAt`; relations to `Assignment` and `User` with `onDelete: Cascade`; unique constraint on `[assignmentId, userId]`; indexes `[userId, assignmentId]` and `[assignmentId, status]`; `@@map("assignment_student")`
  - Add the `students AssignmentStudent[]` back-relation to the existing `Assignment` model
  - Add the `assignmentProgress AssignmentStudent[]` back-relation to the existing `User` model
  - Run `npx prisma migrate dev --name add-assignment-student` to generate and apply the migration
  - Run `npx prisma generate` to regenerate the Prisma client
  - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - _Design: Data Models → AssignmentStudent_

- [x] 2. Create analytics TypeScript types
  - [x] 2.1 Create `lib/analytics/types.ts` with all shared TypeScript interfaces and discriminated union types
    - Define `AnalyticsError` discriminated union with variants: `SESSION_INVALID`, `UNAUTHORIZED`, `CLASSROOM_NOT_FOUND`, `INTERNAL_ERROR`
    - Define `OverviewData`, `TagMasteryItem`, `TopicTagMasteryItem`, `TagMasteryData` interfaces
    - Define `HeatmapCell`, `HeatmapData` interfaces (including `color: 'red' | 'amber' | 'green' | 'gray'`)
    - Define `DifficultyTagItem`, `DifficultyData` interfaces (`easy/medium/hard: number | null`)
    - Define `RiskFactor`, `AtRiskStudent`, `RiskData` interfaces
    - Define `AssignmentStatus`, `AssignmentAnalyticsData`, `AssignmentTagData` interfaces
    - Define `ContestStudentRow`, `ContestItem`, `ContestAnalyticsData` interfaces
    - Export `TagSubmissionData` and `RiskInput`/`RiskBreakdown` types needed by formula modules
    - Export `AnalyticsSection` union type: `'overview' | 'tag-mastery' | 'heatmap' | 'risk' | 'assignments' | 'contests'`
    - _Requirements: 2.1, 3.2, 4.2, 6.1, 7.1, 8.1_
    - _Design: Components and Interfaces → TypeScript Types_

- [x] 3. Implement Tag Mastery formula
  - [x] 3.1 Create `lib/analytics/mastery.ts` with `computeTagMastery` function
    - Implement early-exit returning 0 when the `submissions` array is empty (zero attempts)
    - Compute correctness component (40%): ACCEPTED ÷ total SUBMIT-mode × 100
    - Compute difficulty component (20%): weighted accuracy with EASY=1×, MEDIUM=2×, HARD=3×; skip CONCEPT-type submissions
    - Compute recency component (20%): correctness rate for submissions within `recentCutoffDays` (default 30); return 0 if no recent submissions
    - Compute repeat-attempts penalty component (10%): `100 - Math.min(100, (avgAttemptsBeforeAccepted - 1) * 20)`, clamped to [0, 100]
    - Compute coverage component (10%): `distinctProblemsAttempted / totalProblemsInTag × 100`, clamped to [0, 100]
    - Return weighted sum clamped to [0, 100]
    - Export `TagSubmissionData` interface from this module (re-export from types.ts)
    - _Requirements: 3.2, 3.3_
    - _Design: Tag Mastery Formula_

- [x] 4. Implement Risk Score formula
  - [x] 4.1 Create `lib/analytics/risk-score.ts` with `computeRiskScore` function
    - Implement all 6 risk components with their exact weights:
      - `lowMastery` (30%): `(100 - averageMastery) * 0.30`
      - `lowRecentAccuracy` (20%): if no submissions in last 14d → contribution = 20; else `(100 - accuracy_14d) * 0.20`
      - `inactivity` (15%): `Math.min(daysSinceLastSubmit / 14, 1) * 15`
      - `repeatedFailures` (15%): `(problemsWithRepeatedFailures / Math.max(totalProblems, 1)) * 0.15 * 100`
      - `assignmentIncomplete` (10%): `(incompleteAssignments / Math.max(totalAssignments, 1)) * 0.10 * 100` (0 if totalAssignments = 0)
      - `decliningPerformance` (10%): 10 if `accuracy7dLast < accuracy7dPrev - 20`, else 0
    - Return `RiskBreakdown` with total `score` (sum of all 6 contributions, clamped to [0, 100]) and `factors` array of exactly 6 entries with human-readable `label` strings
    - _Requirements: 6.1, 6.5_
    - _Design: Risk Score Formula_

- [x] 5. Implement Redis cache helpers
  - [x] 5.1 Create `lib/analytics/cache.ts` with cache key generation and get/set/invalidate helpers
    - Implement `analyticsKey(classroomId: string, section: AnalyticsSection): string` returning keys in the form `classroom:{classroomId}:analytics:{section}`
    - Implement `getAnalyticsCache<T>(key: string): Promise<T | null>` — thin wrapper around `redis.get` with JSON.parse; return null on any error (log via `console.error("[Analytics Cache]", ...)`)
    - Implement `setAnalyticsCache<T>(key: string, data: T): Promise<void>` — thin wrapper around `redis.setex` with TTL of 60 seconds and JSON.stringify; swallow errors silently with logging
    - Implement `invalidateAnalyticsCache(classroomId: string, sections?: AnalyticsSection[]): Promise<void>` — uses `Promise.allSettled` to delete all specified section keys atomically on best-effort; if `sections` is omitted, invalidates all 6 keys; logs individual failures but continues remaining deletions
    - Import Redis client from `lib/redis` (the singleton default export)
    - _Requirements: 9.1, 9.2, 9.6, 9.7_
    - _Design: Redis Cache Layer_

- [x] 6. Implement analytics server actions
  - [x] 6.1 Create `actions/classroom-analytics.ts` with auth guard and `getOverviewAnalytics`
    - Add `"use server"` directive
    - Implement the shared auth guard pattern: `getSession()` → reject `SESSION_INVALID`; role check (TEACHER | ADMIN) → reject `UNAUTHORIZED`; `prisma.classroom.findUnique` → reject `CLASSROOM_NOT_FOUND`; institution check (`teacher.institutionId === classroom.institutionId`) → reject `UNAUTHORIZED`
    - Implement `getOverviewAnalytics(classroomId: string): Promise<OverviewData | AnalyticsError>` — fetch enrolled student count, total distinct problems solved (ACCEPTED SUBMIT-mode), total SUBMIT-mode submissions and accepted count, compute overall accuracy rounded to 1 decimal (capped at 100%), run lightweight risk proxy for at-risk count, return `OverviewData`
    - Cache hit/miss pattern using `analyticsKey` + `getAnalyticsCache` / `setAnalyticsCache`; wrap Redis calls in try/catch and fall through to DB on any Redis error
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 10.3, 10.4_
    - _Design: Server Action Interface, Data Flow_

  - [x] 6.2 Add `getTagMasteryAnalytics` and `getHeatmapAnalytics` to `actions/classroom-analytics.ts`
    - Implement `getTagMasteryAnalytics(classroomId: string): Promise<TagMasteryData | AnalyticsError>` — fetch all tags on problems linked to classroom assignments and contests; for each tag, fetch all SUBMIT-mode submissions by classroom students (with `status`, `difficulty`, `createdAt`, `problemId`); run `computeTagMastery` per student × tag pair; average per tag across students; assign `label` ('Struggling' if < 40, 'Developing' if 40–70, 'Proficient' if ≥ 70); sort ascending by `averageMastery`; optionally expand `topicTags` array for drill-down requests
    - Implement `getHeatmapAnalytics(classroomId: string): Promise<HeatmapData | AnalyticsError>` — reuse same DB fetch as tag mastery; pivot into `HeatmapCell[]` matrix; assign `color` using helper: `gray` when `attempts === 0`, `red` when `attempts > 0 && score < 40`, `amber` when `score >= 40 && score < 70`, `green` when `score >= 70`; return students sorted by name asc, tags sorted by mastery asc
    - Both functions include auth guard and Redis cache layer
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5_
    - _Design: Data Flow → Tag Mastery, Heatmap_

  - [x] 6.3 Add `getDifficultyAnalytics` and `getRiskAnalytics` to `actions/classroom-analytics.ts`
    - Implement `getDifficultyAnalytics(classroomId: string): Promise<DifficultyData | AnalyticsError>` — for each tag, compute classroom-aggregate accuracy per difficulty level (EASY, MEDIUM, HARD) as ACCEPTED ÷ total SUBMIT-mode; use `null` when no problems of that difficulty exist for the tag; use 0% when problems exist but no submissions
    - Implement `getRiskAnalytics(classroomId: string): Promise<RiskData | AnalyticsError>` — fetch per-student: average mastery, last 14d submissions, last 28d submissions (for 7d windows), days since last SUBMIT-mode submission, problem attempt counts, assignment status counts; run `computeRiskScore` per student; filter to `riskScore >= 60`; sort descending by `riskScore`; select top 3 factors per student; set `allClear: true` when no at-risk students
    - Never persist risk scores; always compute at request time
    - Both functions include auth guard and Redis cache layer
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 6.5_
    - _Design: Data Flow → Difficulty, Risk_

  - [x] 6.4 Add `getAssignmentAnalytics`, `getAssignmentTagBreakdown`, and `getContestAnalytics` to `actions/classroom-analytics.ts`
    - Implement `getAssignmentAnalytics(classroomId: string): Promise<AssignmentAnalyticsData | AnalyticsError>` — fetch all assignments for the classroom with their `AssignmentStudent` records; count statuses (COMPLETED, IN_PROGRESS, NOT_STARTED, OVERDUE); students with no `AssignmentStudent` record count as NOT_STARTED; verify counts sum to enrolled student count; compute `completionPercentage`; show progress bar data
    - Implement `getAssignmentTagBreakdown(classroomId: string, assignmentId: string): Promise<AssignmentTagData | AnalyticsError>` — fetch assignment problems grouped by their tags; compute per-tag accuracy (ACCEPTED ÷ total SUBMIT-mode for assignment problems by all classroom students); return 0% when submissions exist but all failed; "No problems assigned" case returns empty `tagAccuracy` array
    - Implement `getContestAnalytics(classroomId: string): Promise<ContestAnalyticsData | AnalyticsError>` — fetch contests where `Contest.classroomId = classroomId`; for each contest, fetch all classroom-student submissions within contest time bounds; compute scores, assign ranks (desc by score, ties broken by last ACCEPTED submission time); fetch `ContestParticipation` for participation status; distinguish participated-with-zero-score from not-participated; compute practice accuracy per student
    - All three functions include auth guard and Redis cache layer
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5_
    - _Design: Server Action Interface, Data Flow → Assignment, Contest_

- [x] 7. Checkpoint — Verify formula utilities and server actions

- [x] 8. Add cache invalidation hooks to existing mutation paths
  - [x] 8.1 Update `actions/submission.action.ts` to invalidate analytics cache on SUBMIT-mode submissions
  - [x] 8.2 Update `actions/assignment.ts` to invalidate analytics cache on AssignmentStudent mutations
  - [x] 8.3 Update `actions/contest.ts` to invalidate analytics cache on ContestParticipation mutations

- [x] 9. Build shared UI utility components
  - [x] 9.1 Create `components/classroom/analytics/shared/SkeletonLoader.tsx`
  - [x] 9.2 Create `components/classroom/analytics/shared/EmptyState.tsx`

- [x] 10. Build OverviewPanel component
  - [x] 10.1 Create `components/classroom/analytics/OverviewPanel.tsx`

- [x] 11. Build TagMasterySection component
  - [x] 11.1 Create `components/classroom/analytics/TagMasterySection.tsx`

- [x] 12. Build StudentHeatmap component
  - [x] 12.1 Create `components/classroom/analytics/StudentHeatmap.tsx`

- [x] 13. Build DifficultyAnalysis component
  - [x] 13.1 Create `components/classroom/analytics/DifficultyAnalysis.tsx`

- [x] 14. Build RiskStudentsList component
  - [x] 14.1 Create `components/classroom/analytics/RiskStudentsList.tsx`

- [x] 15. Build AssignmentAnalytics component
  - [x] 15.1 Create `components/classroom/analytics/AssignmentAnalytics.tsx`

- [x] 16. Build ContestAnalytics component
  - [x] 16.1 Create `components/classroom/analytics/ContestAnalytics.tsx`

- [x] 17. Build AnalyticsDashboard root component
  - [x] 17.1 Create `components/classroom/analytics/AnalyticsDashboard.tsx`

- [x] 18. Integrate Analytics tab into classroom page
  - [x] 18.1 Update `components/classroom/ClassroomDashboard.tsx` to add the Analytics tab
  - [x] 18.2 Update `components/classroom/ClassroomSidebar.tsx` to add the Analytics sidebar item

- [x] 19. Final checkpoint — Ensure all tests pass and types are clean
  - Run `npx tsc --noEmit` and fix any remaining type errors
  - Run the test suite (`npx vitest run lib/analytics` and `npx vitest run components/classroom/analytics`) and ensure all tests pass
  - Verify the classroom page loads without console errors and the Analytics tab renders correctly
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP — the dashboard functions correctly without property tests, but they provide correctness guarantees for the formula modules
- Each task references specific requirements for full traceability back to requirements.md
- Property tests use **fast-check** (already a common TS property-testing library) with `numRuns: 200`
- The Prisma migration in Task 1 must be completed before any server action code that references `AssignmentStudent` is compiled
- Cache invalidation hooks (Task 8) are safe to add before or after UI components but must come before end-to-end testing
- The `LdChart` icon import in Task 18.2 must be verified against the `solar-icon-react` package's available exports; use the closest matching icon if `LdChart` is not exported

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["3.1", "4.1", "5.1", "9.1", "9.2"] },
    { "id": 2, "tasks": ["3.2", "4.2", "5.2", "6.1"] },
    { "id": 3, "tasks": ["6.2", "6.3", "6.4"] },
    { "id": 4, "tasks": ["8.1", "8.2", "8.3", "10.1", "11.1", "12.1", "13.1", "14.1", "15.1", "16.1"] },
    { "id": 5, "tasks": ["12.2", "14.2", "17.1"] },
    { "id": 6, "tasks": ["18.1", "18.2"] }
  ]
}
```

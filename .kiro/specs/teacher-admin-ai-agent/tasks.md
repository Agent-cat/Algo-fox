# Implementation Plan: Teacher & Admin AI Agent

## Overview

This plan implements the Teacher & Admin AI Agent feature in dependency order: database schema first, then the security layer, audit logging, all AI tool implementations, agent runtime, API routes, UI components, and finally dashboard integration. Each task group builds on the one before it.

## Tasks

### Database Schema

- [x] 1. Add AI agent Prisma schema models
  - Description: Add all 5 new Prisma models, 5 enums, and back-relations required by the AI agent feature, then run the migration.
  - Requirements: R18
  - [x] 1.1 Add enums to schema.prisma
    - Description: Add `AIAgentMessageRole`, `AIAgentActionType`, `AIAgentActionStatus`, `AIAgentJobType`, and `AIAgentJobStatus` enums to `prisma/schema.prisma`.
  - [x] 1.2 Add AIAgentConversation model
    - Description: Add the `AIAgentConversation` model with all fields, relations, and indexes (`[userId, createdAt]` and `institutionId`) as specified in the design.
  - [x] 1.3 Add AIAgentMessage model
    - Description: Add the `AIAgentMessage` model with `conversationId`, `role`, `content`, `toolName`, `toolCallId`, `metadata`, and `createdAt` fields plus the `[conversationId, createdAt]` index.
  - [x] 1.4 Add AIAgentAction model
    - Description: Add the `AIAgentAction` model with all audit fields (`arguments`, `result`, `status`, `requiresApproval`, `approved`, `approvedAt`, `errorMessage`) and the three required indexes.
  - [x] 1.5 Add AIAgentJob model
    - Description: Add the `AIAgentJob` model with `type`, `status`, `input`, `result`, `progress` (0–100), and indexes on `[userId, createdAt]` and `[institutionId, status]`.
  - [x] 1.6 Add AISavedQuery model
    - Description: Add the `AISavedQuery` model with `name`, `query`, `config` fields, a `@@unique([userId, name])` constraint, and a `[userId]` index.
  - [x] 1.7 Add back-relations to User, Institution, Classroom models
    - Description: Append `aiConversations`, `aiActions`, `aiJobs`, and `aiSavedQueries` relation fields to `User` and `Institution`; append `aiConversations` to `Classroom`.
  - [x] 1.8 Create and apply the Prisma migration
    - Description: Run `prisma migrate dev --name add-ai-agent-models` to generate and apply the migration to the development database.

### Security Layer

- [x] 2. Implement AgentContext and permission system
  - Description: Create the `AgentContext` interface and all permission constants, maps, and types needed for the security layer.
  - Requirements: R2
  - [x] 2.1 Create src/ai/agent/context.ts
    - Description: Define and export the `AgentContext` interface with `userId`, `institutionId`, `role`, `permissions`, and `sessionToken` fields.
  - [x] 2.2 Create src/ai/security/permissions.ts
    - Description: Define and export `ToolPermission` type, `TEACHER_PERMISSIONS`, `INSTITUTION_MANAGER_PERMISSIONS`, `TOOL_PERMISSION_MAP`, and `TOOL_ACTION_TYPE_MAP` covering all 21+ tool names.

- [x] 3. Implement PII guard
  - Description: Create `src/ai/security/piiGuard.ts` with the PII field list, stripping functions, and the `AIStudent` DTO type.
  - Requirements: R3
  - [x] 3.1 Define PII_FIELDS constant and PIIField type
    - Description: Export the `PII_FIELDS` tuple (`phone`, `dateOfBirth`, `gender`, `permanentAddress`, `currentAddress`, `educationDetails`, `experienceDetails`) and derive the `PIIField` union type from it.
  - [x] 3.2 Implement stripPII and stripPIIArray functions
    - Description: Implement `stripPII<T>()` to delete all PII fields from a single object and `stripPIIArray<T>()` to apply `stripPII` over an array.
  - [x] 3.3 Define AIStudent DTO type
    - Description: Export the `AIStudent` type containing only safe fields (`id`, `name`, `email`, `collegeId`, `collegeName`, `branch`, `year`, `totalScore`, `problemsSolved`, `currentStreak`, `longestStreak`, `image`) with no PII fields.

- [x] 4. Implement rate limiter
  - Description: Create `src/ai/security/rateLimiter.ts` with a Redis-based fixed-window `checkRateLimit()` function that enforces 60 requests/minute per user and fails closed on Redis unavailability.
  - Requirements: R6

- [x] 5. Implement prompt injection guard
  - Description: Create `src/ai/security/injectionGuard.ts` with `sanitize()` to strip control sequences and `detectInjection()` to flag prompt injection patterns before messages reach the LLM.
  - Requirements: R17

- [x] 6. Implement tenant guard
  - Description: Create `src/ai/security/tenantGuard.ts` with `buildSafeWhereClause()` to inject `institutionId` (and `teacherId` for TEACHER role) into Prisma where clauses and `assertTeacherOwnership()` to verify classroom ownership.
  - Requirements: R2

### Audit Logging

- [x] 7. Implement audit log functions
  - Description: Create `src/ai/audit/logAction.ts` with `createAction()` to insert a PENDING `AIAgentAction` record before tool execution and `updateAction()` to set the final status and result after execution.
  - Requirements: R4

### AI Tool Implementations

- [x] 8. Implement student tools
  - Description: Create the five student-facing AI tool functions in `src/ai/tools/students/`, each scoped to the caller's institution and stripped of PII.
  - Requirements: R8
  - [x] 8.1 searchStudents
    - Description: Implement `searchStudents` to query `User` records by name, email, or collegeId scoped to the caller's `institutionId`, returning `AIStudent` DTOs.
  - [x] 8.2 getStudentProgress
    - Description: Implement `getStudentProgress` to return `totalScore`, `problemsSolved`, `currentStreak`, `longestStreak`, and assignment completion rate for a given student with no PII fields.
  - [x] 8.3 getStudentSubmissions
    - Description: Implement `getStudentSubmissions` to return submissions with problem title, status, and `createdAt` ordered descending, explicitly excluding the `code` field.
  - [x] 8.4 getInactiveStudents
    - Description: Implement `getInactiveStudents` using a batch `groupBy` on `Submission.createdAt` to classify each enrolled student as active or inactive against a configurable threshold (default 14 days).
  - [x] 8.5 identifyStudentsNeedingAttention
    - Description: Implement `identifyStudentsNeedingAttention` by combining inactivity detection with weak-topic detection (mastery score < 40) and returning only students meeting both criteria.

- [x] 9. Implement classroom tools
  - Description: Create the three classroom AI tool functions in `src/ai/tools/classrooms/`.
  - Requirements: R11
  - [x] 9.1 listClassrooms
    - Description: Implement `listClassrooms` to return classrooms owned by the teacher (TEACHER role) or all classrooms in the institution (INSTITUTION_MANAGER role), including student count, subject, and section.
  - [x] 9.2 getClassroomStudents
    - Description: Implement `getClassroomStudents` to return enrolled students with safe fields only (`name`, `collegeId`, `branch`, `year`, `totalScore`, `problemsSolved`), excluding all PII fields.
  - [x] 9.3 createClassroom
    - Description: Implement `createClassroom` as a WRITE tool that wraps the existing `createClassroom` server action and is gated behind the Confirmation_Gate.

- [x] 10. Implement assignment tools
  - Description: Create the three assignment AI tool functions in `src/ai/tools/assignments/`.
  - Requirements: R9, R10
  - [x] 10.1 searchProblems
    - Description: Implement `searchProblems` to filter `Problem` records by one or more `topicTags` and/or `difficulty`, returning `id`, `title`, `difficulty`, and `topicTags`.
  - [x] 10.2 createAssignment
    - Description: Implement `createAssignment` as a WRITE tool that verifies classroom ownership via `assertTeacherOwnership()`, then wraps `actions/assignment.ts#createAssignment`.
  - [x] 10.3 getAssignmentPerformance
    - Description: Implement `getAssignmentPerformance` to return per-student completion status, score, and overdue status for a given assignment ID.

- [x] 11. Implement analytics tools
  - Description: Create the two analytics AI tool functions in `src/ai/tools/analytics/`.
  - Requirements: R9, R13
  - [x] 11.1 getClassroomTopicPerformance
    - Description: Implement `getClassroomTopicPerformance` by wrapping `getTagMasteryAnalytics` from `actions/classroom-analytics.ts`, supporting an optional `studentId` filter and returning results sorted ascending by mastery score.
  - [x] 11.2 generateClassReport
    - Description: Implement `generateClassReport` to compose `getOverviewAnalytics`, `getRiskAnalytics`, `getTagMasteryAnalytics`, and `getAssignmentAnalytics` in parallel, create an `AIAgentJob`, and set status to `COMPLETED` only after the result is fully populated.

- [x] 12. Implement file import tools
  - Description: Create the three file import AI tool functions in `src/ai/tools/imports/`.
  - Requirements: R7
  - [x] 12.1 parseFile
    - Description: Implement `parseFile` to parse CSV files with `papaparse` and XLSX files with the `xlsx` library, validating that required headers are present before returning rows.
  - [x] 12.2 matchStudents
    - Description: Implement `matchStudents` to match parsed rows against `User` records using three-priority matching (collegeId → email → name+collegeId), never auto-selecting ambiguous matches.
  - [x] 12.3 importStudents
    - Description: Implement `importStudents` to enroll confirmed students in a single Prisma transaction, creating an `AIAgentJob` with progress tracking for batches over 100 rows.

- [x] 13. Implement quiz tools
  - Description: Create the two quiz AI tool functions in `src/ai/tools/quizzes/`.
  - Requirements: R12
  - [x] 13.1 createQuiz
    - Description: Implement `createQuiz` as a WRITE tool that wraps `actions/quiz-templates.ts#createQuizTemplate` and requires Confirmation_Gate approval before persisting the quiz template.
  - [x] 13.2 assignQuizToClassroom
    - Description: Implement `assignQuizToClassroom` as a WRITE tool that wraps `actions/quiz-templates.ts#assignQuizToClassroom` and verifies classroom ownership before requesting confirmation.

- [x] 14. Implement utility tools
  - Description: Create `getJobStatus`, `saveQuery`, `listSavedQueries`, `runSavedQuery`, and `getContestAnalytics` in their respective `src/ai/tools/` subdirectories.
  - Requirements: R14, R15, R16
  - [x] 14.1 getJobStatus
    - Description: Implement `getJobStatus` to read an `AIAgentJob` by id scoped to the caller's `userId`, returning `status`, `progress`, and `result`.
  - [x] 14.2 saveQuery, listSavedQueries, runSavedQuery
    - Description: Implement CRUD operations for `AISavedQuery`: `saveQuery` creates or overwrites (with confirmation when name exists), `listSavedQueries` returns all queries for the user, and `runSavedQuery` replays the stored query text as a new agent message.
  - [x] 14.3 getContestAnalytics
    - Description: Implement `getContestAnalytics` requiring the `CONTEST_ANALYTICS_READ` permission and stripping `blockReason`, `sessionId`, and `ipAddress` fields from `ContestParticipation` results before returning.

- [x] 15. Create tool registry
  - Description: Create `src/ai/tools/index.ts` to export all 21+ tool definitions as LangChain `DynamicStructuredTool` instances with Zod input schemas for every tool, each accepting `AgentContext` via closure.
  - Requirements: R2, R4

### Agent Runtime

- [x] 16. Implement agent executor
  - Description: Create `src/ai/agent/executor.ts` to execute a single tool call after verifying permission, creating a PENDING `AIAgentAction`, injecting `institutionId` via the tenant guard, calling the `DynamicStructuredTool.func`, stripping PII from the result, and updating the action to SUCCESS or FAILED; write tools return an `approval_required` signal without executing.
  - Requirements: R2, R3, R4, R5

- [x] 17. Implement agent runtime
  - Description: Create `src/ai/agent/runtime.ts` to orchestrate the LangChain `AgentExecutor` multi-turn loop using `createOpenAIToolsAgent` + `AgentExecutor` with `streamEvents`: injection check → rate limit → load/create conversation → persist user message → build `BaseMessage[]` history → call LLM via executor → intercept `on_tool_start` events for write-op halting → persist assistant message → stream response via SSE; halts the turn and returns `approval_required` for write operations.
  - Requirements: R1, R4, R5, R6, R17

### API Routes

- [x] 18. Implement main chat API route
  - Description: Create `app/api/ai-agent/route.ts` as a streaming POST handler that validates the NextAuth session, builds `AgentContext`, delegates to the agent runtime, and streams the response; returns 401 for unauthenticated requests and 403 for non-TEACHER/INSTITUTION_MANAGER roles.
  - Requirements: R1, R2, R6

- [x] 19. Implement approval and cancel routes
  - Description: Create `app/api/ai-agent/approve/route.ts` and `app/api/ai-agent/cancel/route.ts` as POST handlers that load the `AIAgentAction`, verify `userId === session.user.id`, and either execute the approved tool or set status to `CANCELLED`.
  - Requirements: R4, R5

- [x] 20. Implement file upload route
  - Description: Create `app/api/ai-agent/upload/route.ts` as a multipart POST handler that validates MIME type, enforces the 5 MB size limit and 1,000-row cap, then calls `parseFile → matchStudents` and returns the preview JSON to the client.
  - Requirements: R7

- [x] 21. Implement job polling route
  - Description: Create `app/api/ai-agent/jobs/[jobId]/route.ts` as a GET handler that returns the `status`, `progress`, and `result` of an `AIAgentJob` record scoped to the authenticated session's `userId`.
  - Requirements: R16

### UI Components

- [x] 22. Implement AIAgentPanel component
  - Description: Create `app/(main)/dashboard/_components/AIAgentPanel.tsx` as a persistent side panel using a custom `useAgentChat()` hook that consumes the SSE stream from `/api/ai-agent`, rendering the message list, file upload button, and text input box.
  - Requirements: R1

- [x] 23. Implement ChatMessage component
  - Description: Create `app/(main)/dashboard/_components/ChatMessage.tsx` to render a single message as user text, assistant text, a `ConfirmationCard` (for write operations), or a job progress bar (for async jobs).
  - Requirements: R1, R5

- [x] 24. Implement ConfirmationCard component
  - Description: Create `app/(main)/dashboard/_components/ConfirmationCard.tsx` to display a structured preview of a pending write operation with an operation-type badge and Confirm/Cancel buttons wired to `/api/ai-agent/approve` and `/api/ai-agent/cancel`; disables the chat input while awaiting confirmation.
  - Requirements: R5

- [x] 25. Implement FileUploadZone component
  - Description: Create `app/(main)/dashboard/_components/FileUploadZone.tsx` as a drag-and-drop zone accepting `.csv` and `.xlsx` files only, calling the upload route and injecting the returned match result into the chat conversation.
  - Requirements: R7

- [x] 26. Implement SavedQueryList component
  - Description: Create `app/(main)/dashboard/_components/SavedQueryList.tsx` as a collapsible list of the user's `AISavedQuery` records where clicking any item re-runs that query through the agent.
  - Requirements: R14

### Dashboard Integration

- [x] 27. Integrate AIAgentPanel into teacher dashboard
  - Description: Import and mount `AIAgentPanel` in the teacher dashboard page or layout and add a toggle button to the teacher dashboard header to open and close the panel.
  - Requirements: R1

- [x] 28. Integrate AIAgentPanel into institution-manager dashboard
  - Description: Import and mount `AIAgentPanel` in the institution-manager dashboard page or layout and add a toggle button to the admin dashboard header to open and close the panel.
  - Requirements: R1

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": [1] },
    { "wave": 2, "tasks": [2, 3, 4, 5, 6] },
    { "wave": 3, "tasks": [7] },
    { "wave": 4, "tasks": [8, 9, 10, 11, 12, 13, 14] },
    { "wave": 5, "tasks": [15] },
    { "wave": 6, "tasks": [16] },
    { "wave": 7, "tasks": [17] },
    { "wave": 8, "tasks": [18, 19, 20, 21] },
    { "wave": 9, "tasks": [22, 23, 24, 25, 26] },
    { "wave": 10, "tasks": [27, 28] }
  ]
}
```

## Notes

- All AI tool functions receive `AgentContext` injected by the executor — tools never accept `institutionId` from LLM-supplied arguments.
- `stripPII()` is applied at the executor boundary so even a buggy tool cannot leak PII into LLM messages or audit records.
- The rate limiter (Task 4) is fail-closed: Redis unavailability blocks all tool calls and returns HTTP 503.
- Write tools (createClassroom, createAssignment, createQuiz, assignQuizToClassroom, importStudents) must not execute until `AIAgentAction.approved = true` is set by the approve route.
- File import jobs over 100 rows use fire-and-forget async tracking via `AIAgentJob`; the BullMQ upgrade path is noted in the design for production scale.

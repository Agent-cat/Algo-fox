# Technical Design Document: Teacher & Admin AI Agent

## Overview

This document describes the technical design for the Teacher & Admin AI Agent feature on the Algo-fox platform. The feature adds a tool-based AI copilot embedded as a side panel in the teacher and institution-manager dashboards. The agent enables conversational access to student analytics, classroom management, assignment creation, quiz setup, file-based bulk enrollment, and report generation — all routed through a layered security system that enforces tenant isolation, role-based access control, PII filtering, confirmation gates on write operations, and a complete audit trail.

The agent uses OpenAI `gpt-4o` via **LangChain.js** (`@langchain/openai` + `langchain`) with structured tool calling. It is explicitly **not** a direct LLM-to-Prisma pipeline: every database operation goes through typed tool functions with permission checks and audit logging.

## Architecture

See [Architecture Overview](#1-architecture-overview) below for the full layered diagram and component descriptions.

## Components and Interfaces

The system is composed of the following major component groups:

- **Agent Runtime** (`src/ai/agent/`): Orchestrates the multi-turn LLM loop, conversation persistence, and approval halting.
- **AI Tools** (`src/ai/tools/`): Discrete, named functions callable by the LLM — one per capability. Each wraps existing Prisma service functions.
- **Security Layer** (`src/ai/security/`): Permission checking, tenant injection, PII stripping, rate limiting, and injection detection.
- **Audit Layer** (`src/ai/audit/`): Creates and updates `AIAgentAction` records before and after every tool execution.
- **API Routes** (`app/api/ai-agent/`): Next.js App Router handlers for streaming chat, approval/cancellation, file upload, and job polling.
- **UI Components** (`app/(main)/dashboard/_components/`): React components for the chat panel, confirmation cards, file upload, and saved queries.

See [File Structure](#4-file-structure) for the complete directory layout and [Permission System Design](#6-permission-system-design) for the full interface types.

## Data Models

Five new Prisma models are added: `AIAgentConversation`, `AIAgentMessage`, `AIAgentAction`, `AIAgentJob`, and `AISavedQuery`. Full schema definitions with indexes and back-relations are in [New Prisma Schema Models](#3-new-prisma-schema-models).

## Error Handling

- **LLM errors**: Caught in `runtime.ts`; the assistant message is set to a user-friendly error; the turn is marked failed without crashing the conversation.
- **Tool errors**: Each tool wraps its Prisma calls in try/catch; errors bubble up to `executor.ts` which calls `updateAction(FAILED, errorMessage)` before re-throwing.
- **Rate limit exceeded**: Returns HTTP 429 with a `retryAfter` value in seconds; client shows inline message and re-enables input after the window resets.
- **Redis unavailable**: Fail-closed — returns HTTP 503; no tool calls proceed until Redis recovers.
- **DB write failure on message persist**: Blocks the turn and returns an error to the client (R1.5).
- **Partial analytics failure in `generateClassReport`**: Any single analytics function failure causes the entire job to be marked `FAILED` with the specific error stored in the job record.
- **File import errors**: File-level errors (wrong MIME, too large, too many rows) are returned as HTTP 4xx with descriptive messages before any DB writes occur.
- **Injection detection**: Returns a warning message to the user; does not forward the message to the LLM; logs a `SECURITY_EVENT` action.

## Testing Strategy

- **Unit tests** for each security component (`piiGuard`, `injectionGuard`, `rateLimiter`, `tenantGuard`) using Jest with mocked Redis and Prisma clients.
- **Unit tests** for each AI tool implementation with mocked `AgentContext` and Prisma responses, verifying tenant scoping and PII absence in outputs.
- **Integration tests** for the `runtime.ts` loop using the Vercel AI SDK's test utilities to simulate LLM tool call responses.
- **API route tests** for `/api/ai-agent/approve` and `/api/ai-agent/cancel` verifying ownership checks and state transitions.
- **E2E tests** (Playwright) for the `ConfirmationCard` round-trip: simulate a create classroom intent → verify card renders → click confirm → verify classroom created.
- **Property-based tests** for `stripPII()` verifying that no PII field appears in output regardless of input shape.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Choices](#2-technology-choices)
3. [New Prisma Schema Models](#3-new-prisma-schema-models)
4. [File Structure](#4-file-structure)
5. [Agent Runtime Design](#5-agent-runtime-design)
6. [Permission System Design](#6-permission-system-design)
7. [PII Guard Design](#7-pii-guard-design)
8. [Tool Implementations — Key Examples](#8-tool-implementations--key-examples)
9. [Confirmation Gate Flow](#9-confirmation-gate-flow)
10. [Rate Limiter Design](#10-rate-limiter-design)
11. [File Upload Flow](#11-file-upload-flow)
12. [Async Job Design](#12-async-job-design)
13. [UI Component Design](#13-ui-component-design)
14. [Security Considerations](#14-security-considerations)
15. [Requirements Traceability](#15-requirements-traceability)

---

## 1. Architecture Overview

The AI agent is a layered system where each layer has a single clear responsibility. No layer is allowed to bypass the one above it.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Teacher / Institution Manager Dashboard (React)                     │
│  AIAgentPanel  ←→  ConfirmationCard  ←→  FileUploadZone             │
│  Custom useAgentChat() hook  (SSE streaming from LangChain runtime) │
└───────────────────────────┬─────────────────────────────────────────┘
                            │  POST /api/ai-agent/route (streaming)
                            │  POST /api/ai-agent/approve
                            │  POST /api/ai-agent/cancel
                            │  POST /api/ai-agent/upload
                            │  GET  /api/ai-agent/jobs/[jobId]
┌───────────────────────────▼─────────────────────────────────────────┐
│  API Route Layer  (Next.js App Router — Edge-compatible)             │
│  • Validate NextAuth session                                         │
│  • Build AgentContext from session (userId, institutionId, role)     │
│  • Delegate to Agent Runtime                                         │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│  Agent Runtime  (src/ai/agent/runtime.ts)                           │
│  • Load conversation history from DB                                 │
│  • Injection guard → Rate limiter → Persist user message            │
│  • Call OpenAI gpt-4o with tool definitions                          │
│  • Multi-turn: iterate over tool calls until text response           │
│  • Halt on write-op → return actionId + preview to client           │
│  • Stream final text response via LangChain streaming               │
└──────┬────────────────────┬────────────────────────┬────────────────┘
       │                    │                        │
┌──────▼──────┐   ┌─────────▼──────────┐   ┌────────▼───────────────┐
│  Security   │   │  Audit Layer       │   │  Tool Executor          │
│  Layer      │   │  (logAction.ts)    │   │  (executor.ts)          │
│             │   │  • createAction()  │   │  • Check permission     │
│ • permissions│  │  • updateAction()  │   │  • Inject institutionId │
│ • tenantGuard│  │  Writes to         │   │  • Call tool function   │
│ • piiGuard  │   │  AIAgentAction     │   │  • stripPII() on result │
│ • rateLimiter│  │  before + after    │   └────────────────────────┘
│ • injectionGuard│ └───────────────────┘
└─────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────────┐
│  AI Tools  (src/ai/tools/**)                                        │
│  Each tool is a plain TypeScript function — no session access.      │
│  institutionId / teacherId are ALWAYS injected by executor.ts,      │
│  never accepted from LLM args.                                      │
└──────┬──────────────────────────────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────────┐
│  Existing Prisma Service Functions  (actions/**)                    │
│  getOverviewAnalytics, getRiskAnalytics, getTagMasteryAnalytics,    │
│  getAssignmentAnalytics, createAssignment, createClassroom,         │
│  createQuizTemplate, assignQuizToClassroom, getClassroomContext,    │
│  getTeacherAssignmentAnalytics, getClassroomWithStudents …          │
└──────┬──────────────────────────────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────────┐
│  PostgreSQL via Prisma ORM                                          │
└─────────────────────────────────────────────────────────────────────┘
```

Key invariant: **institutionId is injected by `tenantGuard.ts` using the server-side session before the tool function receives it. It is never read from LLM-supplied tool arguments.**

---

## 2. Technology Choices

| Concern | Choice | Rationale |
|---|---|---|
| LLM | OpenAI `gpt-4o` | Best-in-class tool-calling + structured outputs; already used for `ai-help` in the project |
| AI SDK | LangChain.js (`@langchain/openai`, `langchain`) | Mature agent/tool orchestration, `createOpenAIToolsAgent` + `AgentExecutor`, first-class streaming via `streamLog` / `streamEvents` |
| Tool schema | Zod schemas via LangChain `DynamicStructuredTool` | Type-safe input validation; LangChain converts Zod schemas to OpenAI function JSON schemas automatically |
| Streaming to client | `AgentExecutor.streamEvents()` piped to `ReadableStream` (SSE) | Gives per-token + per-tool-call events; consumed by a custom `useAgentChat()` React hook |
| CSV parsing | `papaparse` | Battle-tested, works in Node runtime, no native deps |
| XLSX parsing | `xlsx` (SheetJS community) | Standard choice; kept behind a try/catch for malformed files |
| Rate limiting | `ioredis` + custom fixed-window | Already used in `actions/classroom.ts`; avoids new deps |
| File upload | Next.js `Request.formData()` | Built-in, no extra middleware; 5 MB limit enforced manually |
| UI streaming | Custom `useAgentChat()` hook (EventSource / fetch SSE) | Consumes the `streamEvents` SSE endpoint; handles tool-call state machine |
| Background jobs | `queueMicrotask` / `Promise` fire-and-forget | Sufficient for ≤1000 rows; BullMQ recommended for production scale |

### Key LangChain Packages

```
@langchain/openai        — ChatOpenAI model with tool-calling
@langchain/core          — BaseTool, DynamicStructuredTool, BaseMessage types
langchain                — createOpenAIToolsAgent, AgentExecutor
```

### LangChain Tool Pattern

Each AI tool is a `DynamicStructuredTool` instance:

```typescript
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';

export const getInactiveStudentsTool = (ctx: AgentContext) =>
  new DynamicStructuredTool({
    name: 'getInactiveStudents',
    description: 'Returns students in a classroom who have not submitted any code in the last N days.',
    schema: z.object({
      classroomId: z.string().describe('The classroom ID to check'),
      thresholdDays: z.number().optional().default(14).describe('Inactivity threshold in days'),
    }),
    func: async (args) => {
      // executor.ts validates permission and injects ctx before calling this
      const result = await getInactiveStudentsImpl(args, ctx);
      return JSON.stringify(result);
    },
  });
```

All tools are bound to the agent at request time with the caller's `AgentContext` already closed over — the LLM never supplies `institutionId`.

### LLM System Prompt Responsibilities

The system prompt (built in `runtime.ts`) must:
- State the agent's identity and its institutional context
- List all available tools with plain-language descriptions (LangChain handles the JSON schema)
- Enforce: "Never ask for or include phone, dateOfBirth, gender, address, or education fields"
- Enforce: "For any CREATE, UPDATE, DELETE, or IMPORT action, always wait for explicit user confirmation before proceeding"
- Enforce: "institutionId for every operation is `{ctx.institutionId}` — never override this"

---

## 3. New Prisma Schema Models

The following additions go at the bottom of `prisma/schema.prisma`, before the closing.

### 3.1 Enums

```prisma
enum AIAgentMessageRole {
  USER
  ASSISTANT
  TOOL
  SYSTEM
}

enum AIAgentActionType {
  READ
  CREATE
  UPDATE
  DELETE
  IMPORT
  EXPORT
}

enum AIAgentActionStatus {
  PENDING
  SUCCESS
  FAILED
  CANCELLED
  PERMISSION_DENIED
  BLOCKED
}

enum AIAgentJobType {
  FILE_IMPORT
  CLASS_ANALYSIS
  REPORT_GENERATION
  BULK_ASSIGNMENT
  BULK_ENROLLMENT
}

enum AIAgentJobStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}
```

### 3.2 AIAgentConversation

```prisma
model AIAgentConversation {
  id            String             @id @default(cuid())
  institutionId String
  userId        String
  title         String?
  classroomId   String?
  context       Json?
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt

  institution   Institution        @relation(fields: [institutionId], references: [id], onDelete: Cascade)
  user          User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  classroom     Classroom?         @relation(fields: [classroomId], references: [id], onDelete: SetNull)
  messages      AIAgentMessage[]
  actions       AIAgentAction[]

  @@index([userId, createdAt])
  @@index([institutionId])
  @@map("ai_agent_conversation")
}
```

### 3.3 AIAgentMessage

```prisma
model AIAgentMessage {
  id             String              @id @default(cuid())
  conversationId String
  role           AIAgentMessageRole
  content        String
  toolName       String?
  toolCallId     String?
  metadata       Json?
  createdAt      DateTime            @default(now())

  conversation   AIAgentConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@index([conversationId, createdAt])
  @@map("ai_agent_message")
}
```

### 3.4 AIAgentAction

```prisma
model AIAgentAction {
  id               String              @id @default(cuid())
  conversationId   String?
  institutionId    String
  userId           String
  toolName         String
  actionType       AIAgentActionType
  arguments        Json
  result           Json?
  status           AIAgentActionStatus @default(PENDING)
  requiresApproval Boolean             @default(false)
  approved         Boolean             @default(false)
  approvedAt       DateTime?
  errorMessage     String?
  createdAt        DateTime            @default(now())
  updatedAt        DateTime            @updatedAt

  conversation     AIAgentConversation? @relation(fields: [conversationId], references: [id], onDelete: SetNull)
  institution      Institution          @relation(fields: [institutionId], references: [id], onDelete: Cascade)
  user             User                 @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([institutionId, createdAt])
  @@index([userId, createdAt])
  @@index([conversationId])
  @@map("ai_agent_action")
}
```

### 3.5 AIAgentJob

```prisma
model AIAgentJob {
  id            String           @id @default(cuid())
  institutionId String
  userId        String
  type          AIAgentJobType
  status        AIAgentJobStatus @default(PENDING)
  input         Json
  result        Json?
  progress      Int              @default(0)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  institution   Institution      @relation(fields: [institutionId], references: [id], onDelete: Cascade)
  user          User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@index([institutionId, status])
  @@map("ai_agent_job")
}
```

### 3.6 AISavedQuery

```prisma
model AISavedQuery {
  id            String   @id @default(cuid())
  institutionId String
  userId        String
  name          String
  query         String
  config        Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  institution   Institution @relation(fields: [institutionId], references: [id], onDelete: Cascade)
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, name])
  @@index([userId])
  @@map("ai_saved_query")
}
```

### 3.7 Back-relations to Add on Existing Models

```prisma
// On User model — append to existing relations block:
aiConversations   AIAgentConversation[]
aiActions         AIAgentAction[]
aiJobs            AIAgentJob[]
aiSavedQueries    AISavedQuery[]

// On Institution model — append to existing relations block:
aiConversations   AIAgentConversation[]
aiActions         AIAgentAction[]
aiJobs            AIAgentJob[]
aiSavedQueries    AISavedQuery[]

// On Classroom model — append to existing relations block:
aiConversations   AIAgentConversation[]
```

---

## 4. File Structure

### Backend — AI Agent System

```
src/ai/
  agent/
    runtime.ts          — orchestrates LangChain AgentExecutor and multi-turn loop
    context.ts          — AgentContext type (userId, institutionId, role, permissions)
    executor.ts         — executes a single tool call after permission check
  tools/
    index.ts            — builds and exports all DynamicStructuredTool instances (bound to AgentContext)
    students/
      searchStudents.ts
      getStudentProgress.ts
      getStudentSubmissions.ts
      getInactiveStudents.ts
      identifyStudentsNeedingAttention.ts
    classrooms/
      getClassroomStudents.ts
      listClassrooms.ts
      createClassroom.ts
    assignments/
      searchProblems.ts
      createAssignment.ts
      getAssignmentPerformance.ts
    imports/
      parseFile.ts
      matchStudents.ts
      importStudents.ts
    analytics/
      getClassroomTopicPerformance.ts
      generateClassReport.ts
    quizzes/
      createQuiz.ts
      assignQuizToClassroom.ts
    jobs/
      getJobStatus.ts
    savedQueries/
      saveQuery.ts
      listSavedQueries.ts
      runSavedQuery.ts
    contest/
      getContestAnalytics.ts
  security/
    permissions.ts      — TEACHER_PERMISSIONS, INSTITUTION_MANAGER_PERMISSIONS, TOOL_PERMISSION_MAP
    tenantGuard.ts      — injects institutionId/teacherId into every Prisma where clause
    piiGuard.ts         — stripPII() function and AIStudent DTO type
    rateLimiter.ts      — Redis-based fixed-window rate limiter
    injectionGuard.ts   — regex-based injection detection and sanitization
  audit/
    logAction.ts        — createAction(), updateAction()
```

### API Routes

```
app/api/
  ai-agent/
    route.ts                — POST: validate session, run runtime, stream response
    approve/
      route.ts              — POST: approve a pending AIAgentAction
    cancel/
      route.ts              — POST: cancel a pending AIAgentAction
    upload/
      route.ts              — POST: file upload → parse → matchStudents → return preview
    jobs/
      [jobId]/
        route.ts            — GET: poll AIAgentJob status and progress
```

### UI Components

```
app/(main)/dashboard/
  _components/
    AIAgentPanel.tsx        — side panel container, manages chat state with custom useAgentChat hook
    ChatMessage.tsx         — renders one message (text, tool preview, or confirmation card)
    ConfirmationCard.tsx    — structured Confirm/Cancel UI for write operations
    FileUploadZone.tsx      — drag-and-drop zone, calls /api/ai-agent/upload
    SavedQueryList.tsx      — collapsible list of AISavedQuery records
  hooks/
    useAgentChat.ts         — custom React hook consuming the SSE /api/ai-agent stream
```

The `AIAgentPanel` is imported into:
- `app/(main)/dashboard/teacher/page.tsx` (or its layout)
- `app/(main)/dashboard/institution/page.tsx` (or its layout)

---

## 5. Agent Runtime Design

File: `src/ai/agent/runtime.ts`

```
runAgentTurn(
  userMessage: string,
  conversationId: string | null,
  ctx: AgentContext,
  onEvent: (event: AgentStreamEvent) => void
): Promise<AgentTurnResult>
```

The runtime uses LangChain's `createOpenAIToolsAgent` + `AgentExecutor` pattern:

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { createOpenAIToolsAgent, AgentExecutor } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

const llm = new ChatOpenAI({ model: 'gpt-4o', streaming: true });
const prompt = ChatPromptTemplate.fromMessages([
  ['system', buildSystemPrompt(ctx)],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad'),
]);

const agent = await createOpenAIToolsAgent({ llm, tools: buildTools(ctx), prompt });
const executor = new AgentExecutor({ agent, tools: buildTools(ctx), maxIterations: 10 });
```

### Step-by-Step Loop

```
1. INJECTION CHECK
   injectionGuard.sanitize(userMessage)
   → if injection detected: log SECURITY_EVENT action, return warning, halt

2. RATE LIMIT CHECK
   rateLimiter.check(ctx.userId)
   → if over limit: return 429 error, halt
   → if Redis unavailable: return 503 error, halt (fail-closed)

3. CONVERSATION LOAD
   if conversationId given: load last 40 AIAgentMessages from DB (ordered by createdAt asc)
   else: create new AIAgentConversation record

4. PERSIST USER MESSAGE
   prisma.aIAgentMessage.create({ role: USER, content: sanitizedMessage, conversationId })
   → if DB error: return error to client, halt

5. BUILD CHAT HISTORY
   Map DB messages to LangChain BaseMessage[]:
   USER → HumanMessage, ASSISTANT → AIMessage, TOOL → ToolMessage, SYSTEM → SystemMessage

6. CALL LANGCHAIN AGENT (streamEvents)
   const eventStream = await executor.streamEvents(
     { input: sanitizedMessage, chat_history: chatHistory },
     { version: 'v2' }
   );

7. FOR EACH EVENT IN eventStream:
   - 'on_tool_start': extract tool name + args
       a. Look up required permission from TOOL_PERMISSION_MAP
       b. Check ctx.permissions includes required permission
          → if not: log AIAgentAction(PERMISSION_DENIED), emit error event, skip tool
       c. Determine actionType from TOOL_ACTION_TYPE_MAP
       d. createAction(PENDING, requiresApproval = actionType !== READ)
       e. If actionType !== READ (write operation):
          → updateAction(status: PENDING, requiresApproval: true)
          → HALT current turn
          → emit { type: 'approval_required', actionId, preview: args } to client
          Client shows ConfirmationCard. Tool func is not called.
   - 'on_tool_end': extract result
       → stripPII() on result
       → updateAction(SUCCESS, result)
   - 'on_chain_stream': emit text chunks to client as SSE
   - 'on_llm_error' / 'on_tool_error':
       → updateAction(FAILED, errorMessage)

8. PERSIST ASSISTANT MESSAGE
   prisma.aIAgentMessage.create({ role: ASSISTANT, content: finalText, conversationId })

9. STREAM RESPONSE
   Pipe streamEvents to Next.js Response as Server-Sent Events
   (client-side useAgentChat hook reads the SSE stream)
```

### LangChain Tool Execution Note

Unlike the Vercel AI SDK where tools are called directly by the runtime, in LangChain the `DynamicStructuredTool.func` is called by the `AgentExecutor` internally. The permission check and audit write happen **inside the `func` itself** (injected via the `AgentContext` closure), so the runtime only needs to intercept write tools at the `on_tool_start` event to halt for confirmation. Read tools run freely and the executor handles the multi-turn loop automatically.

### Approval Resume Flow

When the teacher clicks Confirm on a `ConfirmationCard`:
```
POST /api/ai-agent/approve  { actionId }
→ Load AIAgentAction, verify userId matches session
→ Set approved = true, approvedAt = now()
→ Re-execute the tool with stored arguments (from action.arguments)
→ updateAction(SUCCESS, result)
→ Return plain JSON result (not streaming — approval is not a turn)
```

---

## 6. Permission System Design

File: `src/ai/security/permissions.ts`

```typescript
// src/ai/agent/context.ts
export interface AgentContext {
  userId: string;
  institutionId: string;
  role: 'TEACHER' | 'INSTITUTION_MANAGER';
  permissions: ToolPermission[];
  sessionToken: string;
}
```

```typescript
// src/ai/security/permissions.ts

export type ToolPermission =
  | 'STUDENT_READ'
  | 'STUDENT_PROGRESS_READ'
  | 'SUBMISSION_READ'
  | 'CLASSROOM_READ'
  | 'ASSIGNMENT_READ'
  | 'ASSIGNMENT_CREATE'
  | 'ASSIGNMENT_ASSIGN'
  | 'CLASSROOM_CREATE'
  | 'CLASSROOM_STUDENT_IMPORT'
  | 'ANALYTICS_READ'
  | 'PROBLEM_READ'
  | 'QUIZ_READ'
  | 'QUIZ_CREATE'
  | 'INSTITUTION_ANALYTICS_READ'
  | 'TEACHER_PERFORMANCE_READ'
  | 'CONTEST_ANALYTICS_READ';

export const TEACHER_PERMISSIONS: ToolPermission[] = [
  'STUDENT_READ',
  'STUDENT_PROGRESS_READ',
  'SUBMISSION_READ',
  'CLASSROOM_READ',
  'ASSIGNMENT_READ',
  'ASSIGNMENT_CREATE',
  'ASSIGNMENT_ASSIGN',
  'CLASSROOM_CREATE',
  'CLASSROOM_STUDENT_IMPORT',
  'ANALYTICS_READ',
  'PROBLEM_READ',
  'QUIZ_READ',
  'QUIZ_CREATE',
];

export const INSTITUTION_MANAGER_PERMISSIONS: ToolPermission[] = [
  ...TEACHER_PERMISSIONS,
  'INSTITUTION_ANALYTICS_READ',
  'TEACHER_PERFORMANCE_READ',
];

// Maps each tool name to the single permission it requires.
// The executor checks ctx.permissions.includes(TOOL_PERMISSION_MAP[toolName]).
export const TOOL_PERMISSION_MAP: Record<string, ToolPermission> = {
  // Students
  searchStudents:                    'STUDENT_READ',
  getClassroomStudents:              'STUDENT_READ',
  getStudentProgress:                'STUDENT_PROGRESS_READ',
  getStudentSubmissions:             'SUBMISSION_READ',
  getInactiveStudents:               'STUDENT_READ',
  identifyStudentsNeedingAttention:  'STUDENT_READ',
  // Classrooms
  listClassrooms:                    'CLASSROOM_READ',
  createClassroom:                   'CLASSROOM_CREATE',
  importStudents:                    'CLASSROOM_STUDENT_IMPORT',
  // Assignments
  searchProblems:                    'PROBLEM_READ',
  createAssignment:                  'ASSIGNMENT_CREATE',
  getAssignmentPerformance:          'ASSIGNMENT_READ',
  // Analytics
  getClassroomTopicPerformance:      'ANALYTICS_READ',
  generateClassReport:               'ANALYTICS_READ',
  // Quizzes
  createQuiz:                        'QUIZ_CREATE',
  assignQuizToClassroom:             'QUIZ_CREATE',
  // Jobs & saved queries
  getJobStatus:                      'ANALYTICS_READ',
  saveQuery:                         'STUDENT_READ',
  listSavedQueries:                  'STUDENT_READ',
  runSavedQuery:                     'STUDENT_READ',
  // Contest (restricted)
  getContestAnalytics:               'CONTEST_ANALYTICS_READ',
};

// Maps each tool name to its action type (used by executor to set requiresApproval)
export const TOOL_ACTION_TYPE_MAP: Record<string, AIAgentActionType> = {
  searchStudents:                    'READ',
  getClassroomStudents:              'READ',
  getStudentProgress:                'READ',
  getStudentSubmissions:             'READ',
  getInactiveStudents:               'READ',
  identifyStudentsNeedingAttention:  'READ',
  listClassrooms:                    'READ',
  createClassroom:                   'CREATE',
  importStudents:                    'IMPORT',
  searchProblems:                    'READ',
  createAssignment:                  'CREATE',
  getAssignmentPerformance:          'READ',
  getClassroomTopicPerformance:      'READ',
  generateClassReport:               'READ',
  createQuiz:                        'CREATE',
  assignQuizToClassroom:             'CREATE',
  getJobStatus:                      'READ',
  saveQuery:                         'CREATE',
  listSavedQueries:                  'READ',
  runSavedQuery:                     'READ',
  getContestAnalytics:               'READ',
};
```

### Resolving AgentContext from Session

In `app/api/ai-agent/route.ts`:

```typescript
async function buildAgentContext(req: Request): Promise<AgentContext | null> {
  const session = await getSession();
  if (!session?.user) return null;

  const user = session.user as any;
  const role = user.role as string;

  if (role !== 'TEACHER' && role !== 'INSTITUTION_MANAGER') return null;
  if (!user.institutionId) return null;

  const permissions =
    role === 'INSTITUTION_MANAGER'
      ? INSTITUTION_MANAGER_PERMISSIONS
      : TEACHER_PERMISSIONS;

  return {
    userId: user.id,
    institutionId: user.institutionId,
    role: role as AgentContext['role'],
    permissions,
    sessionToken: session.session.token,
  };
}
```

---

## 7. PII Guard Design

File: `src/ai/security/piiGuard.ts`

```typescript
export const PII_FIELDS = [
  'phone',
  'dateOfBirth',
  'gender',
  'permanentAddress',
  'currentAddress',
  'educationDetails',
  'experienceDetails',
] as const;

export type PIIField = typeof PII_FIELDS[number];

/**
 * Strips PII fields from a single object or an array of objects.
 * Applied at the service boundary before returning any user data to the runtime.
 */
export function stripPII<T extends Record<string, unknown>>(
  obj: T
): Omit<T, PIIField> {
  const result = { ...obj };
  for (const field of PII_FIELDS) {
    delete (result as any)[field];
  }
  return result as Omit<T, PIIField>;
}

export function stripPIIArray<T extends Record<string, unknown>>(
  arr: T[]
): Omit<T, PIIField>[] {
  return arr.map(stripPII);
}
```

### AI-Safe Student DTO

```typescript
// The shape returned by ALL student-facing AI tools
export type AIStudent = {
  id: string;
  name: string | null;
  email: string;
  collegeId: string | null;
  collegeName: string | null;
  branch: string | null;
  year: number | null;
  totalScore: number;
  problemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  image: string | null;
  // PII fields are NEVER included
};
```

The `executor.ts` calls `stripPII()` on every tool result before storing it in `AIAgentAction.result` and before including it in the LLM message. This means even if a bug in a tool accidentally selects a PII column, the guard removes it before the data can propagate.

---

## 8. Tool Implementations — Key Examples

### 8.1 `getInactiveStudents`

File: `src/ai/tools/students/getInactiveStudents.ts`

**Input schema:** `{ classroomId: string, thresholdDays?: number }`

**Implementation:**

```typescript
export async function getInactiveStudentsImpl(
  args: { classroomId: string; thresholdDays?: number },
  ctx: AgentContext
): Promise<{ inactive: AIStudent[]; active: AIStudent[] }> {
  const threshold = args.thresholdDays ?? 14;
  const cutoff = new Date(Date.now() - threshold * 24 * 60 * 60 * 1000);

  // Scope: classroom must belong to this teacher (for TEACHER role)
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
    select: { id: true },
  });
  if (!classroom) throw new Error('Classroom not found or access denied');

  const students = await prisma.user.findMany({
    where: { enrolledClassrooms: { some: { id: classroom.id } } },
    select: {
      id: true, name: true, email: true, collegeId: true,
      collegeName: true, branch: true, year: true, totalScore: true,
      problemsSolved: true, currentStreak: true, longestStreak: true, image: true,
    },
  });

  // Find last submission per student in one batch query
  const lastSubmissions = await prisma.submission.groupBy({
    by: ['userId'],
    where: {
      userId: { in: students.map(s => s.id) },
      mode: 'SUBMIT',
    },
    _max: { createdAt: true },
  });

  const lastSubMap = new Map(
    lastSubmissions.map(r => [r.userId, r._max.createdAt])
  );

  const inactive: AIStudent[] = [];
  const active: AIStudent[] = [];

  for (const student of students) {
    const lastSub = lastSubMap.get(student.id);
    // Student is inactive if no submission ever, or last was before cutoff
    const isInactive = !lastSub || lastSub < cutoff;
    const safe = stripPII(student) as AIStudent;
    if (isInactive) inactive.push(safe);
    else active.push(safe);
  }

  return { inactive, active };
}
```

**Reuses:** Direct Prisma queries (scoped), `stripPII()` from piiGuard.

---

### 8.2 `importStudents` — File Import Flow

File: `src/ai/tools/imports/importStudents.ts`

The import is a two-phase operation:

**Phase 1 — Matching** (happens at upload time, before confirmation):

```typescript
// Called by POST /api/ai-agent/upload after parseFile()
export async function matchStudents(
  rows: ParsedRow[],
  classroomId: string,
  ctx: AgentContext
): Promise<MatchResult> {
  const matched: MatchedStudent[] = [];
  const ambiguous: AmbiguousRow[] = [];
  const notFound: ParsedRow[] = [];

  for (const row of rows) {
    const candidates: User[] = [];

    // Priority 1: exact collegeId match within institution
    if (row.collegeId) {
      const found = await prisma.user.findMany({
        where: { collegeId: row.collegeId, institutionId: ctx.institutionId },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      candidates.push(...found);
    }

    // Priority 2: email match (global unique)
    if (candidates.length === 0 && row.email) {
      const found = await prisma.user.findUnique({
        where: { email: row.email.toLowerCase() },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      if (found) candidates.push(found);
    }

    // Priority 3: name + collegeId combination
    if (candidates.length === 0 && row.name && row.collegeId) {
      const found = await prisma.user.findMany({
        where: {
          name: { contains: row.name, mode: 'insensitive' },
          collegeId: row.collegeId,
          institutionId: ctx.institutionId,
        },
        select: { id: true, name: true, email: true, collegeId: true },
      });
      candidates.push(...found);
    }

    if (candidates.length === 1) {
      matched.push({ row, user: candidates[0] });
    } else if (candidates.length > 1) {
      // NEVER auto-select — teacher must pick
      ambiguous.push({ row, candidates });
    } else {
      notFound.push(row);
    }
  }

  return { matched, ambiguous, notFound };
}
```

**Phase 2 — Enrollment** (executes after teacher confirmation via ConfirmationCard):

```typescript
export async function importStudentsImpl(
  args: { classroomId: string; userIds: string[] },
  ctx: AgentContext
): Promise<{ enrolled: number }> {
  // Verify classroom scope
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
  });
  if (!classroom) throw new Error('Classroom not found or access denied');

  // Single transaction: connect all matched users
  await prisma.$transaction(async (tx) => {
    await tx.classroom.update({
      where: { id: args.classroomId },
      data: { students: { connect: args.userIds.map(id => ({ id })) } },
    });
    // Onboard users to institution if they have no institutionId
    for (const uid of args.userIds) {
      await tx.user.updateMany({
        where: { id: uid, institutionId: null },
        data: { institutionId: ctx.institutionId },
      });
    }
  });

  return { enrolled: args.userIds.length };
}
```

**Job tracking:** If `userIds.length > 100`, an `AIAgentJob` with `type = FILE_IMPORT` is created first and enrollment runs in a fire-and-forget async handler updating `progress` every 10 rows.

---

### 8.3 `getClassroomTopicPerformance`

File: `src/ai/tools/analytics/getClassroomTopicPerformance.ts`

**Input schema:** `{ classroomId: string, studentId?: string }`

This tool wraps the existing `getTagMasteryAnalytics` from `actions/classroom-analytics.ts`, which already calls `getClassroomContext()` internally:

```typescript
export async function getClassroomTopicPerformanceImpl(
  args: { classroomId: string; studentId?: string },
  ctx: AgentContext
) {
  // If studentId provided, return per-student mastery for that student only
  if (args.studentId) {
    // Verify student is in a classroom belonging to this teacher/institution
    const enrollment = await prisma.classroom.findFirst({
      where: {
        id: args.classroomId,
        institutionId: ctx.institutionId,
        students: { some: { id: args.studentId } },
      },
    });
    if (!enrollment) throw new Error('Student not enrolled in this classroom');

    // Reuse getClassroomContext data pattern (same as classroom-analytics.ts)
    const { tagsMap, problemsMap } = await getClassroomContext(args.classroomId);
    // Filter submissions to this student only, compute per-tag mastery
    // ... (same computeTagMastery logic as in getTagMasteryAnalytics, scoped to studentId)
    return perStudentMastery;
  }

  // Classroom-wide: delegate to existing getTagMasteryAnalytics
  const result = await getTagMasteryAnalytics(args.classroomId);
  if (!result.success) throw new Error(result.error);

  // Tags already sorted ascending by averageMastery (as required by R9.1)
  return result.tags;
}
```

**Note:** `getTagMasteryAnalytics` and `getClassroomContext` are imported from `actions/classroom-analytics.ts`. The AI tool does **not** re-implement the mastery computation logic — it reuses the existing functions.

---

### 8.4 `createAssignment`

File: `src/ai/tools/assignments/createAssignment.ts`

**Input schema:** `{ classroomId: string, title: string, description?: string, dueDate?: string, problemIds: string[] }`

```typescript
export async function createAssignmentImpl(
  args: CreateAssignmentArgs,
  ctx: AgentContext
): Promise<{ assignmentId: string }> {
  // Double-check: beyond Permission_Layer, verify teacherId === ctx.userId
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      // For TEACHER: must own the classroom
      // For INSTITUTION_MANAGER: institution scope is sufficient
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
    select: { id: true },
  });

  if (!classroom) {
    throw new Error('Classroom not found or access denied');
  }

  // Delegate to existing createAssignment action (actions/assignment.ts)
  // which handles revalidateTag internally
  const result = await createAssignment(args.classroomId, {
    title: args.title,
    description: args.description,
    dueDate: args.dueDate ? new Date(args.dueDate) : undefined,
    problemIds: args.problemIds,
  });

  if (!result.success) throw new Error(result.error);
  return { assignmentId: result.assignmentId! };
}
```

**Note:** The existing `createAssignment` in `actions/assignment.ts` already verifies `classroom.teacherId !== session.user.id`. The AI tool adds a second check at the tool level before delegating, satisfying R10.5's double-verification requirement.

---

### 8.5 `generateClassReport`

File: `src/ai/tools/analytics/generateClassReport.ts`

**Input schema:** `{ classroomId: string }`

```typescript
export async function generateClassReportImpl(
  args: { classroomId: string },
  ctx: AgentContext
): Promise<ClassReport> {
  // Create job record first (tracked as REPORT_GENERATION)
  const job = await prisma.aIAgentJob.create({
    data: {
      institutionId: ctx.institutionId,
      userId: ctx.userId,
      type: 'REPORT_GENERATION',
      status: 'RUNNING',
      input: { classroomId: args.classroomId },
      progress: 0,
    },
  });

  try {
    // Run all 4 analytics functions in parallel
    // All 4 imported from actions/classroom-analytics.ts
    const [overview, risk, tagMastery, assignments] = await Promise.all([
      getOverviewAnalytics(args.classroomId),      // progress: 25%
      getRiskAnalytics(args.classroomId),           // progress: 50%
      getTagMasteryAnalytics(args.classroomId),     // progress: 75%
      getAssignmentAnalytics(args.classroomId),     // progress: 100%
    ]);

    // Check for errors in any analytics call
    if (!overview.success) throw new Error(`Overview failed: ${overview.error}`);
    if (!risk.success) throw new Error(`Risk failed: ${risk.error}`);
    if (!tagMastery.success) throw new Error(`TagMastery failed: ${tagMastery.error}`);
    if (!assignments.success) throw new Error(`Assignments failed: ${assignments.error}`);

    // Compute inactive student count from risk data
    const inactiveCount = risk.atRiskStudents.filter(s => s.riskScore >= 80).length;

    // Top 3 strongest and weakest tags (already sorted asc)
    const sortedTags = tagMastery.tags;
    const weakestTopics = sortedTags.slice(0, 3).map(t => t.tagName);
    const strongestTopics = sortedTags.slice(-3).reverse().map(t => t.tagName);

    // Overdue assignments
    const overdueCount = assignments.assignments.filter(a =>
      a.dueDate && new Date(a.dueDate) < new Date() && a.completionPercentage < 100
    ).length;

    const avgCompletion = assignments.assignments.length > 0
      ? Math.round(
          assignments.assignments.reduce((sum, a) => sum + a.completionPercentage, 0)
          / assignments.assignments.length
        )
      : 0;

    const report: ClassReport = {
      activeStudentCount: overview.studentCount - inactiveCount,
      inactiveStudentCount: inactiveCount,
      averageAssignmentCompletion: avgCompletion,
      strongestTopics,
      weakestTopics,
      overdueAssignmentCount: overdueCount,
      studentsNeedingAttention: risk.atRiskStudents.map(s => ({
        studentId: s.studentId,
        name: s.name,
        riskScore: s.riskScore,
        topFactors: s.topFactors,
      })),
    };

    // Update job to COMPLETED only after result is fully populated (R13.3)
    await prisma.aIAgentJob.update({
      where: { id: job.id },
      data: { status: 'COMPLETED', progress: 100, result: report as any },
    });

    return report;
  } catch (error) {
    // R13.3: set FAILED if result population fails
    await prisma.aIAgentJob.update({
      where: { id: job.id },
      data: { status: 'FAILED', errorMessage: String(error) } as any,
    });
    throw error;
  }
}
```

**Reuses:** `getOverviewAnalytics`, `getRiskAnalytics`, `getTagMasteryAnalytics`, `getAssignmentAnalytics` — all from `actions/classroom-analytics.ts`.

---

## 9. Confirmation Gate Flow

The confirmation gate is a full round-trip that pauses the agent turn.

```
1. LLM decides to call createClassroom({ name: "CS-A", section: "A", subject: "DSA" })

2. executor.ts:
   - Looks up TOOL_ACTION_TYPE_MAP['createClassroom'] → 'CREATE'
   - Calls createAction({
       toolName: 'createClassroom',
       actionType: 'CREATE',
       arguments: { name: "CS-A", section: "A", ... },
       status: 'PENDING',
       requiresApproval: true,
       institutionId: ctx.institutionId,
       userId: ctx.userId,
     })
   - Returns { type: 'approval_required', actionId, preview: args }

3. runtime.ts:
   - Receives approval_required signal
   - HALTS the tool call (does NOT execute createClassroom)
   - Constructs a special assistant message:
     {
       type: 'confirmation_required',
       actionId: 'cuid...',
       operation: 'CREATE_CLASSROOM',
       preview: { name: "CS-A", section: "A", subject: "DSA", institution: "VIT Vellore" }
     }
   - Streams this as the final response (not a text chunk — a JSON chunk)

4. Client (AIAgentPanel.tsx):
   - useChat hook receives the special JSON chunk
   - Renders ConfirmationCard with:
       Badge: "CREATE CLASSROOM"
       Preview data: Name, Section, Subject, Institution
       Two buttons: [Confirm ✓]  [Cancel ✗]
   - Input box is DISABLED while confirmation is pending

5a. Teacher clicks Confirm:
   - POST /api/ai-agent/approve { actionId }
   - Server:
       loads AIAgentAction by id
       verifies action.userId === session.user.id
       verifies action.status === 'PENDING' && action.requiresApproval === true
       sets approved = true, approvedAt = now()
       executes createClassroom(action.arguments, ctx)
       updateAction(SUCCESS, result)
   - Response: { success: true, result: { classroomId } }
   - Client appends a success message to chat

5b. Teacher clicks Cancel:
   - POST /api/ai-agent/cancel { actionId }
   - Server:
       loads AIAgentAction
       verifies ownership
       updateAction(CANCELLED)
   - Response: { success: true }
   - Client appends "Operation cancelled" to chat, re-enables input
```

**Preview data per operation type:**

| Operation | Preview Fields |
|---|---|
| CREATE_CLASSROOM | name, section, subject, institution |
| CREATE_ASSIGNMENT | title, dueDate, problems (title + difficulty + tags), classroom name |
| IMPORT_STUDENTS | matched list (name, collegeId, email), ambiguous count, not-found count |
| CREATE_QUIZ | title, question count, first 3 question previews, target classroom |
| ASSIGN_QUIZ | quiz title, classroom name |

---

## 10. Rate Limiter Design

File: `src/ai/security/rateLimiter.ts`

**Redis key pattern:** `ai:ratelimit:{userId}`

**Algorithm — Fixed Window:**

```typescript
export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  // Fail-closed: if Redis throws, block the request
  let client: Redis;
  try {
    client = getRedisClient(); // existing ioredis instance from lib/redis.ts
  } catch {
    return { allowed: false, reason: 'REDIS_UNAVAILABLE' };
  }

  const key = `ai:ratelimit:${userId}`;
  const now = Date.now();

  // Calculate seconds until the start of the next minute boundary
  const secondsToNextMinute = 60 - (Math.floor(now / 1000) % 60);

  let count: number;
  try {
    // Atomic increment
    count = await client.incr(key);

    // On first request in this window, set expiry to next minute boundary
    if (count === 1) {
      await client.expire(key, secondsToNextMinute);
    }
  } catch {
    // Redis command failed → fail-closed (R6.3)
    return { allowed: false, reason: 'REDIS_ERROR' };
  }

  if (count > 60) {
    return { allowed: false, reason: 'RATE_LIMIT_EXCEEDED', retryAfter: secondsToNextMinute };
  }

  return { allowed: true, remaining: 60 - count };
}
```

**Response codes:**
- `REDIS_UNAVAILABLE` or `REDIS_ERROR` → HTTP 503 "Service temporarily unavailable"
- `RATE_LIMIT_EXCEEDED` → HTTP 429 "Too many requests. Try again in `{retryAfter}` seconds"

---

## 11. File Upload Flow

File: `app/api/ai-agent/upload/route.ts`

```
POST /api/ai-agent/upload
Content-Type: multipart/form-data
Body: file=<binary>, classroomId=<string>

Steps:
1. Validate session → build AgentContext → check CLASSROOM_STUDENT_IMPORT permission

2. Parse multipart body using Request.formData()

3. Validate MIME type:
   Allowed: text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   Allowed extensions: .csv, .xlsx
   → reject with 400 if neither

4. Validate file size ≤ 5 MB (5 * 1024 * 1024 bytes)
   → reject with 413 if exceeded

5. Parse to rows array:
   CSV: papaparse.parse(text, { header: true, skipEmptyLines: true })
   XLSX: xlsx.read(buffer) → worksheet → xlsx.utils.sheet_to_json(ws)

6. Validate row count ≤ 1000
   → reject with 400 "File contains more than 1000 rows" if exceeded

7. Call matchStudents(rows, classroomId, ctx)
   → { matched, ambiguous, notFound }

8. Create AIAgentJob { type: FILE_IMPORT, status: PENDING, progress: 0 }
   (job is used if teacher subsequently confirms and row count > 100)

9. Return JSON:
   {
     jobId: string,
     summary: {
       matched: [ { userId, name, email, collegeId } ],
       ambiguous: [ { row, candidates: [ { id, name, email, collegeId } ] } ],
       notFound: [ { row } ],
       totalRows: number
     }
   }
```

No students are enrolled at this step. Enrollment only happens after teacher confirms via `ConfirmationCard` and `POST /api/ai-agent/approve` executes the `importStudents` tool.

---

## 12. Async Job Design

File: `app/api/ai-agent/jobs/[jobId]/route.ts`

### When Jobs Are Created

| Operation | Trigger Threshold | Job Type |
|---|---|---|
| File import | Always (created at upload time) | `FILE_IMPORT` |
| Report generation | Always (created in `generateClassReport`) | `REPORT_GENERATION` |

### Progress Updates

**For FILE_IMPORT (enrollment phase, > 100 rows):**

```typescript
// After confirmation, enrollment runs as:
queueMicrotask(async () => {
  for (let i = 0; i < userIds.length; i += 10) {
    const batch = userIds.slice(i, i + 10);
    await prisma.classroom.update({
      where: { id: classroomId },
      data: { students: { connect: batch.map(id => ({ id })) } },
    });
    const progress = Math.round(((i + 10) / userIds.length) * 100);
    await prisma.aIAgentJob.update({
      where: { id: jobId },
      data: { progress: Math.min(progress, 99) }, // 100 only when fully done
    });
  }
  await prisma.aIAgentJob.update({
    where: { id: jobId },
    data: { status: 'COMPLETED', progress: 100, result: { enrolled: userIds.length } },
  });
});
```

**For REPORT_GENERATION:** Progress is updated sequentially after each `Promise.all` resolves (25 → 50 → 75 → 100), but since all 4 calls run in parallel, `generateClassReport` uses a simpler approach: set to 50% after the Promise.all resolves, then to 100% when report is assembled.

### Polling Endpoint

```typescript
// GET /api/ai-agent/jobs/[jobId]
export async function GET(req: Request, { params }: { params: { jobId: string } }) {
  const session = await getSession();
  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const job = await prisma.aIAgentJob.findFirst({
    where: {
      id: params.jobId,
      userId: session.user.id, // scoped to owner
    },
    select: { id: true, type: true, status: true, progress: true, result: true, updatedAt: true },
  });

  if (!job) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json(job);
}
```

**Client polling:** The `AIAgentPanel` uses `setInterval` (polling every 2 seconds) for jobs reported in agent responses. It stops polling when `status === 'COMPLETED'` or `status === 'FAILED'`.

---

## 13. UI Component Design

### `AIAgentPanel.tsx`

```
Layout: fixed-width side panel (w-80 or w-96 depending on viewport)
Position: right side of dashboard, slides in/out with CSS transition
Toggle: Bot icon button in the dashboard header

Internal structure:
┌────────────────────────────────────┐
│  🤖 AI Copilot         [Close ×]  │
├────────────────────────────────────┤
│  ▸ Saved Queries (collapsible)     │
│    • Inactive Students             │
│    • Weak Topics Report            │
├────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │ Chat messages (scrollable)   │  │
│  │ ChatMessage (user)           │  │
│  │ ChatMessage (assistant)      │  │
│  │ ConfirmationCard (if pending)│  │
│  └──────────────────────────────┘  │
├────────────────────────────────────┤
│  [📎 Upload] [Input box ......] ▶ │
└────────────────────────────────────┘

State managed by useChat from 'ai/react':
  - messages: Message[]
  - input: string
  - handleSubmit: (e) => void
  - isLoading: boolean

Additional local state:
  - pendingActionId: string | null  (blocks input when confirmation is awaited)
  - jobPollingIds: string[]         (active job polls)
```

### `ChatMessage.tsx`

Renders a single message based on `message.role` and `message.content` shape:

- `role === 'user'`: right-aligned bubble
- `role === 'assistant'`, content is plain text: left-aligned bubble with markdown rendering
- `role === 'assistant'`, content is `{ type: 'confirmation_required' }`: renders `ConfirmationCard`
- `role === 'assistant'`, content is `{ type: 'job_progress' }`: renders a progress bar with polling

### `ConfirmationCard.tsx`

```
┌─────────────────────────────────────────┐
│  [CREATE CLASSROOM]  badge              │
│                                         │
│  Name:        CS-A                      │
│  Section:     A                         │
│  Subject:     Data Structures           │
│  Institution: VIT Vellore               │
│                                         │
│  [✓ Confirm]           [✗ Cancel]      │
└─────────────────────────────────────────┘
```

- Operation type badge: color-coded (green for CREATE, orange for IMPORT, red for DELETE)
- Preview data is rendered from `message.preview` — structured based on `message.operation`
- "Confirm" button: calls `POST /api/ai-agent/approve`, then calls `append()` to add a success message
- "Cancel" button: calls `POST /api/ai-agent/cancel`, appends "Operation cancelled" message
- While either button is loading: both are disabled, spinner shown
- Input box at bottom of `AIAgentPanel` is disabled while `pendingActionId !== null`

### `FileUploadZone.tsx`

- Drag-and-drop zone (react-dropzone or native HTML5 drag events)
- Accepts `.csv`, `.xlsx` only (MIME type check + extension check)
- Shows file name + size after selection
- On upload: calls `POST /api/ai-agent/upload`, then injects the match result as a user message into the chat (triggers ConfirmationCard for the import preview)
- Shows error inline if file is too large or wrong type

### `SavedQueryList.tsx`

- Fetches `AISavedQuery` list via `listSavedQueries` tool (or a direct API call on mount)
- Collapsible (closed by default)
- Each entry: query name + formatted date; click → calls `handleSubmit` with the stored query text
- Shows "No saved queries yet" empty state

---

## 14. Security Considerations

### Tenant Isolation

The most critical security property: `institutionId` is always sourced from the server-side session, never from LLM tool arguments. This is enforced in `tenantGuard.ts`:

```typescript
// tenantGuard.ts — injects safe fields before every tool call
export function buildSafeWhereClause(
  ctx: AgentContext,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    institutionId: ctx.institutionId,  // always from session, never from LLM
    ...overrides,
  };
}

export function assertTeacherOwnership(
  classroom: { teacherId: string },
  ctx: AgentContext
): void {
  if (ctx.role === 'TEACHER' && classroom.teacherId !== ctx.userId) {
    throw new Error('Access denied: teacher does not own this classroom');
  }
}
```

### PII Filtering

`stripPII()` is called by `executor.ts` on **all tool results** before:
1. Storing in `AIAgentAction.result`
2. Including in any `AIAgentMessage.content`
3. Returning to the LLM for context in multi-turn conversations

The PII fields are never selected in `AIStudent` queries at the Prisma layer either — defense in depth.

### Prompt Injection Protection

File: `src/ai/security/injectionGuard.ts`

```typescript
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|above|prior)\s+instructions?/i,
  /system\s*:/i,
  /\[INST\]/i,
  /\[\/INST\]/i,
  /<\|im_start\|>/i,
  /\bforget\s+(everything|all)\b/i,
  /\byou\s+are\s+now\b/i,
  /\bact\s+as\b/i,
  /override\s+(system\s+)?prompt/i,
  /disregard\s+(your\s+)?(previous\s+)?instructions?/i,
];

export function sanitize(input: string): string {
  // Strip control characters
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

export function detectInjection(input: string): boolean {
  return INJECTION_PATTERNS.some(p => p.test(input));
}
```

The runtime calls `sanitize()` first, then `detectInjection()` on the sanitized string. If injection is detected, the runtime logs a `SECURITY_EVENT` action and returns a warning without forwarding to the LLM. The **sanitized** message (with injection removed) is stored in `AIAgentMessage` for auditability.

### Audit Logging

Every tool call produces an `AIAgentAction` record with:
- Pre-execution state: `PENDING`, full `arguments` snapshot
- Post-execution state: `SUCCESS` + `result` or `FAILED` + `errorMessage`
- Immutable: `createdAt` is never updated; only status fields are mutable

### Rate Limiting

Fail-closed behavior (R6.3): if `ioredis` throws any error (connection refused, timeout, READONLY, etc.), `checkRateLimit` returns `{ allowed: false, reason: 'REDIS_ERROR' }` and the API route returns HTTP 503. This prevents Redis failure from becoming an open door to unlimited LLM calls.

---

## 15. Requirements Traceability

| Requirement | Implementing Component(s) |
|---|---|
| **R1** AI Agent Embedding | `AIAgentPanel.tsx`, `app/api/ai-agent/route.ts`, `AIAgentConversation` model, `runtime.ts` (conversation persistence) |
| **R2** Tenant Isolation + RBAC | `src/ai/security/permissions.ts` (TOOL_PERMISSION_MAP), `src/ai/security/tenantGuard.ts`, `src/ai/agent/executor.ts` (permission check), `buildAgentContext()` in API route |
| **R3** PII Filtering | `src/ai/security/piiGuard.ts` (stripPII), `AIStudent` DTO, all student tools select only safe fields, executor calls stripPII on all results |
| **R4** Audit Logging | `src/ai/audit/logAction.ts` (createAction / updateAction), `AIAgentAction` model, executor.ts wraps every tool call |
| **R5** Confirmation Gate | `src/ai/agent/executor.ts` (requiresApproval logic), `app/api/ai-agent/approve/route.ts`, `app/api/ai-agent/cancel/route.ts`, `ConfirmationCard.tsx` |
| **R6** Rate Limiting | `src/ai/security/rateLimiter.ts`, `app/api/ai-agent/route.ts` (calls checkRateLimit before LLM) |
| **R7** CSV/XLSX File Import | `app/api/ai-agent/upload/route.ts`, `src/ai/tools/imports/parseFile.ts`, `src/ai/tools/imports/matchStudents.ts`, `src/ai/tools/imports/importStudents.ts`, `FileUploadZone.tsx` |
| **R8** Student Activity Analytics | `src/ai/tools/students/getInactiveStudents.ts`, `getStudentSubmissions.ts`, `getStudentProgress.ts`, `identifyStudentsNeedingAttention.ts` |
| **R9** Topic/Weakness Analysis | `src/ai/tools/analytics/getClassroomTopicPerformance.ts` (wraps `getTagMasteryAnalytics` from `actions/classroom-analytics.ts`), `src/ai/tools/assignments/searchProblems.ts` |
| **R10** Assignment Management | `src/ai/tools/assignments/searchProblems.ts`, `createAssignment.ts` (wraps `actions/assignment.ts#createAssignment`), `getAssignmentPerformance.ts` (wraps `actions/assignment.ts#getTeacherAssignmentAnalytics`) |
| **R11** Classroom Management | `src/ai/tools/classrooms/createClassroom.ts` (wraps `actions/classroom.ts#createClassroom`), `listClassrooms.ts` (wraps `getTeacherClassrooms`/`getInstitutionClassrooms`), `getClassroomStudents.ts` (wraps `getClassroomWithStudents`) |
| **R12** Quiz Support | `src/ai/tools/quizzes/createQuiz.ts` (wraps `actions/quiz-templates.ts#createQuizTemplate`), `assignQuizToClassroom.ts` (wraps `actions/quiz-templates.ts#assignQuizToClassroom`) |
| **R13** Report Generation | `src/ai/tools/analytics/generateClassReport.ts` (composes `getOverviewAnalytics`, `getRiskAnalytics`, `getTagMasteryAnalytics`, `getAssignmentAnalytics` from `actions/classroom-analytics.ts`), `AIAgentJob` tracking |
| **R14** Saved AI Queries | `src/ai/tools/savedQueries/saveQuery.ts`, `listSavedQueries.ts`, `runSavedQuery.ts`, `AISavedQuery` model, `SavedQueryList.tsx` |
| **R15** Contest Analytics (Restricted) | `src/ai/tools/contest/getContestAnalytics.ts`, `CONTEST_ANALYTICS_READ` permission in `permissions.ts`, strip `blockReason`/`sessionId`/`ipAddress` in tool result |
| **R16** Async Job Tracking | `AIAgentJob` model, `src/ai/tools/jobs/getJobStatus.ts`, `app/api/ai-agent/jobs/[jobId]/route.ts`, progress updates in `generateClassReport.ts` and `importStudents.ts` |
| **R17** Prompt Injection Protection | `src/ai/security/injectionGuard.ts` (sanitize + detectInjection), `runtime.ts` checks before forwarding to LLM, `SECURITY_EVENT` action log in `executor.ts` |
| **R18** New DB Models | `prisma/schema.prisma` additions: `AIAgentConversation`, `AIAgentMessage`, `AIAgentAction`, `AIAgentJob`, `AISavedQuery`, all 5 new enums |

## Correctness Properties

These are the invariants that must hold at all times, regardless of LLM output or user input:

### Property 1: Tenant Isolation
For any tool invocation, the `institutionId` used in every Prisma `where` clause equals `AgentContext.institutionId` derived from the server-side session. No LLM-supplied `institutionId` argument is ever used directly.

**Validates: Requirements 2.1, 2.4**

### Property 2: Teacher Ownership
For any write tool call by a `TEACHER` role, the target classroom's `teacherId` field equals `AgentContext.userId`. A teacher cannot create assignments or import students into another teacher's classroom.

**Validates: Requirements 2.3, 10.5**

### Property 3: PII Absence
The result of `stripPII(obj)` never contains any of `phone`, `dateOfBirth`, `gender`, `permanentAddress`, `currentAddress`, `educationDetails`, `experienceDetails`. This holds for all inputs regardless of additional fields present.

**Validates: Requirements 3.1, 3.2**

### Property 4: Approval Gate
For any tool with `actionType !== READ`, the tool function is never called unless `AIAgentAction.approved === true` and `AIAgentAction.approvedAt` is set.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 5: Audit Completeness
For every tool call that reaches `executor.ts`, an `AIAgentAction` record exists with a non-null `createdAt` and a `status` that is not `PENDING` by the time the API response is returned (unless the call is awaiting approval).

**Validates: Requirements 4.1, 4.2, 4.3**

### Property 6: Rate Limit Fail-Closed
If Redis is unavailable (any `ioredis` error), `checkRateLimit` returns `{ allowed: false }` — it never returns `{ allowed: true }` when Redis cannot be reached.

**Validates: Requirements 6.2, 6.3**

### Property 7: Job Completion Ordering
An `AIAgentJob` is set to `status = COMPLETED` only after its `result` field is fully populated. A job with `status = COMPLETED` and `result = null` is an invalid state.

**Validates: Requirements 16.3, 13.3**

### Property 8: Injection Isolation
A user message containing any of the injection patterns defined in `injectionGuard.ts` never reaches the LLM. Only the sanitized message is forwarded.

**Validates: Requirements 17.1, 17.2, 17.3**

---

## Appendix: Key External Functions Reused

The AI tools are intentionally thin wrappers that delegate to existing, tested service functions:

| Tool | Existing Function | Source File |
|---|---|---|
| `getClassroomTopicPerformance` | `getTagMasteryAnalytics` | `actions/classroom-analytics.ts` |
| `generateClassReport` | `getOverviewAnalytics`, `getRiskAnalytics`, `getTagMasteryAnalytics`, `getAssignmentAnalytics` | `actions/classroom-analytics.ts` |
| `listClassrooms` (teacher) | `getTeacherClassrooms` | `actions/classroom.ts` |
| `listClassrooms` (admin) | `getInstitutionClassrooms` | `actions/classroom.ts` |
| `getClassroomStudents` | `getClassroomWithStudents` | `actions/classroom.ts` |
| `createClassroom` | `createClassroom` | `actions/classroom.ts` |
| `createAssignment` | `createAssignment` | `actions/assignment.ts` |
| `getAssignmentPerformance` | `getTeacherAssignmentAnalytics` | `actions/assignment.ts` |
| `createQuiz` | `createQuizTemplate` | `actions/quiz-templates.ts` |
| `assignQuizToClassroom` | `assignQuizToClassroom` | `actions/quiz-templates.ts` |
| `getClassroomTopicPerformance` (context) | `getClassroomContext` (private helper) | `actions/classroom-analytics.ts` |

Functions that do **not** yet exist and will be created as part of this feature:
- All `src/ai/**` files (runtime, executor, security, tools, audit)
- `app/api/ai-agent/**` routes
- `app/(main)/dashboard/_components/AIAgent*.tsx` components

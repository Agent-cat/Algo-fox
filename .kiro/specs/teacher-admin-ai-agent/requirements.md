# Requirements Document

## Introduction

This feature adds an AI Copilot agent to both the teacher and institution-manager (admin) dashboards of the Algo-fox platform. The agent enables teachers and institution managers to query student analytics, manage classrooms and assignments, run CSV imports, generate reports, and create quizzes through a conversational interface. All operations are routed through a permission-and-security layer before touching any Prisma service, ensuring strict tenant isolation, RBAC enforcement, PII filtering, confirmation gates on write operations, and a full audit trail.

## Glossary

- **AI_Agent**: The conversational AI copilot embedded in teacher and institution-manager dashboards.
- **Agent_Runtime**: The server-side orchestration layer that receives user messages, selects tools, enforces security, and returns responses.
- **Permission_Layer**: The code-level guard that maps the caller's session role to an allowed set of AI tool permissions before any tool executes.
- **AI_Tool**: A discrete, named server-side function callable by the Agent_Runtime (e.g., `searchStudents`, `createAssignment`).
- **Conversation**: A persisted chat session stored in `AIAgentConversation`, scoped to one user and optionally one classroom.
- **Message**: A single turn stored in `AIAgentMessage`; role is one of USER, ASSISTANT, TOOL, or SYSTEM.
- **Action**: A record stored in `AIAgentAction` representing one AI_Tool invocation — the full audit log entry.
- **Job**: An asynchronous task stored in `AIAgentJob` for long-running operations (e.g., bulk file import, report generation).
- **Saved_Query**: A user-defined shortcut stored in `AISavedQuery` pointing to a named conversational query or tool configuration.
- **Teacher**: A platform user with role `TEACHER`; scoped to their own classrooms.
- **Institution_Manager**: A platform user with role `INSTITUTION_MANAGER`; scoped to all classrooms within their institution.
- **Tenant**: An `Institution` record; all AI operations are implicitly scoped to the caller's `institutionId` from the server-side session.
- **PII_Fields**: The User model fields `phone`, `dateOfBirth`, `gender`, `permanentAddress`, `currentAddress`, `educationDetails`, and `experienceDetails` — never returned by any AI_Tool.
- **Confirmation_Gate**: A UI prompt shown to the teacher before any write AI_Tool executes; the agent waits for explicit approval.
- **File_Import**: An operation triggered by uploading a CSV or XLSX file containing student data.
- **Inactivity_Threshold**: A configurable number of days (default 14) after which a student is considered inactive.
- **Weak_Topic**: A topic tag for which a student's or classroom's mastery score falls below 40 out of 100.
- **CONTEST_ANALYTICS_READ**: A code-level permission required to access contest violation and flag data; not granted by default to all teachers.
- **Tool_Permission**: A code-level string constant (e.g., `STUDENT_READ`, `ASSIGNMENT_CREATE`) that the Permission_Layer checks before executing an AI_Tool.

---

## Requirements

### Requirement 1: AI Agent Embedding

**User Story:** As a teacher or institution manager, I want an AI copilot panel embedded in my dashboard, so that I can interact with student data and perform management tasks without leaving the dashboard.

#### Acceptance Criteria

1. THE AI_Agent SHALL be embedded in both the teacher dashboard and the institution-manager dashboard as a persistent side panel or modal interface.
2. WHEN a teacher opens the AI_Agent, THE AI_Agent SHALL display only classrooms and students belonging to that teacher's own classrooms, and SHALL prevent access to any institution-wide classroom or student data.
3. WHEN an institution manager opens the AI_Agent, THE AI_Agent SHALL display classrooms and students scoped to the institution manager's institution.
4. THE AI_Agent SHALL persist conversation history across page refreshes by loading from `AIAgentConversation` records scoped to the authenticated user.
5. THE AI_Agent SHALL support multi-turn conversation: each new user message is appended to the active Conversation as an `AIAgentMessage` with role USER before the Agent_Runtime processes it, and IF the message fails to append due to a database or network error, THEN THE Agent_Runtime SHALL block processing and return an error to the user.

---

### Requirement 2: Tenant Isolation and Permission Enforcement

**User Story:** As a platform operator, I want strict tenant isolation and role-based access control on all AI operations, so that no teacher or agent can read or write data outside their authorized scope.

#### Acceptance Criteria

1. THE Permission_Layer SHALL derive the caller's `institutionId` exclusively from the server-side session; the `institutionId` value SHALL never be accepted from the LLM's tool call arguments.
2. WHEN the Permission_Layer evaluates a tool call, THE Permission_Layer SHALL reject the call with a permission error if the caller's session role does not include the required Tool_Permission for that AI_Tool.
3. WHILE a teacher session is active, THE Permission_Layer SHALL restrict all classroom-scoped AI_Tool calls to classrooms where `classroom.teacherId` equals the session user's id.
4. WHILE an institution manager session is active, THE Permission_Layer SHALL restrict all AI_Tool calls to resources where `institutionId` equals the session user's `institutionId`.
5. THE Permission_Layer SHALL grant Teachers the following Tool_Permissions: `STUDENT_READ`, `STUDENT_PROGRESS_READ`, `SUBMISSION_READ`, `CLASSROOM_READ`, `ASSIGNMENT_READ`, `ASSIGNMENT_CREATE`, `ASSIGNMENT_ASSIGN`, `CLASSROOM_CREATE`, `CLASSROOM_STUDENT_IMPORT`, `ANALYTICS_READ`, `PROBLEM_READ`, `QUIZ_READ`, `QUIZ_CREATE`.
6. THE Permission_Layer SHALL grant Institution_Managers all Teacher Tool_Permissions plus institution-wide analytics and teacher performance access.
7. IF a tool call requires `CONTEST_ANALYTICS_READ` and the caller's session does not carry that permission, THEN THE Permission_Layer SHALL reject the call with a permission-denied error.
8. THE Permission_Layer SHALL log every rejection as an `AIAgentAction` record with `status` set to `PERMISSION_DENIED`; IF the logging mechanism itself fails, THEN THE Permission_Layer SHALL proceed with the rejection without retrying the log write.

---

### Requirement 3: PII Filtering

**User Story:** As a platform operator, I want PII fields permanently excluded from all AI tool responses, so that sensitive personal data is never exposed through the AI interface.

#### Acceptance Criteria

1. THE AI_Agent SHALL never return the PII_Fields (`phone`, `dateOfBirth`, `gender`, `permanentAddress`, `currentAddress`, `educationDetails`, `experienceDetails`) in any AI_Tool response payload.
2. THE Agent_Runtime SHALL strip PII_Fields from any database query result before including that result in an `AIAgentMessage` or returning it to the LLM.
3. IF a user prompt explicitly requests a PII_Field by name, THEN THE AI_Agent SHALL respond with a message stating that the requested field is not available through the AI interface.

---

### Requirement 4: Audit Logging

**User Story:** As a platform operator, I want a complete audit log of every AI tool invocation, so that I can review what actions were taken, by whom, and with what outcome.

#### Acceptance Criteria

1. THE Agent_Runtime SHALL create an `AIAgentAction` record for every AI_Tool invocation before executing the tool, capturing `toolName`, `actionType`, `arguments`, `institutionId`, `userId`, `conversationId`, and `status` set to `PENDING`.
2. WHEN an AI_Tool completes successfully, THE Agent_Runtime SHALL update the corresponding `AIAgentAction` record with `status` set to `SUCCESS` and the `result` field populated.
3. IF an AI_Tool fails with an error, THEN THE Agent_Runtime SHALL update the corresponding `AIAgentAction` record with `status` set to `FAILED` and the `errorMessage` field populated.
4. WHEN a write AI_Tool requires approval, THE Agent_Runtime SHALL set `requiresApproval` to `true` on the `AIAgentAction` record and SHALL NOT execute the tool until `approved` is set to `true` with an `approvedAt` timestamp.
5. THE Agent_Runtime SHALL store `AIAgentAction` records with immutable `createdAt` timestamps; once written, audit records SHALL NOT be deleted or modified except to update mutable status fields (`status`, `result`, `approved`, `approvedAt`, `errorMessage`).

---

### Requirement 5: Confirmation Gate for Write Operations

**User Story:** As a teacher, I want the agent to preview every write operation and wait for my explicit confirmation before executing it, so that I can review what will be created or changed before it takes effect.

#### Acceptance Criteria

1. WHEN the AI_Agent determines that a tool call has `actionType` CREATE, UPDATE, DELETE, IMPORT, or EXPORT, THE AI_Agent SHALL display a structured preview of the planned operation to the user before executing it.
2. WHILE waiting for teacher confirmation on a write operation, THE AI_Agent SHALL not execute the tool and SHALL display the pending state visually.
3. WHEN the teacher confirms a pending write operation, THE Agent_Runtime SHALL set `approved = true` and `approvedAt` on the corresponding `AIAgentAction` and then execute the tool.
4. WHEN the teacher cancels a pending write operation, THE Agent_Runtime SHALL set `status = CANCELLED` on the corresponding `AIAgentAction` and SHALL discard the tool call.
5. IF the AI_Agent proposes creating a classroom, THEN THE AI_Agent SHALL preview the classroom name, section, subject, and institution before requesting confirmation.
6. IF the AI_Agent proposes creating an assignment, THEN THE AI_Agent SHALL preview the assignment title, due date, problem list (titles, difficulties, topic tags), and target classroom before requesting confirmation.
7. IF the AI_Agent proposes importing students from a file, THEN THE AI_Agent SHALL preview the matched student list (name, collegeId, email) and unmatched row count before requesting confirmation.

---

### Requirement 6: Rate Limiting on AI Tool Calls

**User Story:** As a platform operator, I want rate limiting on AI tool calls, so that no single user can exhaust backend resources through excessive agent requests.

#### Acceptance Criteria

1. THE Agent_Runtime SHALL enforce a per-user rate limit of no more than 60 AI_Tool invocations per minute.
2. IF a user exceeds the rate limit, THEN THE AI_Agent SHALL respond with a rate-limit message and SHALL NOT execute further tool calls until the rate limit window resets, and SHALL block tool calls even if the window resets simultaneously with the incoming request.
3. THE Agent_Runtime SHALL track rate-limit counters using Redis with a sliding or fixed window of 60 seconds; IF Redis is unavailable, THEN THE Agent_Runtime SHALL block all AI_Tool calls and return an error until Redis connectivity is restored.

---

### Requirement 7: CSV / XLSX File Import

**User Story:** As a teacher, I want to upload a CSV or XLSX file of student data and have the agent match those students to existing records, so that I can bulk-import students into a classroom.

#### Acceptance Criteria

1. THE AI_Agent SHALL accept CSV and XLSX file uploads with a maximum file size of 5 MB and a maximum of 1,000 data rows per upload.
2. IF a file is uploaded with an unsupported MIME type or extension, THEN THE AI_Agent SHALL reject the file and return a descriptive error message without processing any rows.
3. WHEN a valid file is uploaded, THE AI_Agent SHALL parse each row and attempt to match each row against existing `User` records using `collegeId`, `email`, or the combination of `name` and `collegeId`.
4. WHEN a row matches exactly one `User` record, THE AI_Agent SHALL include that student in the confirmed match list.
5. WHEN a row matches multiple `User` records, THE AI_Agent SHALL present those candidate records to the teacher and SHALL require the teacher to select the correct match before proceeding.
6. THE AI_Agent SHALL never auto-select a match when a row is ambiguous; teacher confirmation is always required for ambiguous rows.
7. WHEN a row matches no `User` record, THE AI_Agent SHALL include that row in an unmatched list and report it to the teacher.
8. WHEN the teacher confirms the matched student list, THE `importStudents` tool SHALL enroll the confirmed students into the specified classroom in a single database transaction.
9. THE File_Import operation SHALL be tracked as an `AIAgentJob` with `type = FILE_IMPORT`; the job `progress` field SHALL be updated as rows are processed.

---

### Requirement 8: Student Activity and Analytics

**User Story:** As a teacher, I want to query student activity and progress data through the agent, so that I can identify inactive or struggling students quickly.

#### Acceptance Criteria

1. WHEN a teacher asks for inactive students in a classroom, THE `getInactiveStudents` tool SHALL return all students whose last submission `createdAt` is older than the Inactivity_Threshold, defaulting to 14 days, and SHALL explicitly mark students whose last submission is within the threshold as not inactive.
2. WHERE the teacher specifies a custom Inactivity_Threshold in days, THE `getInactiveStudents` tool SHALL use that value instead of the 14-day default.
3. WHEN a teacher asks for recent submissions for a student, THE `getStudentSubmissions` tool SHALL return submissions including problem title, submission status, and `createdAt` date, ordered by `createdAt` descending.
4. THE `getStudentSubmissions` tool SHALL never return submission `code` fields to the AI_Agent response.
5. WHEN a teacher asks for a student's progress, THE `getStudentProgress` tool SHALL return `totalScore`, `problemsSolved`, `currentStreak`, `longestStreak`, and assignment completion rate for that student.
6. WHEN a teacher asks to identify students needing attention, THE `identifyStudentsNeedingAttention` tool SHALL return students who are both inactive (exceeding Inactivity_Threshold) and have at least one Weak_Topic.

---

### Requirement 9: Topic and Weakness Analysis

**User Story:** As a teacher, I want the agent to analyze classroom and individual performance by topic tag, so that I can understand which topics need more focus.

#### Acceptance Criteria

1. WHEN a teacher asks for classroom topic performance, THE `getClassroomTopicPerformance` tool SHALL return a list of topic tags with average mastery scores across all enrolled students, sorted by ascending mastery score.
2. WHEN a teacher asks for a student's weak topics, THE `getClassroomTopicPerformance` tool SHALL support filtering by a single student ID to return that student's per-topic mastery scores.
3. THE `getClassroomTopicPerformance` tool SHALL only consider `topicTags` from `Problem` records linked to that classroom's assignments (reusing the existing `getClassroomContext` data pattern).
4. WHEN a teacher asks to filter problems by topic tag, THE `searchProblems` tool SHALL accept one or more topic tag names and return matching `Problem` records including `id`, `title`, `difficulty`, and `topicTags`.

---

### Requirement 10: Assignment Management

**User Story:** As a teacher, I want the agent to help me create and assign practice and personalized assignments, so that I can efficiently target student learning gaps.

#### Acceptance Criteria

1. WHEN a teacher asks the agent to create an assignment with specific criteria (topic tags, difficulty, problem count), THE `searchProblems` tool SHALL first search for matching problems and return a preview list to the teacher.
2. WHEN the teacher confirms the problem list via the Confirmation_Gate, THE `createAssignment` tool SHALL create the assignment in the classroom with the confirmed problem IDs, title, and optional due date, and the assignment record SHALL be persisted before the response is returned to the teacher.
3. WHEN a teacher asks for a personalized assignment targeting students weak in a topic, THE AI_Agent SHALL identify those students using `getClassroomTopicPerformance`, select suitable problems using `searchProblems`, preview the assignment, and require confirmation before calling `createAssignment`.
4. WHEN a teacher asks for assignment performance, THE `getAssignmentPerformance` tool SHALL return per-student completion status, score, and overdue status for a given assignment.
5. THE `createAssignment` tool SHALL verify that the caller's session `userId` matches `classroom.teacherId` before creating the assignment, and SHALL block the assignment creation unless both the Permission_Layer approves the call and the teacher actually owns the classroom.

---

### Requirement 11: Classroom Management

**User Story:** As a teacher or institution manager, I want the agent to help me create and inspect classrooms, so that I can manage my institution's classroom structure efficiently.

#### Acceptance Criteria

1. WHEN a teacher asks the agent to create a classroom, THE `createClassroom` tool SHALL preview the classroom name, section, subject, and institution to the teacher and require Confirmation_Gate approval before execution.
2. WHEN the teacher confirms classroom creation, THE `createClassroom` tool SHALL create the classroom using the caller's `userId` as `teacherId` and the session-derived `institutionId`.
3. WHEN a teacher asks to list classrooms, THE `getClassroomStudents` tool (used via a classroom-list variant) or a dedicated list query SHALL return all classrooms belonging to that teacher including student count, subject, and section.
4. WHEN an institution manager asks to list all classrooms, THE Agent_Runtime SHALL return all classrooms scoped to the institution manager's `institutionId`.
5. WHEN a teacher asks for classroom details or roster, THE `getClassroomStudents` tool SHALL return enrolled student names, `collegeId`, `branch`, `year`, `totalScore`, and `problemsSolved` — excluding PII_Fields.

---

### Requirement 12: Quiz Support

**User Story:** As a teacher, I want the agent to help me create quiz templates and assign them to classrooms, so that I can quickly set up assessments without manually navigating the quiz UI.

#### Acceptance Criteria

1. WHEN a teacher asks the agent to create a quiz on a given topic, THE `createQuiz` tool SHALL generate a `QuizTemplate` with questions, preview the question list to the teacher, and require Confirmation_Gate approval before persisting.
2. WHEN a teacher confirms quiz creation, THE `createQuiz` tool SHALL call the existing `createQuizTemplate` service function to persist the `QuizTemplate` and its questions.
3. WHEN a teacher asks to assign a quiz to a classroom, THE Agent_Runtime SHALL use the `assignQuizToClassroom` service function and SHALL require Confirmation_Gate approval before the assignment is created.
4. IF a teacher attempts to assign a quiz to a classroom they do not own, THEN THE Permission_Layer SHALL reject the call with an authorization error.

---

### Requirement 13: Report Generation

**User Story:** As a teacher or institution manager, I want the agent to generate classroom summary reports, so that I can get a comprehensive view of classroom health without running multiple queries manually.

#### Acceptance Criteria

1. WHEN a teacher asks for a classroom report, THE `generateClassReport` tool SHALL return active student count, inactive student count, average assignment completion percentage, top 3 strongest topic tags, top 3 weakest topic tags, overdue assignment count, and students-needing-attention list.
2. THE `generateClassReport` tool SHALL derive the report data by composing existing analytics functions (`getOverviewAnalytics`, `getRiskAnalytics`, `getTagMasteryAnalytics`, `getAssignmentAnalytics`) rather than issuing raw Prisma queries directly.
3. THE `generateClassReport` job SHALL be tracked as an `AIAgentJob` with `type = REPORT_GENERATION`; the job `status` SHALL be set to `COMPLETED` only after the `result` field is fully populated, and SHALL be set to `FAILED` if result population fails.

---

### Requirement 14: Saved AI Queries

**User Story:** As a teacher, I want to save frequently-used agent queries as named shortcuts, so that I can quickly re-run common queries like "Inactive Students" or "Weak Topics" without re-typing them.

#### Acceptance Criteria

1. WHEN a teacher asks the AI_Agent to save the current query, THE AI_Agent SHALL create an `AISavedQuery` record with the teacher's `userId`, `institutionId`, a user-provided name, and the query text.
2. WHEN a teacher asks to run a saved query by name, THE AI_Agent SHALL load the corresponding `AISavedQuery` record and submit the stored query text as a new user message.
3. THE AI_Agent SHALL list all saved queries belonging to the authenticated user when asked, displaying the query name and creation date.
4. WHEN a teacher attempts to save a query and the provided name already exists for that user, THE AI_Agent SHALL ask the teacher whether to overwrite the existing saved query before updating the record.

---

### Requirement 15: Contest Analytics (Restricted)

**User Story:** As an authorized teacher, I want the agent to show contest violation and flag data for students, so that I can review academic integrity concerns.

#### Acceptance Criteria

1. WHEN a teacher with `CONTEST_ANALYTICS_READ` permission asks for students flagged during a contest, THE AI_Agent SHALL return `tabSwitchCount`, `fullscreenExitCount`, `totalViolations`, and `isFlagged` from `ContestParticipation` records for students in that teacher's classroom.
2. IF a teacher without `CONTEST_ANALYTICS_READ` permission requests contest analytics, THEN THE Permission_Layer SHALL reject the call and THE AI_Agent SHALL respond that this feature requires special authorization.
3. WHEN the contest analytics call succeeds and data is returned, THE Agent_Runtime SHALL strip the `blockReason`, `sessionId`, and `ipAddress` fields from the `ContestParticipation` result before including it in any response.

---

### Requirement 16: Asynchronous Job Tracking

**User Story:** As a teacher, I want long-running agent operations to run asynchronously with progress tracking, so that the UI remains responsive during bulk imports or report generation.

#### Acceptance Criteria

1. WHEN an AI_Tool operation is expected to take longer than 5 seconds (e.g., File_Import with more than 100 rows), or WHEN a REPORT_GENERATION job actually takes longer than 5 seconds, THE Agent_Runtime SHALL create an `AIAgentJob` record and return the job ID to the AI_Agent immediately.
2. WHILE an `AIAgentJob` is in progress, THE Agent_Runtime SHALL update the `progress` field (0–100) as work completes.
3. WHEN an `AIAgentJob` completes, THE Agent_Runtime SHALL set `status` to `COMPLETED` only after the `result` field is fully populated; an `AIAgentJob` SHALL NOT be considered complete until the `result` is available.
4. IF an `AIAgentJob` fails, THEN THE Agent_Runtime SHALL update `status` to `FAILED` and store the error detail.
5. WHEN a teacher asks for the status of a running job, THE AI_Agent SHALL read the current `AIAgentJob` record and return the `status`, `progress`, and partial `result` if available.

---

### Requirement 17: Prompt Injection Protection

**User Story:** As a platform operator, I want the Agent_Runtime to detect and block prompt injection attempts, so that users cannot manipulate the agent into bypassing security controls.

#### Acceptance Criteria

1. THE Agent_Runtime SHALL sanitize every incoming user message by stripping or escaping control sequences that attempt to override system prompts or tool permissions before passing the message to the LLM.
2. IF the Agent_Runtime detects a prompt injection pattern in a user message, THEN THE AI_Agent SHALL respond with a warning message and SHALL NOT forward the injection attempt to the LLM; similar warnings SHALL also be issued for other security violations such as malformed requests and rate-limit overruns when appropriate.
3. THE Agent_Runtime SHALL log all detected injection attempts as `AIAgentAction` records with `toolName = SECURITY_EVENT` and `status = BLOCKED`.
4. THE Agent_Runtime SHALL always forward sanitized messages to the LLM, trusting that sanitization has removed all risks from the original input.

---

### Requirement 18: New Database Models

**User Story:** As a developer, I want the AI agent's conversation, message, action, job, and saved-query data stored in well-structured database models, so that the system has a reliable and queryable audit trail and state store.

#### Acceptance Criteria

1. THE system SHALL add an `AIAgentConversation` model with fields: `id`, `institutionId`, `userId`, `title`, `classroomId` (optional), `context` (JSON), `messages` (relation), `actions` (relation), `createdAt`, `updatedAt`.
2. THE system SHALL add an `AIAgentMessage` model with fields: `id`, `conversationId`, `role` (enum: USER, ASSISTANT, TOOL, SYSTEM), `content`, `toolName` (optional), `toolCallId` (optional), `metadata` (JSON), `createdAt`.
3. THE system SHALL add an `AIAgentAction` model with fields: `id`, `conversationId`, `institutionId`, `userId`, `toolName`, `actionType` (enum: READ, CREATE, UPDATE, DELETE, IMPORT, EXPORT), `arguments` (JSON), `result` (JSON), `status` (enum: PENDING, SUCCESS, FAILED, CANCELLED, PERMISSION_DENIED, BLOCKED), `requiresApproval` (Boolean), `approved` (Boolean), `approvedAt` (optional DateTime), `errorMessage` (optional), `createdAt`, `updatedAt`.
4. THE system SHALL add an `AIAgentJob` model with fields: `id`, `institutionId`, `userId`, `type` (enum: FILE_IMPORT, CLASS_ANALYSIS, REPORT_GENERATION, BULK_ASSIGNMENT, BULK_ENROLLMENT), `status` (enum: PENDING, RUNNING, COMPLETED, FAILED), `input` (JSON), `result` (JSON optional), `progress` (Int 0–100), `createdAt`, `updatedAt`.
5. THE system SHALL add an `AISavedQuery` model with fields: `id`, `institutionId`, `userId`, `name`, `query`, `config` (JSON optional), `createdAt`, `updatedAt`.
6. THE `AIAgentConversation` model SHALL have a composite index on `[userId, createdAt]` and a single-column index on `institutionId`.
7. THE `AIAgentAction` model SHALL have indexes on `[institutionId, createdAt]`, `[userId, createdAt]`, and `[conversationId]`.

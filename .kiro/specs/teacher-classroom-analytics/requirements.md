# Requirements Document

## Introduction

The Teacher Classroom Analytics Dashboard is a new section within the existing AlgoFox teacher dashboard at `/dashboard/classrooms/[classroomId]`. It gives teachers a comprehensive, data-driven view of how their students are performing — broken down by problem tags, difficulty, assignments, and contests. The dashboard surfaces students who need attention, aggregates tag mastery across the classroom, and provides drill-down analytics so teachers can intervene early and effectively.

All analytics are computed dynamically from existing `Submission`, `UserProblemSolved`, `ContestParticipation`, and `Assignment` data. A new `AssignmentStudent` model is added to track per-student assignment progress. Results are cached in Redis with short TTLs and invalidated on relevant data mutations.

## Glossary

- **Analytics_Dashboard**: The teacher-facing analytics panel rendered within the classroom detail page at `/dashboard/classrooms/[classroomId]`.
- **Classroom**: An existing Prisma model grouping a teacher with enrolled students and assignments.
- **Tag**: A broad topic label attached to a `Problem` (e.g., Arrays, Trees, Graphs, DP). Stored in the `tags` relation on `Problem`.
- **TopicTag**: A granular topic label attached to a `Problem` (e.g., Sliding Window, BFS, Dijkstra). Stored in the `topicTags` relation on `Problem`.
- **Tag_Mastery_Score**: A computed float [0–100] per student per tag, derived from correctness, difficulty performance, recency, repeated-attempt penalty, and problem coverage.
- **Risk_Score**: A computed float [0–100] per student that quantifies how much a student needs teacher attention. Never stored — always computed at request time.
- **At_Risk_Student**: A student whose `Risk_Score` is ≥ 60.
- **AssignmentStudent**: A new Prisma model that records each student's progress against a specific assignment (status, problems solved/attempted, timestamps).
- **Overview_Panel**: The top summary strip of the dashboard showing classroom-level aggregate metrics.
- **Tag_Mastery_Section**: The dashboard section displaying per-tag mastery aggregated across all students, with topic-tag drill-down.
- **Heatmap**: The Student × Tag grid showing each student's `Tag_Mastery_Score` as a color-coded cell.
- **Difficulty_Analysis_Section**: The section showing Easy/Medium/Hard accuracy broken down per tag.
- **Assignment_Analytics_Section**: The section showing assignment completion rates and per-tag accuracy on assignment problems.
- **Contest_Analytics_Section**: The section showing participation rates, scores, ranks, and contest-vs-practice comparisons.
- **Redis_Cache**: The existing Redis instance used by the platform for short-lived analytics caching.
- **Cache_TTL**: Time-to-live for a Redis cache entry.

---

## Requirements

### Requirement 1: Schema Extension — AssignmentStudent Model

**User Story:** As a teacher, I want the platform to track each student's assignment progress individually, so that assignment completion analytics are accurate and per-student.

#### Acceptance Criteria

1. THE Analytics_Dashboard SHALL require the Prisma schema to include an `AssignmentStudent` model with fields: `id` (cuid), `assignmentId` (String, FK → Assignment), `userId` (String, FK → User), `startedAt` (DateTime?), `completedAt` (DateTime?), `status` (`AssignmentStudentStatus` enum), `problemsSolved` (Int, default 0), `problemsAttempted` (Int, default 0), `createdAt` (DateTime), `updatedAt` (DateTime).
2. THE Analytics_Dashboard SHALL require the Prisma schema to include an `AssignmentStudentStatus` enum with values: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `OVERDUE`.
3. THE Analytics_Dashboard SHALL require the `AssignmentStudent` model to enforce a unique constraint on `[assignmentId, userId]`.
4. WHEN an `AssignmentStudent` record does not yet exist for a student–assignment pair, THE Analytics_Dashboard SHALL treat the student's assignment status as `NOT_STARTED` and SHALL NOT infer any other status until an actual record is created.

---

### Requirement 2: Overview Panel

**User Story:** As a teacher, I want a high-level summary of my classroom's performance at a glance, so that I can immediately understand the health of my class without drilling into details.

#### Acceptance Criteria

1. WHEN the teacher opens the Analytics_Dashboard for a classroom, THE Overview_Panel SHALL display: total enrolled student count, total problems solved (ACCEPTED submissions, mode = SUBMIT) across all students, overall accuracy percentage (ACCEPTED ÷ total SUBMIT-mode submissions × 100, rounded to 1 decimal, capped at 100%), average Tag_Mastery_Score across all students and all tags, and the count of At_Risk_Students.
2. WHEN the classroom has zero enrolled students, THE Overview_Panel SHALL display zeros for all numeric metrics without error.
3. WHEN the classroom has enrolled students but no submissions exist, THE Overview_Panel SHALL display zero for all submission-derived metrics and display mastery as 0%.
4. THE Overview_Panel SHALL load its data from a server action that verifies the requesting user has an ADMIN role or the TEACHER role before returning data.
5. IF the requesting session is invalid, THEN THE Analytics_Dashboard SHALL return a specific error indicating session invalidity.

---

### Requirement 3: Tag Mastery Section

**User Story:** As a teacher, I want to see how well my class collectively understands each tag, so that I can focus lessons on the weakest topics.

#### Acceptance Criteria

1. WHEN the teacher views the Tag_Mastery_Section, THE Tag_Mastery_Section SHALL display each tag that has at least one problem assigned to the classroom (via assignments or contests), along with the classroom-average Tag_Mastery_Score for that tag.
2. THE Tag_Mastery_Section SHALL compute each student's Tag_Mastery_Score for a given tag using the following weighted formula (all sub-scores normalized to [0–100]):
   - Correctness component (40%): ACCEPTED submissions ÷ total SUBMIT-mode submissions for problems with this tag × 100.
   - Difficulty component (20%): weighted accuracy where EASY = 1×, MEDIUM = 2×, HARD = 3×.
   - Recency component (20%): correctness rate for submissions within the last 30 days; if no recent submissions, this component equals 0.
   - Repeated-attempts penalty (10%): 100 minus a penalty proportional to the average number of SUBMIT-mode attempts per problem before ACCEPTED (capped so the penalty does not reduce the component below 0).
   - Coverage component (10%): count of distinct problems with this tag attempted ÷ total problems with this tag in the classroom × 100.
3. WHEN a student has never attempted any problem for a given tag, THE Analytics_Dashboard SHALL set that student's Tag_Mastery_Score for that tag to 0. WHEN a student has attempted problems for a tag but performed very poorly, THE Analytics_Dashboard SHALL compute and display the actual calculated score (which will be above 0) without applying a minimum floor.
4. WHEN the teacher clicks a tag in the Tag_Mastery_Section, THE Tag_Mastery_Section SHALL expand to show per-TopicTag mastery scores using the same formula applied to the tag's constituent TopicTags.
5. THE Tag_Mastery_Section SHALL sort tags by ascending classroom-average mastery score, placing the weakest tags first.
6. THE Tag_Mastery_Section SHALL visually indicate tags where the classroom-average mastery score is below 40 as "Struggling" and tags between 40–70 as "Developing".

---

### Requirement 4: Student × Tag Heatmap

**User Story:** As a teacher, I want a visual grid showing how each student performs per tag, so that I can quickly spot individual weaknesses across the whole class.

#### Acceptance Criteria

1. WHEN the teacher views the Heatmap, THE Heatmap SHALL render a grid where rows are students (sorted by name) and columns are tags (sorted by ascending classroom-average mastery, weakest first).
2. THE Heatmap SHALL color each cell using the student's Tag_Mastery_Score for that tag: score 0–39 with at least one attempt = red (struggling), 40–69 = amber (developing), 70–100 = green (proficient). Zero attempts SHALL always render as gray regardless of score.
3. WHEN the teacher hovers over or taps a cell, THE Heatmap SHALL display a tooltip containing the student's name, the tag name, their Tag_Mastery_Score, total attempts, and ACCEPTED count for that tag.
4. WHEN a student has no data for a tag (zero attempts), THE Heatmap SHALL render the cell in neutral gray, distinct from the red struggling color, regardless of the computed score.
5. WHEN the classroom has more than 30 students, THE Heatmap SHALL support horizontal scrolling without truncating student names or tag headers.

---

### Requirement 5: Difficulty Analysis Section

**User Story:** As a teacher, I want to see how students handle Easy, Medium, and Hard problems per tag, so that I can understand whether students are struggling with fundamentals or advanced challenges.

#### Acceptance Criteria

1. WHEN the teacher views the Difficulty_Analysis_Section, THE Difficulty_Analysis_Section SHALL display for each tag: the classroom-average accuracy for EASY problems, MEDIUM problems, and HARD problems within that tag.
2. THE Difficulty_Analysis_Section SHALL compute accuracy per difficulty per tag as: ACCEPTED SUBMIT-mode submissions ÷ total SUBMIT-mode submissions for problems of that difficulty and tag, aggregated across all students in the classroom.
3. WHEN no problems of a specific difficulty exist for a tag, THE Difficulty_Analysis_Section SHALL display "N/A" for that difficulty cell rather than zero. WHEN problems of a specific difficulty exist for a tag but no students have submitted for them, THE Difficulty_Analysis_Section SHALL display 0% accuracy.
4. THE Difficulty_Analysis_Section SHALL present data in a bar or grouped-bar chart format. IF chart rendering is unavailable, THEN THE Difficulty_Analysis_Section SHALL display the data in a tabular format alone as a fallback.

---

### Requirement 6: Students Needing Attention

**User Story:** As a teacher, I want to see a prioritized list of students who are struggling, along with the specific reasons, so that I can intervene with targeted support.

#### Acceptance Criteria

1. WHEN the teacher views the Students Needing Attention section, THE Analytics_Dashboard SHALL compute a Risk_Score for each student using the following weighted formula:
   - Low average mastery (30%): (100 − average Tag_Mastery_Score across all tags) × 0.30.
   - Low recent accuracy (20%): (100 − accuracy on submissions in the last 14 days) × 0.20; if no recent submissions, this component = 20 (max contribution).
   - Inactivity (15%): proportional to days since last SUBMIT-mode submission (0 days = 0 contribution, ≥14 days = full 15 contribution).
   - Repeated failures (15%): proportion of problems with ≥3 failed SUBMIT-mode attempts and no ACCEPTED submission × 0.15 × 100.
   - Assignment incompletion (10%): proportion of assignments with status NOT_STARTED or OVERDUE ÷ total assignments in the classroom × 0.10 × 100.
   - Declining performance (10%): if accuracy in the last 7 days is more than 20 points below accuracy in the 7 days before that, this component = 10; otherwise 0.
2. THE Analytics_Dashboard SHALL list only At_Risk_Students (Risk_Score ≥ 60) in this section, sorted by descending Risk_Score.
3. WHEN no At_Risk_Students exist, THE Analytics_Dashboard SHALL display a positive message confirming all students are performing adequately.
4. FOR EACH At_Risk_Student, THE Analytics_Dashboard SHALL display their name, avatar, Risk_Score, and a list of at most 3 contributing risk factors with human-readable labels (e.g., "14 days inactive", "Low Arrays mastery (32%)", "2 assignments overdue").
5. THE Analytics_Dashboard SHALL never persist Risk_Score to the database; it MUST be computed at request time.

---

### Requirement 7: Assignment Analytics Section

**User Story:** As a teacher, I want to see how students are progressing through assignments and how accurately they solve assignment problems per tag, so that I can evaluate assignment effectiveness.

#### Acceptance Criteria

1. WHEN the teacher views the Assignment_Analytics_Section, THE Assignment_Analytics_Section SHALL list all assignments for the classroom with: title, due date, total enrolled students, count of COMPLETED students, count of IN_PROGRESS students, count of NOT_STARTED students, count of OVERDUE students, and overall completion percentage (computed as completed_count ÷ enrolled_student_count × 100). THE Assignment_Analytics_Section SHALL enforce mathematical consistency so that all status counts sum to the enrolled student count.
2. THE Assignment_Analytics_Section SHALL derive completion status from `AssignmentStudent.status` records; students with no `AssignmentStudent` record SHALL be counted as NOT_STARTED.
3. WHEN the teacher expands an assignment, THE Assignment_Analytics_Section SHALL show per-tag accuracy for that assignment's problems: ACCEPTED SUBMIT-mode submissions ÷ total SUBMIT-mode submissions for assignment problems grouped by their tags. WHEN a tag has zero total SUBMIT-mode submissions, THE Assignment_Analytics_Section SHALL display 0% accuracy for that tag.
4. THE Assignment_Analytics_Section SHALL display a progress bar per assignment showing the proportion of COMPLETED students.
5. WHEN an assignment has no problems, THE Assignment_Analytics_Section SHALL display "No problems assigned" for that assignment's tag accuracy breakdown.

---

### Requirement 8: Contest Analytics Section

**User Story:** As a teacher, I want to see how my students are performing in classroom contests, including participation rates and score distributions, so that I can gauge competitive readiness.

#### Acceptance Criteria

1. WHEN the teacher views the Contest_Analytics_Section, THE Contest_Analytics_Section SHALL list all contests linked to the classroom (where `Contest.classroomId` equals the classroom's id), displaying: title, start time, end time, total participants from the classroom, and average score among participants.
2. FOR EACH classroom contest, THE Contest_Analytics_Section SHALL display each enrolled student's participation status (participated / did not participate), their score (sum of `Problem.score` for ACCEPTED SUBMIT-mode submissions within contest time bounds), and their rank within classroom participants.
3. THE Contest_Analytics_Section SHALL display a contest-vs-practice comparison per student: average score per problem in contest mode versus average ACCEPTED rate per problem in practice mode, shown as a side-by-side metric.
4. WHEN a student participated in a contest but scored 0, THE Contest_Analytics_Section SHALL distinguish this from a student who did not participate at all.
5. THE Contest_Analytics_Section SHALL sort students within each contest by descending score for rank assignment, with ties broken by submission time of the last ACCEPTED submission.

---

### Requirement 9: Caching and Performance

**User Story:** As a teacher, I want the analytics dashboard to load quickly even for large classrooms, so that the tool is practical to use during lesson planning.

#### Acceptance Criteria

1. THE Analytics_Dashboard SHALL cache all computed analytics payloads in the existing Redis instance using keys: `classroom:{classroomId}:analytics:overview`, `classroom:{classroomId}:analytics:tag-mastery`, `classroom:{classroomId}:analytics:heatmap`, `classroom:{classroomId}:analytics:risk`, `classroom:{classroomId}:analytics:assignments`, `classroom:{classroomId}:analytics:contests`.
2. EACH analytics cache entry SHALL have a Cache_TTL of 60 seconds.
3. WHEN a new `Submission` with `mode = SUBMIT` is created for a student enrolled in the classroom, THE Analytics_Dashboard SHALL invalidate the cache keys for that classroom's overview, tag-mastery, heatmap, risk, and assignments sections. THE Analytics_Dashboard SHALL NOT invalidate cache for submissions with other modes.
4. WHEN a new `ContestParticipation` record is created or updated for a student in a classroom contest, THE Analytics_Dashboard SHALL invalidate the cache keys for that classroom's contests and risk sections.
5. WHEN an `AssignmentStudent` record is created or updated, THE Analytics_Dashboard SHALL invalidate the cache keys for that classroom's assignments and risk sections.
6. WHEN multiple cache keys must be invalidated together, THE Analytics_Dashboard SHALL invalidate all specified cache keys atomically; IF any single invalidation fails, THEN THE Analytics_Dashboard SHALL attempt to invalidate all remaining specified keys for that classroom.
7. IF a Redis operation fails, THEN THE Analytics_Dashboard SHALL fall back to computing analytics directly from the database without surfacing the cache error to the teacher.

---

### Requirement 10: Authorization and Access Control

**User Story:** As a platform, I want analytics data to be accessible only to authorized users, so that student performance data is protected.

#### Acceptance Criteria

1. WHEN a user requests classroom analytics data, THE Analytics_Dashboard SHALL verify the requesting user's session is valid; IF the session is invalid, THEN THE Analytics_Dashboard SHALL return a specific error indicating session invalidity.
2. IF the requesting user does not hold the TEACHER role or the ADMIN role, THEN THE Analytics_Dashboard SHALL return an authorization error and no student data.
3. THE Analytics_Dashboard SHALL never expose raw student submission code in any analytics API response.
4. WHERE the platform operates in a multi-institution environment, THE Analytics_Dashboard SHALL ensure a teacher from one institution cannot access analytics for classrooms belonging to another institution.

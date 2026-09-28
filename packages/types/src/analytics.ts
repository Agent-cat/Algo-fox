/**
 * Shared TypeScript types for the Teacher Classroom Analytics Dashboard.
 * All analytics server actions and utility functions import from this file.
 */

// ---------------------------------------------------------------------------
// Error & Section Types
// ---------------------------------------------------------------------------

export type AnalyticsError =
  | { success: false; error: 'SESSION_INVALID' }
  | { success: false; error: 'UNAUTHORIZED' }
  | { success: false; error: 'CLASSROOM_NOT_FOUND' }
  | { success: false; error: 'INTERNAL_ERROR' };

export type AnalyticsSection =
  | 'overview'
  | 'tag-mastery'
  | 'heatmap'
  | 'difficulty'
  | 'risk'
  | 'assignments'
  | 'contests';

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export interface OverviewData {
  success: true;
  studentCount: number;
  totalProblemsSolved: number;
  /** 0–100, rounded to 1 decimal */
  overallAccuracy: number;
  /** 0–100 */
  averageMasteryScore: number;
  atRiskCount: number;
}

// ---------------------------------------------------------------------------
// Tag Mastery
// ---------------------------------------------------------------------------

/** Raw per-submission data used by computeTagMastery */
export interface TagSubmissionData {
  problemId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'CONCEPT';
  status: string;
  createdAt: Date;
}

export interface TopicTagMasteryItem {
  tagId: string;
  tagName: string;
  /** Classroom average, 0–100 */
  averageMastery: number;
}

export interface TagMasteryItem {
  tagId: string;
  tagName: string;
  /** Classroom average, 0–100 */
  averageMastery: number;
  label: 'Struggling' | 'Developing' | 'Proficient';
  /** Populated on drill-down */
  topicTags?: TopicTagMasteryItem[];
}

export interface TagMasteryData {
  success: true;
  /** Sorted ascending by averageMastery (weakest first) */
  tags: TagMasteryItem[];
}

// ---------------------------------------------------------------------------
// Heatmap
// ---------------------------------------------------------------------------

export interface HeatmapCell {
  studentId: string;
  tagId: string;
  /** 0–100 */
  score: number;
  attempts: number;
  accepted: number;
  color: 'red' | 'amber' | 'green' | 'gray';
}

export interface HeatmapData {
  success: true;
  /** Sorted by name ascending */
  students: { id: string; name: string }[];
  /** Sorted by mastery ascending */
  tags: { id: string; name: string }[];
  cells: HeatmapCell[];
}

// ---------------------------------------------------------------------------
// Difficulty Analysis
// ---------------------------------------------------------------------------

export interface DifficultyTagItem {
  tagId: string;
  tagName: string;
  /** null = no problems of that difficulty exist for this tag */
  easy: number | null;
  medium: number | null;
  hard: number | null;
}

export interface DifficultyData {
  success: true;
  items: DifficultyTagItem[];
}

// ---------------------------------------------------------------------------
// Risk / At-Risk Students
// ---------------------------------------------------------------------------

export interface RiskFactor {
  /** Human-readable label, e.g. "14 days inactive" */
  label: string;
  /** Raw contribution to Risk_Score */
  contribution: number;
}

export interface AtRiskStudent {
  studentId: string;
  name: string;
  image: string | null;
  /** 0–100 */
  riskScore: number;
  /** Top 3 contributing factors by contribution */
  topFactors: RiskFactor[];
}

export interface RiskData {
  success: true;
  /** Sorted by riskScore descending */
  atRiskStudents: AtRiskStudent[];
  allClear: boolean;
}

/** Input to the computeRiskScore pure function */
export interface RiskInput {
  /** Pre-computed, 0–100 */
  averageMastery: number;
  recentSubmissions14d: { status: string }[];
  daysSinceLastSubmit: number;
  problemsWithRepeatedFailures: number;
  totalProblems: number;
  incompleteAssignments: number;
  totalAssignments: number;
  /** Accuracy in the last 7 days */
  accuracy7dLast: number;
  /** Accuracy in the 7 days before that */
  accuracy7dPrev: number;
}

export interface RiskBreakdown {
  /** [0, 100] */
  score: number;
  factors: { name: string; contribution: number; label: string }[];
}

// ---------------------------------------------------------------------------
// Assignment Analytics
// ---------------------------------------------------------------------------

export interface AssignmentStatus {
  assignmentId: string;
  title: string;
  dueDate: string | null;
  totalStudents: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  overdue: number;
  /** completed / totalStudents × 100 */
  completionPercentage: number;
}

export interface AssignmentAnalyticsData {
  success: true;
  assignments: AssignmentStatus[];
}

export interface AssignmentTagData {
  success: true;
  tagAccuracy: { tagName: string; accuracy: number }[];
}

// ---------------------------------------------------------------------------
// Contest Analytics
// ---------------------------------------------------------------------------

export interface ContestStudentRow {
  studentId: string;
  name: string;
  image: string | null;
  participated: boolean;
  score: number;
  /** null if student did not participate */
  rank: number | null;
  /** 0–100 */
  practiceAccuracy: number;
  contestAvgScore: number;
}

export interface ContestItem {
  contestId: string;
  title: string;
  startTime: string;
  endTime: string;
  totalParticipants: number;
  averageScore: number;
  students: ContestStudentRow[];
}

export interface ContestAnalyticsData {
  success: true;
  contests: ContestItem[];
}

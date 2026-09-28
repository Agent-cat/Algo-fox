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

export interface AgentContext {
  userId: string;
  institutionId: string;
  role: 'TEACHER' | 'INSTITUTION_MANAGER';
  permissions: ToolPermission[];
}

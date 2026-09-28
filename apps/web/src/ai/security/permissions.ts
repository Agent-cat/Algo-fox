import { ToolPermission } from '../agent/context';

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

export const TOOL_PERMISSION_MAP: Record<string, ToolPermission> = {
  searchStudents: 'STUDENT_READ',
  getClassroomStudents: 'STUDENT_READ',
  getStudentProgress: 'STUDENT_PROGRESS_READ',
  getStudentSubmissions: 'SUBMISSION_READ',
  getInactiveStudents: 'STUDENT_READ',
  identifyStudentsNeedingAttention: 'STUDENT_READ',
  listClassrooms: 'CLASSROOM_READ',
  createClassroom: 'CLASSROOM_CREATE',
  importStudents: 'CLASSROOM_STUDENT_IMPORT',
  searchProblems: 'PROBLEM_READ',
  createAssignment: 'ASSIGNMENT_CREATE',
  getAssignmentPerformance: 'ASSIGNMENT_READ',
  getClassroomTopicPerformance: 'ANALYTICS_READ',
  generateClassReport: 'ANALYTICS_READ',
  createQuiz: 'QUIZ_CREATE',
  assignQuizToClassroom: 'QUIZ_CREATE',
  getJobStatus: 'ANALYTICS_READ',
  saveQuery: 'STUDENT_READ',
  listSavedQueries: 'STUDENT_READ',
  runSavedQuery: 'STUDENT_READ',
  getContestAnalytics: 'CONTEST_ANALYTICS_READ',
};

export type ActionType = 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'EXPORT';

export const TOOL_ACTION_TYPE_MAP: Record<string, ActionType> = {
  searchStudents: 'READ',
  getClassroomStudents: 'READ',
  getStudentProgress: 'READ',
  getStudentSubmissions: 'READ',
  getInactiveStudents: 'READ',
  identifyStudentsNeedingAttention: 'READ',
  listClassrooms: 'READ',
  createClassroom: 'CREATE',
  importStudents: 'IMPORT',
  searchProblems: 'READ',
  createAssignment: 'CREATE',
  getAssignmentPerformance: 'READ',
  getClassroomTopicPerformance: 'READ',
  generateClassReport: 'READ',
  createQuiz: 'CREATE',
  assignQuizToClassroom: 'CREATE',
  getJobStatus: 'READ',
  saveQuery: 'CREATE',
  listSavedQueries: 'READ',
  runSavedQuery: 'READ',
  getContestAnalytics: 'READ',
};

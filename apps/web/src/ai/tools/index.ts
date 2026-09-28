import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { AgentContext } from '../agent/context';
import { searchStudentsImpl } from './students/searchStudents';
import { getStudentProgressImpl } from './students/getStudentProgress';
import { getStudentSubmissionsImpl } from './students/getStudentSubmissions';
import { getInactiveStudentsImpl } from './students/getInactiveStudents';
import { identifyStudentsNeedingAttentionImpl } from './students/identifyStudentsNeedingAttention';
import { listClassroomsImpl } from './classrooms/listClassrooms';
import { getClassroomStudentsImpl } from './classrooms/getClassroomStudents';
import { createClassroomImpl } from './classrooms/createClassroom';
import { searchProblemsImpl } from './assignments/searchProblems';
import { createAssignmentImpl } from './assignments/createAssignment';
import { getAssignmentPerformanceImpl } from './assignments/getAssignmentPerformance';
import { getClassroomTopicPerformanceImpl } from './analytics/getClassroomTopicPerformance';
import { generateClassReportImpl } from './analytics/generateClassReport';
import { getJobStatusImpl } from './utility/getJobStatus';
import { saveQueryImpl, listSavedQueriesImpl, runSavedQueryImpl } from './utility/savedQueries';
import { getContestAnalyticsImpl } from './utility/getContestAnalytics';
import { matchStudentsImpl, importStudentsImpl } from './imports/importStudents';
import { createQuizImpl, assignQuizToClassroomImpl } from './quizzes/createQuiz';

export function buildTools(ctx: AgentContext): DynamicStructuredTool[] {
  return [
    new DynamicStructuredTool({
      name: 'searchStudents',
      description: 'Search students by name, email, or collegeId within the institution.',
      schema: z.object({
        query: z.string().describe('Search query'),
        classroomId: z.string().optional().describe('Optional classroom ID to filter'),
      }),
      func: async (args) => JSON.stringify(await searchStudentsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getStudentProgress',
      description: 'Get a student\'s progress including totalScore, problemsSolved, streaks, and assignment completion rate.',
      schema: z.object({ studentId: z.string().describe('Student user ID') }),
      func: async (args) => JSON.stringify(await getStudentProgressImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getStudentSubmissions',
      description: 'Get recent submissions for a student with problem title, status, and date.',
      schema: z.object({
        studentId: z.string().describe('Student user ID'),
        limit: z.number().optional().default(20).describe('Max results'),
      }),
      func: async (args) => JSON.stringify(await getStudentSubmissionsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getInactiveStudents',
      description: 'Get students who haven\'t submitted in the last N days (default 14).',
      schema: z.object({
        classroomId: z.string().describe('Classroom ID'),
        thresholdDays: z.number().optional().default(14).describe('Inactivity threshold in days'),
      }),
      func: async (args) => JSON.stringify(await getInactiveStudentsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'identifyStudentsNeedingAttention',
      description: 'Find students who are both inactive and have weak topics (mastery < 40).',
      schema: z.object({
        classroomId: z.string().describe('Classroom ID'),
        thresholdDays: z.number().optional().default(14).describe('Inactivity threshold in days'),
      }),
      func: async (args) => JSON.stringify(await identifyStudentsNeedingAttentionImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'listClassrooms',
      description: 'List all classrooms for the current user with student count.',
      schema: z.object({}),
      func: async () => JSON.stringify(await listClassroomsImpl(ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getClassroomStudents',
      description: 'Get enrolled students for a classroom with safe fields only.',
      schema: z.object({ classroomId: z.string().describe('Classroom ID') }),
      func: async (args) => JSON.stringify(await getClassroomStudentsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'createClassroom',
      description: 'Create a new classroom. Requires teacher confirmation.',
      schema: z.object({
        name: z.string().describe('Classroom name'),
        section: z.string().optional().describe('Section'),
        subject: z.string().optional().describe('Subject'),
      }),
      func: async (args) => JSON.stringify(await createClassroomImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'searchProblems',
      description: 'Search problems by topic tags and/or difficulty.',
      schema: z.object({
        topicTags: z.array(z.string()).optional().describe('Topic tag names'),
        difficulty: z.string().optional().describe('Difficulty level'),
        limit: z.number().optional().default(30).describe('Max results'),
      }),
      func: async (args) => JSON.stringify(await searchProblemsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'createAssignment',
      description: 'Create an assignment with confirmed problem IDs. Requires confirmation.',
      schema: z.object({
        classroomId: z.string().describe('Classroom ID'),
        title: z.string().describe('Assignment title'),
        description: z.string().optional().describe('Description'),
        dueDate: z.string().optional().describe('Due date ISO string'),
        problemIds: z.array(z.string()).describe('Problem IDs to include'),
      }),
      func: async (args) => JSON.stringify(await createAssignmentImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getAssignmentPerformance',
      description: 'Get per-student completion status, score, and overdue status for an assignment.',
      schema: z.object({ assignmentId: z.string().describe('Assignment ID') }),
      func: async (args) => JSON.stringify(await getAssignmentPerformanceImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getClassroomTopicPerformance',
      description: 'Get average mastery scores per topic tag for a classroom or specific student.',
      schema: z.object({
        classroomId: z.string().describe('Classroom ID'),
        studentId: z.string().optional().describe('Optional student ID to filter'),
      }),
      func: async (args) => JSON.stringify(await getClassroomTopicPerformanceImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'generateClassReport',
      description: 'Generate a comprehensive classroom report with active/inactive counts, topic strengths/weaknesses, and overdue assignments.',
      schema: z.object({ classroomId: z.string().describe('Classroom ID') }),
      func: async (args) => JSON.stringify(await generateClassReportImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getJobStatus',
      description: 'Check the status and progress of an async job.',
      schema: z.object({ jobId: z.string().describe('Job ID') }),
      func: async (args) => JSON.stringify(await getJobStatusImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'saveQuery',
      description: 'Save a frequently-used query as a named shortcut.',
      schema: z.object({
        name: z.string().describe('Query name'),
        query: z.string().describe('Query text to save'),
      }),
      func: async (args) => JSON.stringify(await saveQueryImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'listSavedQueries',
      description: 'List all saved queries for the current user.',
      schema: z.object({}),
      func: async () => JSON.stringify(await listSavedQueriesImpl(ctx)),
    }),
    new DynamicStructuredTool({
      name: 'runSavedQuery',
      description: 'Load and return a saved query\'s text by ID.',
      schema: z.object({ queryId: z.string().describe('Saved query ID') }),
      func: async (args) => JSON.stringify(await runSavedQueryImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'getContestAnalytics',
      description: 'Get contest violation and flag data for students in a classroom. Requires CONTEST_ANALYTICS_READ permission.',
      schema: z.object({ classroomId: z.string().describe('Classroom ID') }),
      func: async (args) => JSON.stringify(await getContestAnalyticsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'importStudents',
      description: 'Enroll confirmed students into a classroom. Requires confirmation.',
      schema: z.object({
        classroomId: z.string().describe('Classroom ID'),
        userIds: z.array(z.string()).describe('User IDs to enroll'),
      }),
      func: async (args) => JSON.stringify(await importStudentsImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'createQuiz',
      description: 'Create a quiz template with questions. Requires confirmation.',
      schema: z.object({
        title: z.string().describe('Quiz title'),
        description: z.string().optional().describe('Description'),
        classroomId: z.string().describe('Target classroom ID'),
        questions: z.array(z.object({
          text: z.string(),
          options: z.array(z.string()),
          correctOption: z.number(),
          explanation: z.string().optional(),
          timeLimit: z.number().optional(),
        })).describe('Quiz questions'),
      }),
      func: async (args) => JSON.stringify(await createQuizImpl(args, ctx)),
    }),
    new DynamicStructuredTool({
      name: 'assignQuizToClassroom',
      description: 'Assign a quiz template to a classroom. Requires confirmation.',
      schema: z.object({
        templateId: z.string().describe('Quiz template ID'),
        classroomId: z.string().describe('Classroom ID'),
      }),
      func: async (args) => JSON.stringify(await assignQuizToClassroomImpl(args, ctx)),
    }),
  ];
}

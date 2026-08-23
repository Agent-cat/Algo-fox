"use server";

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-utils';
import {
  analyticsKey,
  getAnalyticsCache,
  setAnalyticsCache,
} from '@/lib/analytics/cache';
import { computeTagMastery, TagSubmissionData } from '@/lib/analytics/mastery';
import { computeRiskScore, RiskInput } from '@/lib/analytics/risk-score';
import {
  AnalyticsError,
  OverviewData,
  TagMasteryData,
  TagMasteryItem,
  HeatmapData,
  HeatmapCell,
  DifficultyData,
  DifficultyTagItem,
  RiskData,
  AtRiskStudent,
  AssignmentAnalyticsData,
  AssignmentStatus,
  AssignmentTagData,
  ContestAnalyticsData,
  ContestItem,
  ContestStudentRow,
} from '@/lib/analytics/types';

type ClassroomAuthResult =
  | { success: true; user: { id: string; role: string; institutionId?: string }; classroom: { id: string; institutionId: string | null } }
  | { success: false; errorPayload: AnalyticsError };

/**
 * Shared authorization guard for all analytics server actions.
 * Checks session, TEACHER/ADMIN role, classroom existence, and institution scope.
 */
async function authorizeClassroomAccess(classroomId: string): Promise<ClassroomAuthResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, errorPayload: { success: false, error: 'SESSION_INVALID' } };
  }

  if (user.role !== 'TEACHER' && user.role !== 'ADMIN') {
    return { success: false, errorPayload: { success: false, error: 'UNAUTHORIZED' } };
  }

  const classroom = await prisma.classroom.findUnique({
    where: { id: classroomId },
    select: { id: true, institutionId: true },
  });

  if (!classroom) {
    return { success: false, errorPayload: { success: false, error: 'CLASSROOM_NOT_FOUND' } };
  }

  // Cross-institution check for non-ADMIN teachers
  if (user.role !== 'ADMIN' && user.institutionId && classroom.institutionId) {
    if (user.institutionId !== classroom.institutionId) {
      return { success: false, errorPayload: { success: false, error: 'UNAUTHORIZED' } };
    }
  }

  return { success: true, user, classroom };
}

// ---------------------------------------------------------------------------
// 1. Overview Analytics
// ---------------------------------------------------------------------------
export async function getOverviewAnalytics(
  classroomId: string
): Promise<OverviewData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'overview');
    const cached = await getAnalyticsCache<OverviewData>(cacheKey);
    if (cached) return cached;

    // 1. Enrolled student count
    const studentCount = await prisma.user.count({
      where: {
        enrolledClassrooms: {
          some: { id: classroomId },
        },
      },
    });

    // 2. Fetch distinct problems solved (ACCEPTED & SUBMIT mode)
    const solvedAggregate = await prisma.submission.findMany({
      where: {
        user: {
          enrolledClassrooms: {
            some: { id: classroomId },
          },
        },
        mode: 'SUBMIT',
        status: 'ACCEPTED',
      },
      select: {
        problemId: true,
      },
      distinct: ['problemId'],
    });
    const totalProblemsSolved = solvedAggregate.length;

    // 3. Submissions aggregate for overall accuracy
    const allSubmits = await prisma.submission.groupBy({
      by: ['status'],
      where: {
        user: {
          enrolledClassrooms: {
            some: { id: classroomId },
          },
        },
        mode: 'SUBMIT',
      },
      _count: { _all: true },
    });

    let totalSubmits = 0;
    let acceptedSubmits = 0;
    allSubmits.forEach((group: { status: string; _count: { _all: number } }) => {
      totalSubmits += group._count._all;
      if (group.status === 'ACCEPTED') {
        acceptedSubmits += group._count._all;
      }
    });

    const overallAccuracy =
      totalSubmits > 0 ? Math.min(100, Math.round((acceptedSubmits / totalSubmits) * 1000) / 10) : 0;

    // 4. Compute average tag mastery across classroom
    const tagMasteryRes = await getTagMasteryAnalytics(classroomId);
    let averageMasteryScore = 0;
    if (tagMasteryRes.success && tagMasteryRes.tags.length > 0) {
      const sum = tagMasteryRes.tags.reduce((acc: number, t: TagMasteryItem) => acc + t.averageMastery, 0);
      averageMasteryScore = Math.round(sum / tagMasteryRes.tags.length);
    }

    // 5. At-risk count from risk analytics
    const riskRes = await getRiskAnalytics(classroomId);
    let atRiskCount = 0;
    if (riskRes.success) {
      atRiskCount = riskRes.atRiskStudents.length;
    }

    const payload: OverviewData = {
      success: true,
      studentCount,
      totalProblemsSolved,
      overallAccuracy,
      averageMasteryScore,
      atRiskCount,
    };

    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getOverviewAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// Helper: Fetch all classroom student IDs & problem tags
// ---------------------------------------------------------------------------
async function getClassroomContext(classroomId: string) {
  const students = await prisma.user.findMany({
    where: {
      enrolledClassrooms: {
        some: { id: classroomId },
      },
    },
    select: { id: true, name: true, image: true },
    orderBy: { name: 'asc' },
  });

  const assignments = await prisma.assignment.findMany({
    where: { classroomId },
    select: {
      problems: {
        select: {
          problem: {
            select: {
              id: true,
              difficulty: true,
              tags: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });

  const contests = await prisma.contest.findMany({
    where: { classroomId },
    select: {
      problems: {
        select: {
          problem: {
            select: {
              id: true,
              difficulty: true,
              tags: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });

  const tagsMap = new Map<string, { id: string; name: string }>();
  const problemsMap = new Map<string, { difficulty: string; tagIds: string[] }>();

  const processProblem = (p: { id: string; difficulty: string; tags: { id: string; name: string }[] }) => {
    const tagIds: string[] = [];
    p.tags.forEach((t) => {
      tagsMap.set(t.id, t);
      tagIds.push(t.id);
    });
    problemsMap.set(p.id, { difficulty: p.difficulty, tagIds });
  };

  assignments.forEach((a: any) => a.problems.forEach((ap: any) => processProblem(ap.problem)));
  contests.forEach((c: any) => c.problems.forEach((cp: any) => processProblem(cp.problem)));

  return { students, tagsMap, problemsMap };
}

// ---------------------------------------------------------------------------
// 2. Tag Mastery Analytics
// ---------------------------------------------------------------------------
export async function getTagMasteryAnalytics(
  classroomId: string
): Promise<TagMasteryData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'tag-mastery');
    const cached = await getAnalyticsCache<TagMasteryData>(cacheKey);
    if (cached) return cached;

    const { students, tagsMap, problemsMap } = await getClassroomContext(classroomId);
    const studentIds = students.map((s: { id: string }) => s.id);

    if (students.length === 0 || tagsMap.size === 0) {
      const emptyPayload: TagMasteryData = { success: true, tags: [] };
      await setAnalyticsCache(cacheKey, emptyPayload);
      return emptyPayload;
    }

    // Fetch SUBMIT-mode submissions for all students in this classroom
    const rawSubmissions = await prisma.submission.findMany({
      where: {
        userId: { in: studentIds },
        mode: 'SUBMIT',
      },
      select: {
        userId: true,
        problemId: true,
        status: true,
        createdAt: true,
      },
    });

    // Compute tag mastery for each student x tag pair
    const tagScoresMap = new Map<string, number[]>();
    tagsMap.forEach((_, tagId) => tagScoresMap.set(tagId, []));

    // Group problemIds per tag
    const tagProblemsMap = new Map<string, string[]>();
    problemsMap.forEach((p, problemId) => {
      p.tagIds.forEach((tId) => {
        const list = tagProblemsMap.get(tId) || [];
        list.push(problemId);
        tagProblemsMap.set(tId, list);
      });
    });

    for (const studentId of studentIds) {
      const studentSubs = rawSubmissions.filter((s: { userId: string }) => s.userId === studentId);

      tagsMap.forEach((_, tagId) => {
        const tagProblemIds = new Set(tagProblemsMap.get(tagId) || []);
        const tagSubmissions: TagSubmissionData[] = studentSubs
          .filter((s: { problemId: string }) => tagProblemIds.has(s.problemId))
          .map((s: { problemId: string; status: string; createdAt: Date }) => ({
            problemId: s.problemId,
            difficulty: (problemsMap.get(s.problemId)?.difficulty as any) || 'EASY',
            status: s.status,
            createdAt: s.createdAt,
          }));

        const score = computeTagMastery(tagSubmissions, tagProblemIds.size);
        tagScoresMap.get(tagId)?.push(score);
      });
    }

    const items: TagMasteryItem[] = [];
    tagsMap.forEach((tag, tagId) => {
      const scores = tagScoresMap.get(tagId) || [];
      const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const averageMastery = Math.round(avg * 10) / 10;

      let label: 'Struggling' | 'Developing' | 'Proficient' = 'Struggling';
      if (averageMastery >= 70) label = 'Proficient';
      else if (averageMastery >= 40) label = 'Developing';

      items.push({
        tagId,
        tagName: tag.name,
        averageMastery,
        label,
      });
    });

    items.sort((a, b) => a.averageMastery - b.averageMastery);

    const payload: TagMasteryData = { success: true, tags: items };
    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getTagMasteryAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// 3. Heatmap Analytics
// ---------------------------------------------------------------------------
export async function getHeatmapAnalytics(
  classroomId: string
): Promise<HeatmapData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'heatmap');
    const cached = await getAnalyticsCache<HeatmapData>(cacheKey);
    if (cached) return cached;

    const { students, tagsMap, problemsMap } = await getClassroomContext(classroomId);
    const studentIds = students.map((s: { id: string }) => s.id);

    if (students.length === 0 || tagsMap.size === 0) {
      const emptyPayload: HeatmapData = {
        success: true,
        students: [],
        tags: [],
        cells: [],
      };
      await setAnalyticsCache(cacheKey, emptyPayload);
      return emptyPayload;
    }

    const rawSubmissions = await prisma.submission.findMany({
      where: {
        userId: { in: studentIds },
        mode: 'SUBMIT',
      },
      select: {
        userId: true,
        problemId: true,
        status: true,
        createdAt: true,
      },
    });

    const tagProblemsMap = new Map<string, string[]>();
    problemsMap.forEach((p, problemId) => {
      p.tagIds.forEach((tId) => {
        const list = tagProblemsMap.get(tId) || [];
        list.push(problemId);
        tagProblemsMap.set(tId, list);
      });
    });

    const cells: HeatmapCell[] = [];
    const tagMasteryScoresMap = new Map<string, number[]>();
    tagsMap.forEach((_, tId) => tagMasteryScoresMap.set(tId, []));

    for (const student of students) {
      const studentSubs = rawSubmissions.filter((s: { userId: string }) => s.userId === student.id);

      tagsMap.forEach((_, tagId) => {
        const tagProblemIds = new Set(tagProblemsMap.get(tagId) || []);
        const tagSubs = studentSubs.filter((s: { problemId: string }) => tagProblemIds.has(s.problemId));

        const attempts = tagSubs.length;
        const accepted = tagSubs.filter((s: { status: string }) => s.status === 'ACCEPTED').length;

        const formattedSubs: TagSubmissionData[] = tagSubs.map((s: { problemId: string; status: string; createdAt: Date }) => ({
          problemId: s.problemId,
          difficulty: (problemsMap.get(s.problemId)?.difficulty as any) || 'EASY',
          status: s.status,
          createdAt: s.createdAt,
        }));

        const score = computeTagMastery(formattedSubs, tagProblemIds.size);
        tagMasteryScoresMap.get(tagId)?.push(score);

        let color: 'red' | 'amber' | 'green' | 'gray' = 'gray';
        if (attempts > 0) {
          if (score < 40) color = 'red';
          else if (score < 70) color = 'amber';
          else color = 'green';
        }

        cells.push({
          studentId: student.id,
          tagId,
          score,
          attempts,
          accepted,
          color,
        });
      });
    }

    // Sort tags by average mastery ascending
    const tagsSorted = Array.from(tagsMap.values())
      .map((t) => {
        const scores = tagMasteryScoresMap.get(t.id) || [];
        const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        return { id: t.id, name: t.name, avgMastery: avg };
      })
      .sort((a, b) => a.avgMastery - b.avgMastery)
      .map((t) => ({ id: t.id, name: t.name }));

    const payload: HeatmapData = {
      success: true,
      students: students.map((s: { id: string; name: string | null }) => ({ id: s.id, name: s.name || 'Student' })),
      tags: tagsSorted,
      cells,
    };

    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getHeatmapAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// 4. Difficulty Analytics
// ---------------------------------------------------------------------------
export async function getDifficultyAnalytics(
  classroomId: string
): Promise<DifficultyData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'difficulty');
    const cached = await getAnalyticsCache<DifficultyData>(cacheKey);
    if (cached) return cached;

    const { students, tagsMap, problemsMap } = await getClassroomContext(classroomId);
    const studentIds = students.map((s: { id: string }) => s.id);

    if (tagsMap.size === 0) {
      const emptyPayload: DifficultyData = { success: true, items: [] };
      await setAnalyticsCache(cacheKey, emptyPayload);
      return emptyPayload;
    }

    const rawSubmissions = await prisma.submission.findMany({
      where: {
        userId: { in: studentIds },
        mode: 'SUBMIT',
      },
      select: {
        problemId: true,
        status: true,
      },
    });

    const items: DifficultyTagItem[] = [];

    tagsMap.forEach((tag, tagId) => {
      const easyProbIds: string[] = [];
      const mediumProbIds: string[] = [];
      const hardProbIds: string[] = [];

      problemsMap.forEach((p, probId) => {
        if (p.tagIds.includes(tagId)) {
          if (p.difficulty === 'EASY') easyProbIds.push(probId);
          else if (p.difficulty === 'MEDIUM') mediumProbIds.push(probId);
          else if (p.difficulty === 'HARD') hardProbIds.push(probId);
        }
      });

      const calcAccuracy = (probIds: string[]): number | null => {
        if (probIds.length === 0) return null;
        const setIds = new Set(probIds);
        const matchingSubs = rawSubmissions.filter((s: { problemId: string }) => setIds.has(s.problemId));
        if (matchingSubs.length === 0) return 0;
        const accepted = matchingSubs.filter((s: { status: string }) => s.status === 'ACCEPTED').length;
        return Math.round((accepted / matchingSubs.length) * 1000) / 10;
      };

      items.push({
        tagId,
        tagName: tag.name,
        easy: calcAccuracy(easyProbIds),
        medium: calcAccuracy(mediumProbIds),
        hard: calcAccuracy(hardProbIds),
      });
    });

    const payload: DifficultyData = { success: true, items };
    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getDifficultyAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// 5. Risk Analytics
// ---------------------------------------------------------------------------
export async function getRiskAnalytics(
  classroomId: string
): Promise<RiskData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'risk');
    const cached = await getAnalyticsCache<RiskData>(cacheKey);
    if (cached) return cached;

    const { students, tagsMap, problemsMap } = await getClassroomContext(classroomId);
    const studentIds = students.map((s: { id: string }) => s.id);

    if (students.length === 0) {
      const emptyPayload: RiskData = {
        success: true,
        atRiskStudents: [],
        allClear: true,
      };
      await setAnalyticsCache(cacheKey, emptyPayload);
      return emptyPayload;
    }

    const now = new Date();
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgoFor7d = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const [allSubmissions, assignmentStudentRecords, totalAssignmentsCount] =
      await Promise.all([
        prisma.submission.findMany({
          where: { userId: { in: studentIds }, mode: 'SUBMIT' },
          select: { userId: true, problemId: true, status: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.assignmentStudent.findMany({
          where: {
            assignment: { classroomId },
            userId: { in: studentIds },
          },
          select: { userId: true, status: true },
        }),
        prisma.assignment.count({ where: { classroomId } }),
      ]);

    const totalProblemsInClassroom = problemsMap.size;
    const tagProblemsMap = new Map<string, string[]>();
    problemsMap.forEach((p, probId) => {
      p.tagIds.forEach((tId) => {
        const list = tagProblemsMap.get(tId) || [];
        list.push(probId);
        tagProblemsMap.set(tId, list);
      });
    });

    const atRiskStudents: AtRiskStudent[] = [];

    for (const student of students) {
      const studentSubs = allSubmissions.filter((s: { userId: string }) => s.userId === student.id);

      // Average mastery across tags
      let totalMastery = 0;
      if (tagsMap.size > 0) {
        tagsMap.forEach((_, tagId) => {
          const tagProbIds = new Set(tagProblemsMap.get(tagId) || []);
          const tagSubs: TagSubmissionData[] = studentSubs
            .filter((s: { problemId: string }) => tagProbIds.has(s.problemId))
            .map((s: { problemId: string; status: string; createdAt: Date }) => ({
              problemId: s.problemId,
              difficulty: (problemsMap.get(s.problemId)?.difficulty as any) || 'EASY',
              status: s.status,
              createdAt: s.createdAt,
            }));
          totalMastery += computeTagMastery(tagSubs, tagProbIds.size);
        });
      }
      const averageMastery = tagsMap.size > 0 ? totalMastery / tagsMap.size : 0;

      // Submissions in last 14d
      const recentSubmissions14d = studentSubs.filter(
        (s: { createdAt: Date }) => new Date(s.createdAt) >= fourteenDaysAgo
      );

      // Days since last submit
      let daysSinceLastSubmit = 30; // default cap if no subs
      if (studentSubs.length > 0) {
        const lastSubmitTime = new Date(studentSubs[0].createdAt).getTime();
        daysSinceLastSubmit = (now.getTime() - lastSubmitTime) / (1000 * 60 * 60 * 24);
      }

      // Repeated failures: >= 3 fails and no ACCEPTED
      const probMap = new Map<string, { fails: number; accepted: boolean }>();
      studentSubs.forEach((s: { problemId: string; status: string }) => {
        const entry = probMap.get(s.problemId) || { fails: 0, accepted: false };
        if (s.status === 'ACCEPTED') entry.accepted = true;
        else entry.fails += 1;
        probMap.set(s.problemId, entry);
      });

      let problemsWithRepeatedFailures = 0;
      probMap.forEach((val) => {
        if (val.fails >= 3 && !val.accepted) problemsWithRepeatedFailures++;
      });

      // Incomplete assignments
      const studentAssignRecords = assignmentStudentRecords.filter((r: { userId: string }) => r.userId === student.id);
      let incompleteAssignments = totalAssignmentsCount - studentAssignRecords.filter((r: { status: string }) => r.status === 'COMPLETED').length;
      incompleteAssignments = Math.max(0, incompleteAssignments);

      // 7d vs prev 7d accuracy
      const last7dSubs = studentSubs.filter((s: { createdAt: Date }) => new Date(s.createdAt) >= sevenDaysAgo);
      const prev7dSubs = studentSubs.filter(
        (s: { createdAt: Date }) => new Date(s.createdAt) >= fourteenDaysAgoFor7d && new Date(s.createdAt) < sevenDaysAgo
      );

      const calc7dAccuracy = (subs: typeof studentSubs) => {
        if (subs.length === 0) return 0;
        const accepted = subs.filter((s: { status: string }) => s.status === 'ACCEPTED').length;
        return (accepted / subs.length) * 100;
      };

      const accuracy7dLast = calc7dAccuracy(last7dSubs);
      const accuracy7dPrev = calc7dAccuracy(prev7dSubs);

      const riskInput: RiskInput = {
        averageMastery,
        recentSubmissions14d,
        daysSinceLastSubmit,
        problemsWithRepeatedFailures,
        totalProblems: totalProblemsInClassroom,
        incompleteAssignments,
        totalAssignments: totalAssignmentsCount,
        accuracy7dLast,
        accuracy7dPrev,
      };

      const breakdown = computeRiskScore(riskInput);

      if (breakdown.score >= 60) {
        const topFactors = [...breakdown.factors]
          .sort((a, b) => b.contribution - a.contribution)
          .slice(0, 3)
          .map((f) => ({ label: f.label, contribution: f.contribution }));

        atRiskStudents.push({
          studentId: student.id,
          name: student.name || 'Student',
          image: student.image || null,
          riskScore: breakdown.score,
          topFactors,
        });
      }
    }

    atRiskStudents.sort((a, b) => b.riskScore - a.riskScore);

    const payload: RiskData = {
      success: true,
      atRiskStudents,
      allClear: atRiskStudents.length === 0,
    };

    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getRiskAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// 6. Assignment Analytics
// ---------------------------------------------------------------------------
export async function getAssignmentAnalytics(
  classroomId: string
): Promise<AssignmentAnalyticsData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'assignments');
    const cached = await getAnalyticsCache<AssignmentAnalyticsData>(cacheKey);
    if (cached) return cached;

    const studentCount = await prisma.user.count({
      where: { enrolledClassrooms: { some: { id: classroomId } } },
    });

    const assignments = await prisma.assignment.findMany({
      where: { classroomId },
      include: {
        students: { select: { status: true, userId: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const items: AssignmentStatus[] = assignments.map((a: { id: string; title: string; dueDate: Date | null; students: { status: string; userId: string }[] }) => {
      let completed = 0;
      let inProgress = 0;
      let overdue = 0;
      let trackedCount = 0;

      a.students.forEach((s: { status: string }) => {
        trackedCount++;
        if (s.status === 'COMPLETED') completed++;
        else if (s.status === 'IN_PROGRESS') inProgress++;
        else if (s.status === 'OVERDUE') overdue++;
      });

      // Default missing student records to NOT_STARTED
      const notStarted = Math.max(0, studentCount - trackedCount + a.students.filter((s: { status: string }) => s.status === 'NOT_STARTED').length);

      const completionPercentage =
        studentCount > 0 ? Math.round((completed / studentCount) * 100) : 0;

      return {
        assignmentId: a.id,
        title: a.title,
        dueDate: a.dueDate ? a.dueDate.toISOString() : null,
        totalStudents: studentCount,
        completed,
        inProgress,
        notStarted,
        overdue,
        completionPercentage,
      };
    });

    const payload: AssignmentAnalyticsData = { success: true, assignments: items };
    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getAssignmentAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

export async function getAssignmentTagBreakdown(
  classroomId: string,
  assignmentId: string
): Promise<AssignmentTagData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: {
        classroomId: true,
        problems: {
          select: {
            problem: {
              select: {
                id: true,
                tags: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    if (!assignment || assignment.classroomId !== classroomId) {
      return { success: false, error: 'INTERNAL_ERROR' };
    }

    const problemTagMap = new Map<string, string[]>();
    const tagNamesSet = new Set<string>();

    assignment.problems.forEach((ap: { problem: { id: string; tags: { name: string }[] } }) => {
      const tags = ap.problem.tags.map((t: { name: string }) => t.name);
      tags.forEach((t: string) => tagNamesSet.add(t));
      problemTagMap.set(ap.problem.id, tags);
    });

    if (tagNamesSet.size === 0) {
      return { success: true, tagAccuracy: [] };
    }

    const problemIds = Array.from(problemTagMap.keys());
    const studentIds = (
      await prisma.user.findMany({
        where: { enrolledClassrooms: { some: { id: classroomId } } },
        select: { id: true },
      })
    ).map((s: { id: string }) => s.id);

    const submissions = await prisma.submission.findMany({
      where: {
        problemId: { in: problemIds },
        userId: { in: studentIds },
        mode: 'SUBMIT',
      },
      select: { problemId: true, status: true },
    });

    const tagAccuracy: { tagName: string; accuracy: number }[] = [];

    tagNamesSet.forEach((tagName) => {
      const tagProbIds = new Set(
        problemIds.filter((pId) => problemTagMap.get(pId)?.includes(tagName))
      );
      const tagSubs = submissions.filter((s: { problemId: string }) => tagProbIds.has(s.problemId));

      if (tagSubs.length === 0) {
        tagAccuracy.push({ tagName, accuracy: 0 });
      } else {
        const accepted = tagSubs.filter((s: { status: string }) => s.status === 'ACCEPTED').length;
        const accuracy = Math.round((accepted / tagSubs.length) * 100);
        tagAccuracy.push({ tagName, accuracy });
      }
    });

    return { success: true, tagAccuracy };
  } catch (error) {
    console.error('[getAssignmentTagBreakdown Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

// ---------------------------------------------------------------------------
// 7. Contest Analytics
// ---------------------------------------------------------------------------
export async function getContestAnalytics(
  classroomId: string
): Promise<ContestAnalyticsData | AnalyticsError> {
  try {
    const auth = await authorizeClassroomAccess(classroomId);
    if (!auth.success) return auth.errorPayload;

    const cacheKey = analyticsKey(classroomId, 'contests');
    const cached = await getAnalyticsCache<ContestAnalyticsData>(cacheKey);
    if (cached) return cached;

    const students = await prisma.user.findMany({
      where: { enrolledClassrooms: { some: { id: classroomId } } },
      select: { id: true, name: true, image: true },
      orderBy: { name: 'asc' },
    });
    const studentIds = students.map((s: { id: string }) => s.id);

    const contests = await prisma.contest.findMany({
      where: { classroomId },
      include: {
        participants: {
          where: { userId: { in: studentIds } },
          select: { userId: true },
        },
      },
      orderBy: { startTime: 'desc' },
    });

    const items: ContestItem[] = [];

    for (const contest of contests) {
      // Submissions during contest timeframe by classroom students
      const contestSubmissions = await prisma.submission.findMany({
        where: {
          userId: { in: studentIds },
          contestId: contest.id,
          createdAt: {
            gte: contest.startTime,
            lte: contest.endTime,
          },
        },
        select: { userId: true, status: true, createdAt: true, problem: { select: { score: true } } },
      });

      const participantSet = new Set<string>();
      contest.participants.forEach((p: { userId: string }) => participantSet.add(p.userId));

      const participantRows: {
        userId: string;
        participated: boolean;
        score: number;
        lastAcceptedTime: number;
      }[] = [];

      for (const student of students) {
        const participated = participantSet.has(student.id);

        const studentContestSubs = contestSubmissions.filter(
          (s: { userId: string; status: string }) => s.userId === student.id && s.status === 'ACCEPTED'
        );
        const score = studentContestSubs.reduce((acc: number, s: any) => acc + (s.problem?.score || 100), 0);
        const lastAcceptedTime =
          studentContestSubs.length > 0
            ? Math.max(...studentContestSubs.map((s: { createdAt: Date }) => new Date(s.createdAt).getTime()))
            : Infinity;

        participantRows.push({
          userId: student.id,
          participated,
          score,
          lastAcceptedTime,
        });
      }

      // Rank participant rows: participated first, then desc by score, tie broken by lastAcceptedTime asc
      const participatedOnly = participantRows.filter((r) => r.participated);
      participatedOnly.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.lastAcceptedTime - b.lastAcceptedTime;
      });

      const ranksMap = new Map<string, number>();
      participatedOnly.forEach((r, idx) => ranksMap.set(r.userId, idx + 1));

      const totalParticipants = participatedOnly.length;
      const avgScore =
        totalParticipants > 0
          ? Math.round(
              participatedOnly.reduce((acc, r) => acc + r.score, 0) / totalParticipants
            )
          : 0;

      // Practice accuracy for classroom students outside contest
      const practiceSubmissions = await prisma.submission.findMany({
        where: {
          userId: { in: studentIds },
          mode: 'SUBMIT',
        },
        select: { userId: true, status: true },
      });

      const studentRows: ContestStudentRow[] = students.map((student: { id: string; name: string | null; image: string | null }) => {
        const rowInfo = participantRows.find((r) => r.userId === student.id)!;
        const studentPracticeSubs = practiceSubmissions.filter((s: { userId: string }) => s.userId === student.id);
        const practiceAcc =
          studentPracticeSubs.length > 0
            ? Math.round(
                (studentPracticeSubs.filter((s: { status: string }) => s.status === 'ACCEPTED').length /
                  studentPracticeSubs.length) *
                  100
              )
            : 0;

        return {
          studentId: student.id,
          name: student.name || 'Student',
          image: student.image || null,
          participated: rowInfo.participated,
          score: rowInfo.score,
          rank: ranksMap.get(student.id) || null,
          practiceAccuracy: practiceAcc,
          contestAvgScore: avgScore,
        };
      });

      items.push({
        contestId: contest.id,
        title: contest.title,
        startTime: contest.startTime.toISOString(),
        endTime: contest.endTime.toISOString(),
        totalParticipants,
        averageScore: avgScore,
        students: studentRows,
      });
    }

    const payload: ContestAnalyticsData = { success: true, contests: items };
    await setAnalyticsCache(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error('[getContestAnalytics Error]:', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}

import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function generateClassReportImpl(
  args: { classroomId: string },
  ctx: AgentContext
) {
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
    select: { id: true },
  });
  if (!classroom) throw new Error('Classroom not found or access denied');

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
    const students = await prisma.user.findMany({
      where: { enrolledClassrooms: { some: { id: classroom.id } } },
      select: { id: true },
    });
    const studentIds = students.map(s => s.id);
    const studentCount = studentIds.length;

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const [submissions, assignmentStudents, assignments, lastSubmissions] = await Promise.all([
      prisma.submission.findMany({
        where: { userId: { in: studentIds }, mode: 'SUBMIT' },
        select: { userId: true, problemId: true, status: true },
      }),
      prisma.assignmentStudent.findMany({
        where: { assignment: { classroomId: classroom.id } },
        select: { userId: true, status: true },
      }),
      prisma.assignment.findMany({
        where: { classroomId: classroom.id },
        select: {
          id: true, title: true, dueDate: true,
          problems: { select: { problem: { select: { id: true, topicTags: { select: { name: true } } } } } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.submission.groupBy({
        by: ['userId'],
        where: { userId: { in: studentIds }, mode: 'SUBMIT' },
        _max: { createdAt: true },
      }),
    ]);

    await prisma.aIAgentJob.update({ where: { id: job.id }, data: { progress: 25 } });

    const lastSubMap = new Map(lastSubmissions.map(r => [r.userId, r._max.createdAt]));
    const inactiveCount = studentIds.filter(id => {
      const last = lastSubMap.get(id);
      return !last || last < fourteenDaysAgo;
    }).length;

    // Topic mastery
    const problemTagMap = new Map<string, string[]>();
    for (const a of assignments) {
      for (const ap of a.problems) {
        const tags = ap.problem.topicTags.map(t => t.name);
        problemTagMap.set(ap.problem.id, tags);
      }
    }

    const tagStats = new Map<string, { solved: number; total: number }>();
    for (const sub of submissions) {
      const tags = problemTagMap.get(sub.problemId) || [];
      for (const tagName of tags) {
        if (!tagStats.has(tagName)) tagStats.set(tagName, { solved: 0, total: 0 });
        const stats = tagStats.get(tagName)!;
        stats.total++;
        if (sub.status === 'ACCEPTED') stats.solved++;
      }
    }

    const sortedTags = Array.from(tagStats.entries())
      .map(([name, stats]) => ({
        tagName: name,
        averageMastery: stats.total > 0 ? Math.round((stats.solved / stats.total) * 1000) / 10 : 0,
      }))
      .sort((a, b) => a.averageMastery - b.averageMastery);

    await prisma.aIAgentJob.update({ where: { id: job.id }, data: { progress: 75 } });

    const weakestTopics = sortedTags.slice(0, 3).map(t => t.tagName);
    const strongestTopics = sortedTags.slice(-3).reverse().map(t => t.tagName);

    const completedCount = assignmentStudents.filter(s => s.status === 'COMPLETED').length;
    const avgCompletion = assignmentStudents.length > 0
      ? Math.round((completedCount / assignmentStudents.length) * 100)
      : 0;

    const overdueCount = assignments.filter(a =>
      a.dueDate && new Date(a.dueDate) < new Date() &&
      !assignmentStudents.some(s => s.status === 'COMPLETED')
    ).length;

    const report = {
      activeStudentCount: studentCount - inactiveCount,
      inactiveStudentCount: inactiveCount,
      averageAssignmentCompletion: avgCompletion,
      strongestTopics,
      weakestTopics,
      overdueAssignmentCount: overdueCount,
    };

    await prisma.aIAgentJob.update({
      where: { id: job.id },
      data: { status: 'COMPLETED', progress: 100, result: report as any },
    });

    return report;
  } catch (error) {
    await prisma.aIAgentJob.update({
      where: { id: job.id },
      data: { status: 'FAILED', result: { error: String(error) } as any },
    });
    throw error;
  }
}

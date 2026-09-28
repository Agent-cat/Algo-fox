import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function getClassroomTopicPerformanceImpl(
  args: { classroomId: string; studentId?: string },
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

  const assignments = await prisma.assignment.findMany({
    where: { classroomId: classroom.id },
    select: {
      problems: {
        select: {
          problem: {
            select: {
              id: true,
              topicTags: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });

  const tagMap = new Map<string, { tagName: string; problemIds: Set<string> }>();
  for (const assignment of assignments) {
    for (const ap of assignment.problems) {
      for (const tag of ap.problem.topicTags) {
        if (!tagMap.has(tag.id)) {
          tagMap.set(tag.id, { tagName: tag.name, problemIds: new Set() });
        }
        tagMap.get(tag.id)!.problemIds.add(ap.problem.id);
      }
    }
  }

  const studentWhere: Record<string, unknown> = {
    enrolledClassrooms: { some: { id: classroom.id } },
  };
  if (args.studentId) {
    studentWhere.id = args.studentId;
  }

  const students = await prisma.user.findMany({
    where: studentWhere,
    select: { id: true },
  });

  if (students.length === 0 || tagMap.size === 0) return [];

  const submissions = await prisma.submission.findMany({
    where: {
      userId: { in: students.map(s => s.id) },
      mode: 'SUBMIT',
    },
    select: { userId: true, problemId: true, status: true },
  });

  const results: { tagName: string; averageMastery: number }[] = [];

  for (const [tagId, { tagName, problemIds }] of tagMap) {
    const tagSubs = submissions.filter(s => problemIds.has(s.problemId));
    const solved = tagSubs.filter(s => s.status === 'ACCEPTED').length;
    const total = tagSubs.length;
    const averageMastery = total > 0 ? Math.round((solved / total) * 1000) / 10 : 0;
    results.push({ tagName, averageMastery });
  }

  results.sort((a, b) => a.averageMastery - b.averageMastery);
  return results;
}

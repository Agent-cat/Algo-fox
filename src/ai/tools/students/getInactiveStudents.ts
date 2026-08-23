import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';
import { stripPII, AIStudent } from '../../security/piiGuard';

export async function getInactiveStudentsImpl(
  args: { classroomId: string; thresholdDays?: number },
  ctx: AgentContext
): Promise<{ inactive: AIStudent[]; active: AIStudent[] }> {
  const threshold = args.thresholdDays ?? 14;
  const cutoff = new Date(Date.now() - threshold * 24 * 60 * 60 * 1000);

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
    const isInactive = !lastSub || lastSub < cutoff;
    const safe = stripPII(student) as AIStudent;
    if (isInactive) inactive.push(safe);
    else active.push(safe);
  }

  return { inactive, active };
}

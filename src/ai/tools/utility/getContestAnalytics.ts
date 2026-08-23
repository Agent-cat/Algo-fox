import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';

export async function getContestAnalyticsImpl(
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

  const participations = await prisma.contestParticipation.findMany({
    where: {
      user: { enrolledClassrooms: { some: { id: classroom.id } } },
    },
    select: {
      userId: true,
      tabSwitchCount: true,
      fullscreenExitCount: true,
      totalViolations: true,
      isFlagged: true,
      user: { select: { id: true, name: true, email: true } },
      contest: { select: { id: true, title: true } },
    },
  });

  return participations.map(p => ({
    studentId: p.user.id,
    studentName: p.user.name,
    contestId: p.contest.id,
    contestTitle: p.contest.title,
    tabSwitchCount: p.tabSwitchCount,
    fullscreenExitCount: p.fullscreenExitCount,
    totalViolations: p.totalViolations,
    isFlagged: p.isFlagged,
  }));
}

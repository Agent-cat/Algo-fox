import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';
import { stripPII } from '../../security/piiGuard';

export async function getClassroomStudentsImpl(
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

  const students = await prisma.user.findMany({
    where: { enrolledClassrooms: { some: { id: classroom.id } } },
    select: {
      id: true, name: true, email: true, collegeId: true,
      collegeName: true, branch: true, year: true, totalScore: true,
      problemsSolved: true, currentStreak: true, longestStreak: true, image: true,
    },
    orderBy: { name: 'asc' },
  });

  return students.map(s => stripPII(s));
}

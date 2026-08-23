import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';
import { stripPII, AIStudent } from '../../security/piiGuard';

export async function searchStudentsImpl(
  args: { query: string; classroomId?: string },
  ctx: AgentContext
): Promise<AIStudent[]> {
  const where: Record<string, unknown> = {
    institutionId: ctx.institutionId,
    role: 'USER',
    OR: [
      { name: { contains: args.query, mode: 'insensitive' } },
      { email: { contains: args.query, mode: 'insensitive' } },
      { collegeId: { contains: args.query, mode: 'insensitive' } },
    ],
  };

  if (args.classroomId) {
    where.enrolledClassrooms = { some: { id: args.classroomId } };
  }

  const students = await prisma.user.findMany({
    where,
    select: {
      id: true, name: true, email: true, collegeId: true,
      collegeName: true, branch: true, year: true, totalScore: true,
      problemsSolved: true, currentStreak: true, longestStreak: true, image: true,
    },
    take: 50,
  });

  return students.map(s => stripPII(s) as AIStudent);
}

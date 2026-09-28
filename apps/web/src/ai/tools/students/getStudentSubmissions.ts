import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function getStudentSubmissionsImpl(
  args: { studentId: string; limit?: number },
  ctx: AgentContext
) {
  const student = await prisma.user.findFirst({
    where: {
      id: args.studentId,
      institutionId: ctx.institutionId,
    },
    select: { id: true },
  });

  if (!student) throw new Error('Student not found or access denied');

  const submissions = await prisma.submission.findMany({
    where: {
      userId: args.studentId,
      mode: 'SUBMIT',
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      problem: { select: { id: true, title: true, difficulty: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: args.limit ?? 20,
  });

  return submissions.map(s => ({
    id: s.id,
    status: s.status,
    createdAt: s.createdAt,
    problem: s.problem,
  }));
}

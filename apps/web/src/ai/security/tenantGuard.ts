import { AgentContext } from '../agent/context';

export interface SafeWhereClause {
  institutionId: string;
  teacherId?: string;
}

export function buildSafeWhereClause(ctx: AgentContext): SafeWhereClause {
  const where: SafeWhereClause = { institutionId: ctx.institutionId };
  if (ctx.role === 'TEACHER') {
    where.teacherId = ctx.userId;
  }
  return where;
}

export async function assertClassroomOwnership(
  classroomId: string,
  ctx: AgentContext
): Promise<{ allowed: boolean; error?: string }> {
  const { prisma } = await import('@algofox/db');
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
    select: { id: true },
  });

  if (!classroom) {
    return { allowed: false, error: 'Classroom not found or access denied' };
  }
  return { allowed: true };
}

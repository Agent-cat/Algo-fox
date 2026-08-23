import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';

export async function listClassroomsImpl(ctx: AgentContext) {
  const where = ctx.role === 'TEACHER'
    ? { teacherId: ctx.userId, institutionId: ctx.institutionId }
    : { institutionId: ctx.institutionId };

  const classrooms = await prisma.classroom.findMany({
    where,
    select: {
      id: true, name: true, section: true, subject: true,
      _count: { select: { students: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return classrooms.map(c => ({
    id: c.id,
    name: c.name,
    section: c.section,
    subject: c.subject,
    studentCount: c._count.students,
  }));
}

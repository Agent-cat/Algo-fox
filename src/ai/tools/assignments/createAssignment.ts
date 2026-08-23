import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';
import { revalidateTag } from 'next/cache';

export async function createAssignmentImpl(
  args: { classroomId: string; title: string; description?: string; dueDate?: string; problemIds: string[] },
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

  const assignment = await prisma.assignment.create({
    data: {
      title: args.title,
      description: args.description ?? null,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
      classroomId: args.classroomId,
      problems: {
        create: args.problemIds.map((id, index) => ({
          problemId: id,
          order: index,
        })),
      },
    },
  });

  revalidateTag(`assignments-classroom-${args.classroomId}`, 'max');

  return { assignmentId: assignment.id };
}

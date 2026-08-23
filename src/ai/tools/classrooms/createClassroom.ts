import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';

export async function createClassroomImpl(
  args: { name: string; section?: string; subject?: string },
  ctx: AgentContext
) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let joinCode = '';
  for (let i = 0; i < 6; i++) {
    joinCode += chars[Math.floor(Math.random() * chars.length)];
  }

  const classroom = await prisma.classroom.create({
    data: {
      name: args.name,
      section: args.section ?? null,
      subject: args.subject ?? null,
      joinCode,
      institutionId: ctx.institutionId,
      teacherId: ctx.userId,
    },
  });

  return { classroomId: classroom.id, joinCode: classroom.joinCode };
}

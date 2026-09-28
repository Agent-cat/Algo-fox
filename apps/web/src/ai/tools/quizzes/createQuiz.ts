import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function createQuizImpl(
  args: {
    title: string;
    description?: string;
    questions: { text: string; options: string[]; correctOption: number; explanation?: string; timeLimit?: number }[];
    classroomId: string;
  },
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

  const template = await prisma.quizTemplate.create({
    data: {
      title: args.title,
      description: args.description ?? null,
      teacherId: ctx.userId,
      questions: {
        create: args.questions.map((q, i) => ({
          text: q.text,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation ?? null,
          timeLimit: q.timeLimit ?? 30,
          order: i,
        })),
      },
    },
    include: { questions: { orderBy: { order: 'asc' } } },
  });

  return {
    templateId: template.id,
    title: template.title,
    questionCount: template.questions.length,
  };
}

export async function assignQuizToClassroomImpl(
  args: { templateId: string; classroomId: string },
  ctx: AgentContext
) {
  const template = await prisma.quizTemplate.findFirst({
    where: { id: args.templateId, teacherId: ctx.userId },
  });
  if (!template) throw new Error('Quiz template not found or not yours');

  const classroom = await prisma.classroom.findFirst({
    where: {
      id: args.classroomId,
      institutionId: ctx.institutionId,
      ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
    },
    select: { id: true, name: true },
  });
  if (!classroom) throw new Error('Classroom not found or access denied');

  const assignment = await prisma.quizTemplateAssignment.create({
    data: {
      templateId: args.templateId,
      classroomId: args.classroomId,
    },
  });

  return { assignmentId: assignment.id, classroomName: classroom.name };
}

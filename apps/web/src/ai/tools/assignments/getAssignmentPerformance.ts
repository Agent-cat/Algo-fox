import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function getAssignmentPerformanceImpl(
  args: { assignmentId: string },
  ctx: AgentContext
) {
  const assignment = await prisma.assignment.findFirst({
    where: {
      id: args.assignmentId,
      classroom: {
        institutionId: ctx.institutionId,
        ...(ctx.role === 'TEACHER' ? { teacherId: ctx.userId } : {}),
      },
    },
    select: {
      id: true, title: true, dueDate: true, classroomId: true,
      students: {
        select: {
          userId: true, status: true, problemsSolved: true,
          user: { select: { id: true, name: true, email: true, collegeId: true } },
        },
      },
    },
  });

  if (!assignment) throw new Error('Assignment not found or access denied');

  const now = new Date();
  return {
    assignmentId: assignment.id,
    title: assignment.title,
    dueDate: assignment.dueDate,
    students: assignment.students.map(s => ({
      studentId: s.user.id,
      name: s.user.name,
      email: s.user.email,
      collegeId: s.user.collegeId,
      status: s.status,
      problemsSolved: s.problemsSolved,
      isOverdue: assignment.dueDate ? new Date(assignment.dueDate) < now && s.status !== 'COMPLETED' : false,
    })),
  };
}

import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';
import { stripPII } from '../../security/piiGuard';

export async function getStudentProgressImpl(
  args: { studentId: string },
  ctx: AgentContext
) {
  const student = await prisma.user.findFirst({
    where: {
      id: args.studentId,
      institutionId: ctx.institutionId,
      enrolledClassrooms: ctx.role === 'TEACHER'
        ? { some: { teacherId: ctx.userId } }
        : { some: { institutionId: ctx.institutionId } },
    },
    select: {
      id: true, name: true, email: true, totalScore: true, problemsSolved: true,
      currentStreak: true, longestStreak: true, collegeId: true, collegeName: true,
      branch: true, year: true, image: true,
    },
  });

  if (!student) throw new Error('Student not found or access denied');

  const totalAssignments = await prisma.assignment.count({
    where: { classroom: { students: { some: { id: args.studentId } } } },
  });

  const completedAssignments = await prisma.assignmentStudent.count({
    where: { userId: args.studentId, status: 'COMPLETED' },
  });

  const completionRate = totalAssignments > 0
    ? Math.round((completedAssignments / totalAssignments) * 100)
    : 0;

  return {
    ...stripPII(student),
    assignmentCompletionRate: completionRate,
  };
}

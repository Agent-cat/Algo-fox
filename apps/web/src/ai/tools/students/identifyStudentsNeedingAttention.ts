import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';
import { stripPII, AIStudent } from '../../security/piiGuard';

export async function identifyStudentsNeedingAttentionImpl(
  args: { classroomId: string; thresholdDays?: number },
  ctx: AgentContext
): Promise<AIStudent[]> {
  const threshold = args.thresholdDays ?? 14;
  const cutoff = new Date(Date.now() - threshold * 24 * 60 * 60 * 1000);

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
  });

  if (students.length === 0) return [];

  const studentIds = students.map(s => s.id);

  const [lastSubmissions, tagMastery] = await Promise.all([
    prisma.submission.groupBy({
      by: ['userId'],
      where: { userId: { in: studentIds }, mode: 'SUBMIT' },
      _max: { createdAt: true },
    }),
    prisma.submission.findMany({
      where: { userId: { in: studentIds }, mode: 'SUBMIT' },
      select: {
        userId: true,
        problemId: true,
        status: true,
        problem: { select: { topicTags: { select: { id: true, name: true } } } },
      },
    }),
  ]);

  const lastSubMap = new Map(
    lastSubmissions.map(r => [r.userId, r._max.createdAt])
  );

  // Build per-student weak topics (mastery < 40)
  const studentWeakTopics = new Map<string, Set<string>>();
  const studentTopicScores = new Map<string, Map<string, { solved: number; total: number }>>();

  for (const sub of tagMastery) {
    for (const tag of sub.problem.topicTags) {
      if (!studentTopicScores.has(sub.userId)) {
        studentTopicScores.set(sub.userId, new Map());
      }
      const topicMap = studentTopicScores.get(sub.userId)!;
      if (!topicMap.has(tag.name)) {
        topicMap.set(tag.name, { solved: 0, total: 0 });
      }
      const stats = topicMap.get(tag.name)!;
      stats.total++;
      if (sub.status === 'ACCEPTED') stats.solved++;
    }
  }

  for (const [userId, topicMap] of studentTopicScores) {
    const weak = new Set<string>();
    for (const [topic, stats] of topicMap) {
      const mastery = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0;
      if (mastery < 40) weak.add(topic);
    }
    studentWeakTopics.set(userId, weak);
  }

  const result: AIStudent[] = [];
  for (const student of students) {
    const lastSub = lastSubMap.get(student.id);
    const isInactive = !lastSub || lastSub < cutoff;
    const weakTopics = studentWeakTopics.get(student.id);
    const hasWeakTopics = weakTopics && weakTopics.size > 0;

    if (isInactive && hasWeakTopics) {
      result.push(stripPII(student) as AIStudent);
    }
  }

  return result;
}

import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';

export async function searchProblemsImpl(
  args: { topicTags?: string[]; difficulty?: string; limit?: number },
  ctx: AgentContext
) {
  const where: Record<string, unknown> = { hidden: false };

  if (args.difficulty) {
    where.difficulty = args.difficulty.toUpperCase();
  }

  if (args.topicTags && args.topicTags.length > 0) {
    where.topicTags = {
      some: {
        name: { in: args.topicTags, mode: 'insensitive' },
      },
    };
  }

  const problems = await prisma.problem.findMany({
    where,
    select: {
      id: true, title: true, difficulty: true,
      topicTags: { select: { id: true, name: true } },
    },
    take: args.limit ?? 30,
    orderBy: { createdAt: 'desc' },
  });

  return problems.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    topicTags: p.topicTags.map(t => t.name),
  }));
}

import { prisma } from '@algofox/db';
import { AgentContext } from '../../agent/context';

export async function saveQueryImpl(
  args: { name: string; query: string },
  ctx: AgentContext
) {
  const existing = await prisma.aISavedQuery.findUnique({
    where: { userId_name: { userId: ctx.userId, name: args.name } },
  });

  if (existing) {
    await prisma.aISavedQuery.update({
      where: { id: existing.id },
      data: { query: args.query },
    });
    return { saved: true, overwritten: true };
  }

  await prisma.aISavedQuery.create({
    data: {
      name: args.name,
      query: args.query,
      institutionId: ctx.institutionId,
      userId: ctx.userId,
    },
  });

  return { saved: true, overwritten: false };
}

export async function listSavedQueriesImpl(ctx: AgentContext) {
  const queries = await prisma.aISavedQuery.findMany({
    where: { userId: ctx.userId },
    select: { id: true, name: true, query: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  return queries;
}

export async function runSavedQueryImpl(
  args: { queryId: string },
  ctx: AgentContext
) {
  const query = await prisma.aISavedQuery.findFirst({
    where: { id: args.queryId, userId: ctx.userId },
  });

  if (!query) throw new Error('Saved query not found');
  return { queryText: query.query };
}

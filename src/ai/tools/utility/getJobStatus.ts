import { prisma } from '@/lib/prisma';
import { AgentContext } from '../../agent/context';

export async function getJobStatusImpl(
  args: { jobId: string },
  ctx: AgentContext
) {
  const job = await prisma.aIAgentJob.findFirst({
    where: {
      id: args.jobId,
      userId: ctx.userId,
    },
  });

  if (!job) throw new Error('Job not found');

  return {
    id: job.id,
    type: job.type,
    status: job.status,
    progress: job.progress,
    result: job.result,
    createdAt: job.createdAt,
  };
}

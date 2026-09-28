import { prisma } from '@algofox/db';
import { Prisma } from '@prisma/client';
import { AgentContext } from '../agent/context';
import { ActionType } from '../security/permissions';

interface CreateActionInput {
  toolName: string;
  actionType: ActionType;
  arguments: Record<string, unknown>;
  requiresApproval?: boolean;
  conversationId?: string;
}

export async function createAction(
  input: CreateActionInput,
  ctx: AgentContext
) {
  try {
    return await prisma.aIAgentAction.create({
      data: {
        toolName: input.toolName,
        actionType: input.actionType,
        arguments: input.arguments,
        requiresApproval: input.requiresApproval ?? false,
        status: 'PENDING',
        institutionId: ctx.institutionId,
        userId: ctx.userId,
        conversationId: input.conversationId ?? null,
      },
    });
  } catch {
    return null;
  }
}

interface UpdateActionInput {
  id: string;
  status?: 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'PERMISSION_DENIED' | 'BLOCKED';
  result?: Prisma.InputJsonValue;
  errorMessage?: string;
  approved?: boolean;
  approvedAt?: Date;
}

export async function updateAction(input: UpdateActionInput) {
  try {
    return await prisma.aIAgentAction.update({
      where: { id: input.id },
      data: {
        ...(input.status && { status: input.status }),
        ...(input.result !== undefined && { result: input.result }),
        ...(input.errorMessage !== undefined && { errorMessage: input.errorMessage }),
        ...(input.approved !== undefined && { approved: input.approved }),
        ...(input.approvedAt !== undefined && { approvedAt: input.approvedAt }),
      },
    });
  } catch {
    return null;
  }
}

export async function getAction(id: string) {
  return prisma.aIAgentAction.findUnique({ where: { id } });
}

import { DynamicStructuredTool } from '@langchain/core/tools';
import { AgentContext } from './context';
import { TOOL_PERMISSION_MAP, TOOL_ACTION_TYPE_MAP } from '../security/permissions';
import { createAction, updateAction } from '../audit/logAction';
import { stripPII } from '../security/piiGuard';

export interface ToolCallResult {
  type: 'success' | 'approval_required' | 'permission_denied' | 'error';
  actionId?: string;
  result?: unknown;
  preview?: Record<string, unknown>;
  error?: string;
}

export async function executeTool(
  tool: DynamicStructuredTool,
  args: Record<string, unknown>,
  ctx: AgentContext,
  conversationId?: string
): Promise<ToolCallResult> {
  const toolName = tool.name;
  const requiredPermission = TOOL_PERMISSION_MAP[toolName];
  const actionType = TOOL_ACTION_TYPE_MAP[toolName];

  if (requiredPermission && !ctx.permissions.includes(requiredPermission)) {
    const action = await createAction({
      toolName,
      actionType: actionType || 'READ',
      arguments: args,
      conversationId,
    }, ctx);

    if (action) {
      await updateAction({ id: action.id, status: 'PERMISSION_DENIED' });
    }

    return { type: 'permission_denied', error: `Permission denied: ${requiredPermission} required` };
  }

  const isWrite = actionType && actionType !== 'READ';

  const action = await createAction({
    toolName,
    actionType: actionType || 'READ',
    arguments: args,
    requiresApproval: isWrite,
    conversationId,
  }, ctx);

  if (isWrite) {
    return {
      type: 'approval_required',
      actionId: action?.id,
      preview: args,
    };
  }

  try {
    const rawResult = await tool.invoke(args);
    const parsed = typeof rawResult === 'string' ? JSON.parse(rawResult) : rawResult;
    const safe = typeof parsed === 'object' && parsed !== null ? stripPII(parsed as Record<string, unknown>) : parsed;

    if (action) {
      await updateAction({ id: action.id, status: 'SUCCESS', result: safe as any });
    }

    return { type: 'success', result: safe };
  } catch (error) {
    if (action) {
      await updateAction({ id: action.id, status: 'FAILED', errorMessage: String(error) });
    }
    return { type: 'error', error: String(error) };
  }
}

export async function executeApprovedTool(
  tool: DynamicStructuredTool,
  args: Record<string, unknown>,
  actionId: string,
  ctx: AgentContext
): Promise<ToolCallResult> {
  try {
    const rawResult = await tool.invoke(args);
    const parsed = typeof rawResult === 'string' ? JSON.parse(rawResult) : rawResult;
    const safe = typeof parsed === 'object' && parsed !== null ? stripPII(parsed as Record<string, unknown>) : parsed;

    await updateAction({
      id: actionId,
      status: 'SUCCESS',
      result: safe as any,
      approved: true,
      approvedAt: new Date(),
    });

    return { type: 'success', result: safe };
  } catch (error) {
    await updateAction({ id: actionId, status: 'FAILED', errorMessage: String(error) });
    return { type: 'error', error: String(error) };
  }
}

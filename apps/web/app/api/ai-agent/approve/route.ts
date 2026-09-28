import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@algofox/auth';
import { approveAction } from '@/src/ai/agent/runtime';
import { AgentContext } from '@/src/ai/agent/context';
import { TEACHER_PERMISSIONS, INSTITUTION_MANAGER_PERMISSIONS } from '@/src/ai/security/permissions';

function buildAgentContext(session: { user: any }): AgentContext | null {
  const user = session.user;
  const role = user.role as string;
  if (role !== 'TEACHER' && role !== 'INSTITUTION_MANAGER') return null;
  if (!user.institutionId) return null;

  return {
    userId: user.id,
    institutionId: user.institutionId,
    role: role as AgentContext['role'],
    permissions: role === 'INSTITUTION_MANAGER'
      ? INSTITUTION_MANAGER_PERMISSIONS
      : TEACHER_PERMISSIONS,
  };
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ctx = buildAgentContext(session as { user: any });
  if (!ctx) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { actionId } = await req.json();
    if (!actionId) {
      return NextResponse.json({ error: 'actionId required' }, { status: 400 });
    }

    const result = await approveAction(actionId, ctx);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[AI Agent Approve] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

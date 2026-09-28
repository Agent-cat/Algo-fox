import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@algofox/auth';
import { runAgentTurn } from '@/src/ai/agent/runtime';
import { AgentContext } from '@/src/ai/agent/context';
import { TEACHER_PERMISSIONS, INSTITUTION_MANAGER_PERMISSIONS } from '@/src/ai/security/permissions';
import { prisma } from '@algofox/db';

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

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ctx = buildAgentContext(session as { user: any });
  if (!ctx) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  // Load messages for a specific conversation
  if (conversationId) {
    const conversation = await prisma.aIAgentConversation.findFirst({
      where: { id: conversationId, userId: ctx.userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            role: true,
            content: true,
            metadata: true,
            createdAt: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.createdAt,
      },
      messages: conversation.messages.map(m => ({
        id: m.id,
        role: m.role === 'USER' ? 'user' : m.role === 'ASSISTANT' ? 'assistant' : 'system',
        content: m.content,
        metadata: m.metadata,
        createdAt: m.createdAt,
      })),
    });
  }

  // List all conversations
  const conversations = await prisma.aIAgentConversation.findMany({
    where: { userId: ctx.userId },
    orderBy: { updatedAt: 'desc' },
    take: 50,
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        select: { content: true },
      },
    },
  });

  return NextResponse.json({
    conversations: conversations.map(c => ({
      id: c.id,
      title: c.title || 'New Chat',
      lastMessage: c.messages[0]?.content?.slice(0, 80) || '',
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })),
  });
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
    const body = await req.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const result = await runAgentTurn(message, conversationId ?? null, ctx);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[AI Agent] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

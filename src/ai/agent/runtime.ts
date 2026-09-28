import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessage, SystemMessage, ToolMessage, BaseMessage } from '@langchain/core/messages';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { prisma } from '@/lib/prisma';
import { AgentContext } from './context';
import { buildTools } from '../tools/index';
import { executeTool } from './executor';
import { sanitizeMessage } from '../security/injectionGuard';
import { checkRateLimit } from '../security/rateLimiter';

const MAX_HISTORY = 20;
const MAX_ITERATIONS = 10;

function buildSystemPrompt(ctx: AgentContext): string {
  return `You are Algo-fox AI Copilot — an intelligent assistant for teachers and institution managers.

## Context
Role: ${ctx.role === 'TEACHER' ? 'Teacher' : 'Institution Manager'}
Institution: ${ctx.institutionId}
User: ${ctx.userId}

## Tools (use them proactively)
Students: searchStudents, getStudentProgress, getStudentSubmissions, getInactiveStudents, identifyStudentsNeedingAttention
Classrooms: listClassrooms, getClassroomStudents, createClassroom
Assignments: createAssignment, searchProblems, getAssignmentPerformance, getClassroomTopicPerformance
Reports: generateClassReport
Quizzes: createQuiz, assignQuizToClassroom
Import: importStudents
Analytics: getContestAnalytics
Saved: saveQuery, listSavedQueries

## Intelligence Rules
1. **Context understanding**: If user says "test-1-ai" after "create a classroom", they mean the classroom name is "test-1-ai". Always use conversation context to resolve ambiguous or short messages.
2. **Clarifying questions**: When the user's request is ambiguous, ask ONE clear question to disambiguate. Examples:
   - "Create a classroom" → Ask: "What would you like to name the classroom?"
   - "Find inactive students" → Ask: "Which classroom? Or should I check all your classrooms?"
   - "Create an assignment" → Ask: "Which classroom is this for, and what topic/difficulty?"
3. **Proactive suggestions**: After completing an action, suggest relevant next steps. Example: After creating a classroom → "Want me to import students or create an assignment for this classroom?"
4. **Smart defaults**: Use sensible defaults. If user says "create an assignment for Class 10A", use reasonable defaults for difficulty, deadline, etc. and show the preview for confirmation.
5. **Multi-step workflows**: For complex requests, break them into steps and execute sequentially. Example: "Add students to my new classroom" → First list classrooms to find the right one, then import students.
6. **Never expose PII**: Never ask for or display phone, dateOfBirth, gender, address, educationDetails, experienceDetails.
7. **Confirm destructive actions**: Always show a preview and get explicit "yes" before CREATE, UPDATE, DELETE, IMPORT.
8. **Concise responses**: Use tables, bullet points, and markdown. Avoid long paragraphs.
9. **Error recovery**: If a tool fails, explain what happened and suggest an alternative approach.
10. **Remember context**: Reference earlier messages in the conversation. If user asked about a classroom before, don't ask again.`;
}

function mapMessages(dbMessages: { role: string; content: string }[]) {
  return dbMessages.map(m => {
    switch (m.role) {
      case 'USER': return new HumanMessage(m.content);
      case 'ASSISTANT': return new AIMessage(m.content);
      case 'SYSTEM': return new SystemMessage(m.content);
      default: return new HumanMessage(m.content);
    }
  });
}

export interface AgentTurnResult {
  success: boolean;
  response?: string;
  conversationId?: string;
  approvalRequired?: { actionId: string; preview: Record<string, unknown>; toolName: string };
  error?: string;
}

export async function runAgentTurn(
  userMessage: string,
  conversationId: string | null,
  ctx: AgentContext,
  onToken?: (token: string) => void
): Promise<AgentTurnResult> {
  // 1. Injection check
  const injection = sanitizeMessage(userMessage);
  if (!injection.safe) {
    return { success: false, error: 'Your message was blocked for security reasons.' };
  }

  // 2. Rate limit check
  const rateLimit = await checkRateLimit(ctx.userId);
  if (!rateLimit.allowed) {
    return { success: false, error: rateLimit.reason === 'RATE_LIMIT_EXCEEDED'
      ? `Rate limit exceeded. Try again in ${rateLimit.retryAfter} seconds.`
      : 'Service temporarily unavailable.' };
  }

  // 3. Load or create conversation
  let convId = conversationId;
  if (!convId) {
    const conv = await prisma.aIAgentConversation.create({
      data: {
        institutionId: ctx.institutionId,
        userId: ctx.userId,
        title: userMessage.slice(0, 100),
      },
    });
    convId = conv.id;
  }

  // 4. Persist user message
  try {
    await prisma.aIAgentMessage.create({
      data: {
        conversationId: convId,
        role: 'USER',
        content: injection.sanitized,
      },
    });
  } catch {
    return { success: false, error: 'Failed to save message. Please try again.', conversationId: convId };
  }

  // 5. Load chat history (exclude the message we just saved)
  const dbMessages = await prisma.aIAgentMessage.findMany({
    where: { conversationId: convId },
    orderBy: { createdAt: 'asc' },
    take: MAX_HISTORY,
  });

  // Exclude the last message (which is the one we just saved) to avoid duplication
  const chatHistory = mapMessages(dbMessages.slice(0, -1));

  // 6. Build tools and model
  const tools = buildTools(ctx);
  const toolMap = new Map(tools.map(t => [t.name, t]));

  // Valid Gemini models: gemini-2.0-flash is stable; -lite variant was retired (404).
  // Allow override via GEMINI_MODEL env var for future-proofing.
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

  const llm = new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.3,
  });

  const llmWithTools = llm.bindTools(tools);

  // 7. Agent loop
  let response: string = '';
  const messages: BaseMessage[] = [
    new SystemMessage(buildSystemPrompt(ctx)),
    ...chatHistory,
    new HumanMessage(injection.sanitized),
  ];

  function extractText(content: unknown): string {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map((p: any) => (typeof p === 'string' ? p : p?.text ?? '')).join('');
    }
    return '';
  }

  // Mutable so we can fallback to a known-good model on 404
  let currentModelName = modelName;
  let currentLlmWithTools: any = llmWithTools;

  const FALLBACK_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];

  async function invokeWithRetry(msgs: BaseMessage[], retries = 3): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await currentLlmWithTools.invoke(msgs);
      } catch (err: any) {
        const msg: string = err?.message || '';
        const is429 = msg.includes('429') || err?.name === 'RateLimitQuotaExhaustedError';
        const is404ModelNotFound = msg.includes('404') && (msg.includes('models/') || msg.includes('generateContent'));

        // Fallback on retired/invalid model (e.g. gemini-2.0-flash-lite → gemini-2.0-flash)
        if (is404ModelNotFound) {
          const tried = new Set([currentModelName]);
          const fallback = FALLBACK_MODELS.find(m => !tried.has(m));
          if (fallback) {
            console.warn(`[AI Agent] Model ${currentModelName} not found (404), falling back to ${fallback}`);
            currentModelName = fallback;
            const fallbackLlm = new ChatGoogleGenerativeAI({
              model: fallback,
              apiKey: process.env.GEMINI_API_KEY,
              temperature: 0.3,
            });
            currentLlmWithTools = fallbackLlm.bindTools(tools);
            // retry immediately without counting towards rate-limit retries
            continue;
          }
        }

        if (is429 && attempt < retries) {
          const delay = Math.min(2000 * Math.pow(2, attempt), 30000);
          console.warn(`[AI Agent] Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw err;
      }
    }
  }

  try {
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const result = await invokeWithRetry(messages);

    // Tool calls
    if (result.tool_calls && result.tool_calls.length > 0) {
      messages.push(result);

      for (const toolCall of result.tool_calls) {
        const tool = toolMap.get(toolCall.name);
        if (!tool) {
          const toolMsg = new ToolMessage({
            content: `Tool ${toolCall.name} not found`,
            tool_call_id: toolCall.id!,
          });
          messages.push(toolMsg);
          continue;
        }

        const execResult = await executeTool(tool, toolCall.args as Record<string, unknown>, ctx, convId);

        if (execResult.type === 'approval_required') {
          // Save assistant message
          const previewText = `I need your confirmation to ${toolCall.name}.`;
          await prisma.aIAgentMessage.create({
            data: {
              conversationId: convId,
              role: 'ASSISTANT',
              content: previewText,
              metadata: JSON.stringify({
                type: 'confirmation_required',
                actionId: execResult.actionId,
                toolName: toolCall.name,
                preview: execResult.preview,
              }),
            },
          });

          return {
            success: true,
            response: previewText,
            conversationId: convId,
            approvalRequired: {
              actionId: execResult.actionId!,
              preview: execResult.preview!,
              toolName: toolCall.name,
            },
          };
        }

        if (execResult.type === 'permission_denied') {
          const toolMsg = new ToolMessage({
            content: execResult.error || 'Permission denied',
            tool_call_id: toolCall.id!,
          });
          messages.push(toolMsg);
          continue;
        }

        const toolMsg = new ToolMessage({
          content: JSON.stringify(execResult.result ?? execResult.error),
          tool_call_id: toolCall.id!,
        });
        messages.push(toolMsg);
      }
    } else {
      // Text response — done
      response = extractText(result.content);
      break;
    }
    }
  } catch (error: any) {
    console.error('[AI Agent] LLM error:', error);
    const msg = error?.message || String(error);
    if (msg.includes('429') || msg.includes('RateLimit') || msg.includes('quota')) {
      return { success: false, error: 'AI service is temporarily rate-limited. Please try again in a few minutes.' };
    }
    if (msg.includes('404') && msg.includes('models/')) {
      return { success: false, error: `AI model "${currentModelName}" is unavailable (404). Admin: set GEMINI_MODEL env to a valid model like gemini-2.0-flash and restart the server.` };
    }
    return { success: false, error: `AI service error: ${msg.slice(0, 300)}` };
  }

  // 8. Persist assistant message
  if (response && typeof response === 'string') {
    await prisma.aIAgentMessage.create({
      data: {
        conversationId: convId,
        role: 'ASSISTANT',
        content: response,
      },
    });
  }

  return { success: true, response: response || 'No response generated.', conversationId: convId };
}

export async function approveAction(
  actionId: string,
  ctx: AgentContext
): Promise<{ success: boolean; result?: unknown; error?: string }> {
  const { getAction } = await import('../audit/logAction');
  const { executeApprovedTool } = await import('./executor');
  const { buildTools } = await import('../tools/index');
  const { updateAction } = await import('../audit/logAction');

  const action = await getAction(actionId);
  if (!action) return { success: false, error: 'Action not found' };
  if (action.userId !== ctx.userId) return { success: false, error: 'Unauthorized' };
  if (action.status !== 'PENDING' || !action.requiresApproval) {
    return { success: false, error: 'Action is not pending approval' };
  }

  const tools = buildTools(ctx);
  const tool = tools.find(t => t.name === action.toolName);
  if (!tool) return { success: false, error: `Tool ${action.toolName} not found` };

  const result = await executeApprovedTool(tool, action.arguments as Record<string, unknown>, actionId, ctx);

  if (result.type === 'error') {
    return { success: false, error: result.error };
  }

  return { success: true, result: result.result };
}

export async function cancelAction(
  actionId: string,
  ctx: AgentContext
): Promise<{ success: boolean; error?: string }> {
  const { getAction, updateAction } = await import('../audit/logAction');

  const action = await getAction(actionId);
  if (!action) return { success: false, error: 'Action not found' };
  if (action.userId !== ctx.userId) return { success: false, error: 'Unauthorized' };
  if (action.status !== 'PENDING') return { success: false, error: 'Action is not pending' };

  await updateAction({ id: actionId, status: 'CANCELLED' });
  return { success: true };
}

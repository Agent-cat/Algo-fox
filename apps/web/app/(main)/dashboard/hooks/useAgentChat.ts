'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}

interface UseAgentChatReturn {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  sendMessage: (message?: string) => Promise<void>;
  approveAction: (actionId: string) => Promise<boolean>;
  cancelAction: (actionId: string) => Promise<boolean>;
  newChat: () => void;
  loadConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  conversations: Conversation[];
  refreshConversations: () => Promise<void>;
  activeConversationId: string | null;
  isLoading: boolean;
  isAwaitingConfirmation: boolean;
  pendingAction: { actionId: string; toolName: string; preview: Record<string, unknown> } | null;
  isLoadingHistory: boolean;
}

export function useAgentChat(): UseAgentChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [pendingAction, setPendingAction] = useState<UseAgentChatReturn['pendingAction']>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const counterRef = useRef(0);

  const refreshConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/ai-agent');
      const data = await res.json();
      if (data.conversations) {
        setConversations(data.conversations);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  const loadConversation = useCallback(async (id: string) => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`/api/ai-agent?conversationId=${id}`);
      const data = await res.json();
      if (data.messages) {
        conversationIdRef.current = id;
        setActiveConversationId(id);
        setMessages(data.messages.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          metadata: m.metadata,
          createdAt: new Date(m.createdAt),
        })));
      }
    } catch {
      // silent
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      await fetch(`/api/ai-agent/${id}`, { method: 'DELETE' });
      if (conversationIdRef.current === id) {
        conversationIdRef.current = null;
        setActiveConversationId(null);
        setMessages([]);
      }
      await refreshConversations();
    } catch {
      // silent
    }
  }, [refreshConversations]);

  const sendMessage = useCallback(async (message?: string) => {
    const text = message ?? input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${++counterRef.current}`,
      role: 'user',
      content: text.trim(),
      createdAt: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const loadingMsgId = `loading-${counterRef.current}`;
    setMessages(prev => [...prev, {
      id: loadingMsgId,
      role: 'assistant',
      content: '',
      createdAt: new Date(),
      isStreaming: true,
    }]);

    try {
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationId: conversationIdRef.current,
        }),
      });

      const data = await res.json();

      setMessages(prev => prev.filter(m => m.id !== loadingMsgId));

      if (!res.ok || data.success === false) {
        setMessages(prev => [...prev, {
          id: `error-${++counterRef.current}`,
          role: 'assistant',
          content: data.error || data.response || 'Something went wrong.',
          createdAt: new Date(),
        }]);
        return;
      }

      if (data.conversationId) {
        conversationIdRef.current = data.conversationId;
        setActiveConversationId(data.conversationId);
        await refreshConversations();
      }

      if (data.approvalRequired) {
        setPendingAction({
          actionId: data.approvalRequired.actionId,
          toolName: data.approvalRequired.toolName,
          preview: data.approvalRequired.preview,
        });
        setMessages(prev => [...prev, {
          id: `confirm-${++counterRef.current}`,
          role: 'assistant',
          content: data.response || `I need your confirmation to **${data.approvalRequired.toolName}**.`,
          metadata: { type: 'confirmation_required', ...data.approvalRequired },
          createdAt: new Date(),
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: `assistant-${++counterRef.current}`,
          role: 'assistant',
          content: data.response || 'No response.',
          createdAt: new Date(),
        }]);
      }
    } catch {
      setMessages(prev => prev.filter(m => m.id !== loadingMsgId));
      setMessages(prev => [...prev, {
        id: `error-${++counterRef.current}`,
        role: 'assistant',
        content: 'Network error. Please try again.',
        createdAt: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, refreshConversations]);

  const approveAction = useCallback(async (actionId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai-agent/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionId }),
      });
      const data = await res.json();
      setPendingAction(null);

      setMessages(prev => [...prev, {
        id: `result-${++counterRef.current}`,
        role: 'assistant',
        content: data.success
          ? `**Done!** Operation completed successfully.\n\n\`\`\`json\n${JSON.stringify(data.result, null, 2)}\n\`\`\``
          : `**Failed:** ${data.error}`,
        createdAt: new Date(),
      }]);
      return data.success;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelAction = useCallback(async (actionId: string): Promise<boolean> => {
    try {
      await fetch('/api/ai-agent/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionId }),
      });
      setPendingAction(null);
      setMessages(prev => [...prev, {
        id: `cancelled-${++counterRef.current}`,
        role: 'assistant',
        content: 'Operation cancelled.',
        createdAt: new Date(),
      }]);
      return true;
    } catch {
      return false;
    }
  }, []);

  const newChat = useCallback(() => {
    conversationIdRef.current = null;
    setActiveConversationId(null);
    setMessages([]);
    setPendingAction(null);
  }, []);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    approveAction,
    cancelAction,
    newChat,
    loadConversation,
    deleteConversation,
    conversations,
    refreshConversations,
    activeConversationId,
    isLoading,
    isAwaitingConfirmation: pendingAction !== null,
    pendingAction,
    isLoadingHistory,
  };
}

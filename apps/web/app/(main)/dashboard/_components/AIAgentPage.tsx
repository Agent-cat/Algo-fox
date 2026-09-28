'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@algofox/ui';
import { Input } from '@algofox/ui';
import { useAgentChat } from '../hooks/useAgentChat';
import { ChatMessageBubble } from './ChatMessage';
import { ConfirmationCard } from './ConfirmationCard';
import { Send, ArrowLeft, Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@algofox/utils';

const SUGGESTIONS = [
  'List all my classrooms',
  'Show inactive students',
  'Create a new assignment',
  'Generate a class report',
  'Find students who need attention',
  'Search problems by topic',
];

function ConversationItem({
  conv,
  isActive,
  onSelect,
  onDelete,
}: {
  conv: { id: string; title: string; lastMessage: string; updatedAt: string };
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={cn(
        'group flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200',
        isActive
          ? 'bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-950/30 dark:to-orange-950/10 text-orange-700 dark:text-orange-300 shadow-sm ring-1 ring-orange-200/60 dark:ring-orange-800/40'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'
      )}
      onClick={onSelect}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className={cn(
        'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
        isActive
          ? 'bg-orange-100 dark:bg-orange-900/40'
          : 'bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
      )}>
        <MessageSquare className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium truncate leading-tight">{conv.title}</div>
        {conv.lastMessage && (
          <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5 leading-snug">
            {conv.lastMessage}
          </div>
        )}
      </div>
      {showDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export function AIAgentPage() {
  const {
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
    activeConversationId,
    isLoading,
    isAwaitingConfirmation,
    pendingAction,
    isLoadingHistory,
  } = useAgentChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSelectConversation = (id: string) => {
    loadConversation(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white dark:bg-[#111113] overflow-hidden">
      {/* Sidebar */}
      <div className={cn(
        'flex flex-col border-r border-gray-200/80 dark:border-white/[0.06] bg-gray-50/50 dark:bg-[#0D0D0F] transition-all duration-300 flex-shrink-0 h-full',
        sidebarOpen ? 'w-[280px]' : 'w-0 overflow-hidden border-r-0'
      )}>
        {/* Sidebar Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-gray-900 dark:text-white tracking-tight">Conversations</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 hover:bg-gray-200/80 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <button
            onClick={() => { newChat(); }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200/80 dark:border-white/[0.08] rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-200 shadow-sm shadow-black/[0.02]"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2.5 pb-3 space-y-0.5 scrollbar-thin">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                No conversations yet.<br />Start chatting to see history here.
              </p>
            </div>
          ) : (
            conversations.map(conv => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                isActive={conv.id === activeConversationId}
                onSelect={() => handleSelectConversation(conv.id)}
                onDelete={() => deleteConversation(conv.id)}
              />
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="px-4 py-3 border-t border-gray-200/60 dark:border-white/[0.04]">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            <span className="font-medium">Gemini 2.0 Flash</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 h-14 border-b border-gray-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#111113]/80 backdrop-blur-xl flex-shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
            >
              <Menu className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-[13px] font-semibold text-gray-900 dark:text-white tracking-tight leading-none">AI Copilot</h1>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                {isLoading ? 'Thinking...' : 'Ask me anything'}
              </p>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-7 h-7 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-[13px] text-gray-400">Loading conversation...</span>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <h2 className="text-[28px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                How can I help?
              </h2>
              <p className="text-[15px] text-gray-500 dark:text-gray-400 text-center max-w-sm leading-relaxed mb-10">
                Manage classrooms, students, assignments, and analytics with natural language.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg w-full">
                {SUGGESTIONS.map((text) => (
                  <button
                    key={text}
                    onClick={() => { setInput(text); sendMessage(text); }}
                    className="text-left px-4 py-3.5 text-[13px] text-gray-600 dark:text-gray-400 bg-white dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.06] rounded-2xl hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-orange-200 dark:hover:border-orange-500/30 hover:text-gray-900 dark:hover:text-white transition-all duration-200 shadow-sm shadow-black/[0.015] font-medium"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map(msg => (
                <div key={msg.id}>
                  <ChatMessageBubble message={msg} />
                  {msg.metadata?.type === 'confirmation_required' && pendingAction && (
                    <div className="max-w-3xl mx-auto px-6 pb-4">
                      <ConfirmationCard
                        actionId={pendingAction.actionId}
                        toolName={pendingAction.toolName}
                        preview={pendingAction.preview}
                        onConfirm={approveAction}
                        onCancel={cancelAction}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200/80 dark:border-white/[0.06] bg-white dark:bg-[#111113] px-4 py-4 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className={cn(
              'relative flex items-center gap-2 rounded-2xl transition-all duration-200',
              'bg-gray-50 dark:bg-white/[0.04]',
              'border border-gray-200/80 dark:border-white/[0.08]',
              'shadow-sm shadow-black/[0.02]',
              'focus-within:border-orange-300 dark:focus-within:border-orange-500/40',
              'focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]',
              'focus-within:bg-white dark:focus-within:bg-white/[0.06]'
            )}>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAwaitingConfirmation ? 'Waiting for confirmation...' : 'Message AI Copilot...'}
                disabled={isLoading || isAwaitingConfirmation}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-[46px] py-0 pl-4 pr-2 text-[14px] placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-none"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={isLoading || isAwaitingConfirmation || !input.trim()}
                size="icon"
                className={cn(
                  'h-9 w-9 rounded-xl flex-shrink-0 transition-all duration-200 mr-1.5',
                  input.trim()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25'
                    : 'bg-gray-200/80 dark:bg-white/[0.06] text-gray-400 dark:text-gray-500'
                )}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-[11px] text-gray-300 dark:text-gray-600 text-center mt-2.5 font-medium">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

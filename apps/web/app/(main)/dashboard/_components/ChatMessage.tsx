'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@algofox/utils';
import { User } from 'lucide-react';
import type { ChatMessage } from '../hooks/useAgentChat';

interface ChatMessageProps {
  message: ChatMessage;
}

function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (message.isStreaming) {
    return (
      <div className="flex gap-4 py-8 px-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex-shrink-0 shadow-lg shadow-orange-500/20" />
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[13px] font-semibold text-gray-900 dark:text-white tracking-tight">AI Copilot</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
            <div className="flex gap-[5px]">
              <div className="w-[5px] h-[5px] bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-[5px] h-[5px] bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-[5px] h-[5px] bg-orange-400 rounded-full animate-bounce" />
            </div>
            <span className="text-[12px] font-medium">Thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isSystem) {
    return (
      <div className="flex gap-4 py-4 px-6">
        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">!</span>
        </div>
        <div className="flex-1 min-w-0 text-[13px] text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/15 rounded-2xl px-4 py-3 leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'flex gap-4 px-6',
      isUser ? 'py-5' : 'py-8',
      !isUser && 'bg-gray-50/50 dark:bg-white/[0.01]'
    )}>
      <div className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
        isUser
          ? 'bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/[0.06]'
          : 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-lg shadow-orange-500/20'
      )}>
        {isUser && <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="text-[13px] font-semibold text-gray-900 dark:text-white tracking-tight">
            {isUser ? 'You' : 'AI Copilot'}
          </span>
          <span className="text-[11px] text-gray-300 dark:text-gray-600 font-medium">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
        <div className={cn(
          'prose prose-[13px] dark:prose-invert max-w-none leading-relaxed',
          'prose-p:my-2.5 prose-p:leading-relaxed',
          'prose-pre:my-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200/80 dark:prose-pre:border-white/[0.08]',
          'prose-pre:bg-gray-50 dark:prose-pre:bg-white/[0.03]',
          'prose-code:text-orange-600 dark:prose-code:text-orange-400',
          'prose-code:bg-orange-50 dark:prose-code:bg-orange-500/10',
          'prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[12px] prose-code:font-medium',
          'prose-code:before:content-none prose-code:after:content-none',
          'prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold',
          'prose-li:marker:text-orange-400',
          'prose-hr:border-gray-200 dark:prose-hr:border-white/[0.08]',
        )}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Bot } from 'lucide-react';

export function AIAgentToggle() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/ai')}
      className="fixed bottom-6 right-6 z-[9999] h-12 px-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl flex items-center gap-2 transition-all hover:scale-105 font-medium text-sm"
      title="AI Copilot"
    >
      <Bot className="w-5 h-5" />
      <span>AI Copilot</span>
    </button>
  );
}

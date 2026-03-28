"use client";

import React, { useState } from 'react';
import { StreakCelebrationModal } from '@/components/shared/StreakCelebrationModal';
import { Button } from '@/components/ui/button';

export default function StreakTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(5);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white">Streak UI Testing</h1>
        <p className="text-gray-400">Click the button below to trigger the celebration modal</p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setStreak(prev => Math.max(1, prev - 1))}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
        >
          -
        </button>
        <span className="text-3xl font-bold text-white w-12 text-center">{streak}</span>
        <button
          onClick={() => setStreak(prev => prev + 1)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
        >
          +
        </button>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold text-white shadow-[0_0_30px_rgba(234,88,12,0.3)] transition-all hover:scale-105 active:scale-95"
      >
        Trigger Streak Modal
      </button>

      <StreakCelebrationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentStreak={streak}
      />
    </div>
  );
}

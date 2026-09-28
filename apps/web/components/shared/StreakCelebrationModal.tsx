"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStreak } from '@/context/StreakContext';

interface StreakCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
}

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({ isOpen, onClose, currentStreak }) => {
  const { triggerFlight } = useStreak();
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Trigger flight animation
        if (flameRef.current) {
          const rect = flameRef.current.getBoundingClientRect();
          triggerFlight({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          }, currentStreak);
        }
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, triggerFlight, currentStreak]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.95, transition: { duration: 0.15 } }}
          className="fixed bottom-10 left-1/2 z-9999 pointer-events-none"
        >
          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-2.5 flex items-center gap-4 shadow-2xl ring-1 ring-black/5 dark:ring-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div ref={flameRef} className="p-1 bg-orange-500/10 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <span className="text-gray-900 dark:text-white font-black text-xl tracking-tighter">
                {currentStreak}
              </span>
            </div>

            <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />

            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                Day Streak
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

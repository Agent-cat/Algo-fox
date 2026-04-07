"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakEndedNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  lastStreak: number;
}

export const StreakEndedNotification: React.FC<StreakEndedNotificationProps> = ({ isOpen, onClose, lastStreak }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <div className="p-1 bg-gray-500/10 rounded-lg">
                <Flame className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="font-black text-xl tracking-tighter">
                0
              </span>
            </div>

            <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />

            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                Streak Ended
              </span>
              <span className="text-[9px] text-gray-400 dark:text-gray-600 font-medium whitespace-nowrap">
                It was {lastStreak} days! Play today to start a new one.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

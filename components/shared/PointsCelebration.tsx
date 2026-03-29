"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';

interface PointsCelebrationProps {
  points: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PointsCelebration: React.FC<PointsCelebrationProps> = ({ points, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15 } }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-10000 pointer-events-none"
        >
          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-2.5 flex items-center gap-4 shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-500/10 rounded-lg">
                <Coins className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-gray-900 dark:text-white font-black text-xl">+{points}</span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />
            <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
              Points Gained
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

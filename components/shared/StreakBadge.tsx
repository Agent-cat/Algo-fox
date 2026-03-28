"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStreak } from '@/context/StreakContext';
import { cn } from '@/lib/utils';

export const StreakBadge = () => {
    const { streak, badgeRef, isPulsing, isFlying } = useStreak();

    if (streak <= 0 && !isFlying) return null;

    return (
        <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, x: 10 }}
            animate={{
                opacity: 1,
                x: 0,
                scale: isPulsing ? [1, 1.3, 1] : 1
            }}
            whileHover={{ scale: 1.05 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                scale: {
                    duration: 0.5,
                    ease: "easeOut",
                    times: [0, 0.5, 1]
                }
            }}
            className={cn(
                "relative flex items-center gap-1 px-1",
                "group cursor-pointer"
            )}
        >
            {/* Glow effect on pulse */}
            <AnimatePresence>
                {isPulsing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.6, scale: 2.5 }}
                        exit={{ opacity: 0, scale: 3 }}
                        className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl z-[-1]"
                    />
                )}
            </AnimatePresence>

            <Flame className={cn(
                "w-4 h-4 text-orange-500 transition-transform duration-500",
                "group-hover:scale-110",
                isPulsing && "animate-pulse"
            )} fill="currentColor" />

            <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">
              {streak}
            </span>

            {/* Subtle background fire particles or micro-animation would go here */}
            {/* For now, just a clean, premium badge */}
        </motion.div>
    );
};

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import confetti from 'canvas-confetti';

import { useStreak } from '@/context/StreakContext';

interface StreakCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
}

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({ isOpen, onClose, currentStreak }) => {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { triggerFlight } = useStreak();
  const fireRef = React.useRef<HTMLDivElement>(null);

  const handleCollect = useCallback(() => {
    if (fireRef.current) {
      const rect = fireRef.current.getBoundingClientRect();
      const pos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      triggerFlight(pos, currentStreak);
    }
    // Call onClose unconditionally
    onClose();
  }, [onClose, currentStreak, triggerFlight]);

  // Accessibility: Listen for Escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCollect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCollect]);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      setShowContent(true);
      // Tasteful confetti burst
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#f97316', '#fb923c', '#fbbf24', '#ffffff']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#f97316', '#fb923c', '#fbbf24', '#ffffff']
        });
      }, 250);

      // Auto trigger flight after 4 seconds of celebration
      const timer = setTimeout(() => {
        handleCollect();
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
        setShowContent(false);
    }
  }, [isOpen, handleCollect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="streak-celebration-title"
          aria-describedby="streak-celebration-desc"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-hidden"
        >
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCollect}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container: Slightly Wider */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            className="relative w-full max-w-sm bg-neutral-950 border border-white/5 rounded-[3rem] p-12 shadow-2xl overflow-hidden text-center"
          >
            <span id="streak-celebration-title" className="sr-only">Streak Celebration</span>
            <p id="streak-celebration-desc" className="sr-only">Congratulations on your {currentStreak} day streak!</p>

            <div className="flex flex-col items-center gap-4 relative z-10">
              {/* Top: Fire Icon with Duolingo-style Background Flare */}
              <div ref={fireRef} className="relative w-40 h-40">
                {/* Background Lottie Sparkles/Flare */}
                <div className="absolute inset-x-[-50%] inset-y-[-50%] opacity-60">
                  {isMounted && (
                    <DotLottieReact
                      src="https://lottie.host/0a8f8d21-f4f7-4328-9104-d558d1973950/7n3J6TqXN8.lottie"
                      loop
                      autoplay
                    />
                  )}
                </div>

                {/* Foreground Fire Icon */}
                <div className="relative w-full h-full drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  {isMounted && (
                    <DotLottieReact
                      src="https://lottie.host/435935f7-75ab-4fd4-8802-8d61b37d2211/AeWSRZQ40D.lottie"
                      loop
                      autoplay
                    />
                  )}
                </div>
              </div>

              {/* Middle: Premium Typography Area */}
              <div className="flex flex-col items-center gap-0">
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="text-8xl font-black text-white leading-none tracking-[-0.05em] select-none"
                >
                  {currentStreak}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-orange-500 text-2xl font-bold tracking-tight mt-0.5"
                >
                  Days streak
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

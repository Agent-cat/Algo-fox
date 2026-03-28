"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { authClient } from "@/lib/auth-client";

interface StreakContextType {
  streak: number;
  setStreak: (val: number) => void;
  triggerFlight: (startPos: { x: number; y: number }, newValue: number) => void;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  isPulsing: boolean;
  isFlying: boolean;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const [streak, setStreak] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [flightStart, setFlightStart] = useState({ x: 0, y: 0 });
  const [pendingValue, setPendingValue] = useState(0);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Sync with session when it loads
  useEffect(() => {
    if (session?.user) {
      setStreak((session.user as any).currentStreak || 0);
    }
  }, [session]);

  const triggerFlight = useCallback((startPos: { x: number; y: number }, newValue: number) => {
    setFlightStart(startPos);
    setPendingValue(newValue);
    setIsFlying(true);
  }, []);

  const onFlightComplete = useCallback(() => {
    setStreak(pendingValue);
    setIsFlying(false);
    setIsPulsing(true);
    // Stop pulsing after a short delay
    setTimeout(() => setIsPulsing(false), 2000);
  }, [pendingValue]);

  return (
    <StreakContext.Provider value={{ streak, setStreak, triggerFlight, badgeRef, isPulsing, isFlying }}>
      {children}
      <AnimatePresence>
        {isFlying && (
          <FlyingFire
            start={flightStart}
            endRef={badgeRef}
            onComplete={onFlightComplete}
          />
        )}
      </AnimatePresence>
    </StreakContext.Provider>
  );
}

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) throw new Error("useStreak must be used within StreakProvider");
  return context;
};

function FlyingFire({
  start,
  endRef,
  onComplete
}: {
  start: { x: number; y: number };
  endRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}) {
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (endRef.current) {
        const rect = endRef.current.getBoundingClientRect();
        setEndPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [endRef]);

  if (endPos.x === 0) return null;

  return (
    <motion.div
      initial={{
        left: start.x,
        top: start.y,
        scale: 1,
        opacity: 0,
        filter: "blur(0px)"
      }}
      animate={{
        left: [start.x, start.x, endPos.x],
        top: [start.y, start.y - 150, endPos.y], // Slight arc
        scale: [1, 1.2, 0.4],
        opacity: [0, 1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(2px)"]
      }}
      transition={{
        duration: 1.5,
        ease: [0.6, 0.05, 0.1, 0.9],
        times: [0, 0.2, 1]
      }}
      onAnimationComplete={onComplete}
      className="fixed z-[11000] pointer-events-none -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative w-32 h-32">
        <DotLottieReact
          src="https://lottie.host/435935f7-75ab-4fd4-8802-8d61b37d2211/AeWSRZQ40D.lottie"
          loop
          autoplay
        />
        {/* Glow Trail */}
        <motion.div
            className="absolute inset-4 bg-orange-500/40 rounded-full blur-2xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { StreakEndedNotification } from "@/components/shared/StreakEndedNotification";

import { authClient } from "@/lib/auth-client";

// PERF: framer-motion + dotlottie are only needed for the rare streak-flight
// animation — load them on demand instead of in the root layout bundle.
const FlyingFireOverlay = dynamic(() => import("@/components/shared/FlyingFire"), {
  ssr: false,
});

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
  const [streak, setStreak] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [flightStart, setFlightStart] = useState({ x: 0, y: 0 });
  const [pendingValue, setPendingValue] = useState(0);
  const [isStreakEndedOpen, setIsStreakEndedOpen] = useState(false);
  const [lastStreakBeforeReset, setLastStreakBeforeReset] = useState(0);
  const badgeRef = useRef<HTMLDivElement>(null);

  const triggerFlight = useCallback((startPos: { x: number; y: number }, newValue: number) => {
    setFlightStart(startPos);
    setPendingValue(newValue);
    setIsFlying(true);
  }, []);

  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onFlightComplete = useCallback(() => {
    setStreak(pendingValue);
    setIsFlying(false);
    setIsPulsing(true);

    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    // Stop pulsing after a short delay
    pulseTimeoutRef.current = setTimeout(() => setIsPulsing(false), 2000);
  }, [pendingValue]);

  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, []);

  return (
    <StreakContext.Provider value={{ streak, setStreak, triggerFlight, badgeRef, isPulsing, isFlying }}>
      <Suspense fallback={null}>
        <StreakSync
          setStreak={setStreak}
          setLastStreakBeforeReset={setLastStreakBeforeReset}
          setIsStreakEndedOpen={setIsStreakEndedOpen}
        />
      </Suspense>
      {children}
      {isFlying && (
        <FlyingFireOverlay
          isFlying={isFlying}
          start={flightStart}
          endRef={badgeRef}
          onComplete={onFlightComplete}
        />
      )}

      <StreakEndedNotification
        isOpen={isStreakEndedOpen}
        onClose={() => setIsStreakEndedOpen(false)}
        lastStreak={lastStreakBeforeReset}
      />
    </StreakContext.Provider>
  );
}

function StreakSync({ setStreak, setLastStreakBeforeReset, setIsStreakEndedOpen }: any) {
  const { data: session } = authClient.useSession();

  // Sync with session when it loads
  useEffect(() => {
    if (session?.user) {
      const serverStreak = (session.user as any).currentStreak || 0;
      const streakKey = `algofox_last_streak_${session.user.id}`;

      try {
        const lastStreakStr = localStorage.getItem(streakKey);
        const lastStreak = lastStreakStr !== null ? parseInt(lastStreakStr, 10) : null;

        // Detect reset
        if (serverStreak === 0 && lastStreak !== null && lastStreak > 0) {
          setLastStreakBeforeReset(lastStreak);
          setIsStreakEndedOpen(true);
        }

        setStreak(serverStreak);
        localStorage.setItem(streakKey, serverStreak.toString());
      } catch (error) {
         console.warn("Storage access denied:", error);
        setStreak(serverStreak);
      }
    }
  }, [session, setStreak, setLastStreakBeforeReset, setIsStreakEndedOpen]);

  return null;
}

import { Suspense } from "react";

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) throw new Error("useStreak must be used within StreakProvider");
  return context;
};

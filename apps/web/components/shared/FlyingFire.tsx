"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function FlyingFire({
  start,
  endRef,
  onComplete
}: {
  start: { x: number; y: number };
  endRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}) {
  const [isEndPosReady, setIsEndPosReady] = useState(false);
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (endRef.current) {
        const rect = endRef.current.getBoundingClientRect();
        setEndPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
        setIsEndPosReady(true);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [endRef]);

  if (!isEndPosReady) return null;

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
        left: [start.x, start.x, endPos.x, endPos.x],
        top: [start.y, start.y - 150, endPos.y, endPos.y], // Slight arc
        scale: [1, 1.2, 0.4, 0.4],
        opacity: [0, 1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(2px)", "blur(2px)"]
      }}
      transition={{
        duration: 1.5,
        ease: [0.6, 0.05, 0.1, 0.9],
        times: [0, 0.2, 0.8, 1]
      }}
      onAnimationComplete={onComplete}
      className="fixed z-11000 pointer-events-none -translate-x-1/2 -translate-y-1/2"
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

export default function FlyingFireOverlay({
  isFlying,
  start,
  endRef,
  onComplete,
}: {
  isFlying: boolean;
  start: { x: number; y: number };
  endRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}) {
  // PERF: this whole module (framer-motion + dotlottie) is loaded on demand —
  // it is only mounted while a streak flight animation is active.
  return (
    <AnimatePresence>
      {isFlying && <FlyingFire start={start} endRef={endRef} onComplete={onComplete} />}
    </AnimatePresence>
  );
}

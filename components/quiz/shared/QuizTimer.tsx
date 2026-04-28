"use client";

import { useEffect, useState, useRef } from "react";

interface QuizTimerProps {
  endsAt: number;
  timeLimit: number;
  onExpire?: () => void;
  size?: "sm" | "md" | "lg";
}

export function QuizTimer({ endsAt, timeLimit, onExpire, size = "md" }: QuizTimerProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    expiredRef.current = false;
    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
    };
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, [endsAt]);

  const progress = timeLimit > 0 ? Math.min(1, Math.max(0, remaining / timeLimit)) : 0;
  const sizes = { sm: 56, md: 80, lg: 112 };
  const dim = sizes[size];
  const strokeWidth = size === "lg" ? 6 : 4;
  const r = (dim - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  const color =
    remaining > timeLimit * 0.5
      ? "#22c55e"
      : remaining > timeLimit * 0.25
      ? "#f97316"
      : "#ef4444";

  const textSize = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-sm";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-[#2a2a2a]"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s linear, stroke 0.5s" }}
        />
      </svg>
      <span
        className={`absolute font-black font-mono ${textSize} tabular-nums`}
        style={{ color }}
      >
        {remaining}
      </span>
    </div>
  );
}

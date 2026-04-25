"use client";

import React, { useState } from "react";

interface CircularProgressProps {
    solved: number;
    total: number;
    easyPct?: number;
    medPct?: number;
    hardPct?: number;
    onHoverEasy?: (hovering: boolean) => void;
    onHoverMed?: (hovering: boolean) => void;
    onHoverHard?: (hovering: boolean) => void;
    size?: number;
    strokeWidth?: number;
}

export function CircularProgress({
    solved,
    total,
    easyPct = 0,
    medPct = 0,
    hardPct = 0,
    onHoverEasy,
    onHoverMed,
    onHoverHard,
    size = 240,
    strokeWidth = 16
}: CircularProgressProps) {
    const [hoverSection, setHoverSection] = useState<"easy" | "med" | "hard" | null>(null);
    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    const easyArc = (easyPct / 100) * circumference;
    const medArc = (medPct / 100) * circumference;
    const hardArc = (hardPct / 100) * circumference;

    const getStrokeWidth = (section: "easy" | "med" | "hard") => {
        return hoverSection === section ? strokeWidth + 4 : strokeWidth;
    };

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg viewBox="0 0 240 240" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                {/* Background Track */}
                <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    className="stroke-gray-100 dark:stroke-[#262626]"
                    strokeWidth={strokeWidth}
                />

                {/* Easy Progress */}
                <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth={getStrokeWidth("easy")}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - easyArc}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => {
                        setHoverSection("easy");
                        onHoverEasy?.(true);
                    }}
                    onMouseLeave={() => {
                        setHoverSection(null);
                        onHoverEasy?.(false);
                    }}
                />

                {/* Medium Progress */}
                <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={getStrokeWidth("med")}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - medArc}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-300"
                    style={{
                        transform: `rotate(${(easyPct / 100) * 360}deg)`,
                        transformOrigin: "120px 120px"
                    }}
                    onMouseEnter={() => {
                        setHoverSection("med");
                        onHoverMed?.(true);
                    }}
                    onMouseLeave={() => {
                        setHoverSection(null);
                        onHoverMed?.(false);
                    }}
                />

                {/* Hard Progress */}
                <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth={getStrokeWidth("hard")}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - hardArc}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-300"
                    style={{
                        transform: `rotate(${((easyPct + medPct) / 100) * 360}deg)`,
                        transformOrigin: "120px 120px"
                    }}
                    onMouseEnter={() => {
                        setHoverSection("hard");
                        onHoverHard?.(true);
                    }}
                    onMouseLeave={() => {
                        setHoverSection(null);
                        onHoverHard?.(false);
                    }}
                />
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">
                    {solved}
                </span>
                <div className="h-px w-8 bg-gray-200 dark:bg-white/10 my-1" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {total - solved} left
                </span>
            </div>
        </div>
    );
}

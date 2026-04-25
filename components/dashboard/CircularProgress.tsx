"use client";

import React from "react";

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
    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    const easyArc = (easyPct / 100) * circumference;
    const medArc = (medPct / 100) * circumference;
    const hardArc = (hardPct / 100) * circumference;

    return (
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
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - easyArc}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-width-[20px]"
                onMouseEnter={() => onHoverEasy?.(true)}
                onMouseLeave={() => onHoverEasy?.(false)}
            />

            {/* Medium Progress */}
            <circle
                cx="120"
                cy="120"
                r={radius}
                fill="none"
                stroke="#f97316"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - medArc}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-width-[20px]"
                style={{
                    transform: `rotate(${(easyPct / 100) * 360}deg)`,
                    transformOrigin: "120px 120px"
                }}
                onMouseEnter={() => onHoverMed?.(true)}
                onMouseLeave={() => onHoverMed?.(false)}
            />

            {/* Hard Progress */}
            <circle
                cx="120"
                cy="120"
                r={radius}
                fill="none"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - hardArc}
                strokeLinecap="round"
                className="cursor-pointer transition-all hover:stroke-width-[20px]"
                style={{
                    transform: `rotate(${((easyPct + medPct) / 100) * 360}deg)`,
                    transformOrigin: "120px 120px"
                }}
                onMouseEnter={() => onHoverHard?.(true)}
                onMouseLeave={() => onHoverHard?.(false)}
            />
        </svg>
    );
}

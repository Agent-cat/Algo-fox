"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: ReactNode;
    content: string;
    shortcut?: string;
    className?: string;
    side?: "top" | "bottom" | "left" | "right";
    delay?: number;
}

export default function CustomTooltip({
    children,
    content,
    shortcut,
    className,
    side = "top",
    delay = 0.2,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateCoords = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });
        }
    };

    const handleMouseEnter = () => {
        updateCoords();
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay * 1000);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    useEffect(() => {
        if (isVisible) {
            window.addEventListener("scroll", updateCoords, true);
            window.addEventListener("resize", updateCoords);
            return () => {
                window.removeEventListener("scroll", updateCoords, true);
                window.removeEventListener("resize", updateCoords);
            };
        }
    }, [isVisible]);

    const initial = {
        opacity: 0,
        scale: 0.95,
        y: side === "top" ? 5 : side === "bottom" ? -5 : 0,
    };

    const animate = {
        opacity: 1,
        scale: 1,
        y: 0,
    };

    const tooltipContent = (
        <AnimatePresence>
            {isVisible && (
                <TooltipPortal
                    content={content}
                    shortcut={shortcut}
                    coords={coords}
                    side={side}
                    className={className}
                    initial={initial}
                    animate={animate}
                />
            )}
        </AnimatePresence>
    );

    return (
        <div
            ref={triggerRef}
            className="relative inline-flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {typeof document !== "undefined" && createPortal(tooltipContent, document.body)}
        </div>
    );
}

function TooltipPortal({ content, shortcut, coords, side, className, initial, animate }: any) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [adjustedCoords, setAdjustedCoords] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            let left = coords.left - rect.width / 2;
            let top = side === "top" ? coords.top - rect.height - 8 : coords.top + 32;

            // Edge detection
            const padding = 8;
            if (left < padding) left = padding;
            if (left + rect.width > window.innerWidth - padding) {
                left = window.innerWidth - rect.width - padding;
            }
            if (top < padding) top = padding;
            if (top + rect.height > window.innerHeight - padding) {
                top = window.innerHeight - rect.height - padding;
            }

            setAdjustedCoords({ top, left });
        }
    }, [coords, side]);

    return (
        <motion.div
            ref={tooltipRef}
            initial={initial}
            animate={animate}
            exit={initial}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
                position: "fixed",
                top: adjustedCoords.top || (side === "top" ? coords.top - 40 : coords.top + 32),
                left: adjustedCoords.left || coords.left - 50,
                zIndex: 9999,
                opacity: adjustedCoords.top === 0 ? 0 : 1, // Hide until positioned
            }}
            className="pointer-events-none"
        >
            <div className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md border border-gray-200 dark:border-white/5 shadow-xl ring-1 ring-black/5 dark:ring-black/20",
                className
            )}>
                <span className="text-[11px] font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
                    {content}
                </span>
                {shortcut && (
                    <div className="flex items-center gap-0.5 ml-1">
                        {shortcut.split("+").map((key: string, i: number) => (
                            <React.Fragment key={i}>
                                <kbd className="min-w-[16px] h-4 px-1 flex items-center justify-center bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/10 text-[9px] font-bold text-zinc-600 dark:text-white/90 uppercase shadow-sm">
                                    {key.trim()}
                                </kbd>
                                {i < shortcut.split("+").length - 1 && (
                                    <span className="text-[9px] text-zinc-400 dark:text-white/40">+</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
                {/* Little triangle arrow - only show if NOT adjusted too much */}
                {Math.abs(adjustedCoords.left - (coords.left - (tooltipRef.current?.offsetWidth || 0) / 2)) < 10 && (
                     <div
                        className={cn(
                            "absolute w-2 h-2 bg-white/95 dark:bg-zinc-800/95 border-gray-200 dark:border-white/5 rotate-45 z-[-1]",
                            side === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b",
                            side === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2 border-l border-t"
                        )}
                    />
                )}
            </div>
        </motion.div>
    );
}

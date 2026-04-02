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
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const id = useRef(`tooltip-${Math.random().toString(36).substring(2, 9)}`);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateCoords = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top,
                left: rect.left,
                right: rect.right,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height
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
        x: side === "left" ? 5 : side === "right" ? -5 : 0,
    };

    const animate = {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
    };

    const tooltipContent = (
        <AnimatePresence>
            {isVisible && (
                <TooltipPortal
                    id={id.current}
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
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            aria-describedby={isVisible ? id.current : undefined}
        >
            {children}
            {mounted && createPortal(tooltipContent, document.body)}
        </div>
    );
}

function TooltipPortal({ id, content, shortcut, coords, side, className, initial, animate }: any) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [adjustedCoords, setAdjustedCoords] = useState({ top: 0, left: 0 });

    const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            setTooltipSize({ width: rect.width, height: rect.height });
            let left = 0;
            let top = 0;

            if (side === "top") {
                top = coords.top - rect.height - 8;
                left = coords.left + coords.width / 2 - rect.width / 2;
            } else if (side === "bottom") {
                top = coords.bottom + 8;
                left = coords.left + coords.width / 2 - rect.width / 2;
            } else if (side === "left") {
                left = coords.left - rect.width - 8;
                top = coords.top + coords.height / 2 - rect.height / 2;
            } else if (side === "right") {
                left = coords.right + 8;
                top = coords.top + coords.height / 2 - rect.height / 2;
            }

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
            id={id}
            role="tooltip"
            initial={initial}
            animate={animate}
            exit={initial}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
                position: "fixed",
                top: adjustedCoords.top || (side === "top" ? coords.top - 40 : coords.top + 32),
                left: adjustedCoords.left || coords.left - (side === "left" ? 100 : 50),
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
                {side === "top" && adjustedCoords.top !== 0 && (
                    <div
                        className="absolute w-2 h-2 bg-white/95 dark:bg-zinc-800/95 border-gray-200 dark:border-white/5 rotate-45 z-[-1] bottom-[-4px] border-r border-b"
                        style={{ left: Math.max(8, Math.min(tooltipSize.width - 16, coords.left + coords.width / 2 - adjustedCoords.left - 4)) }}
                    />
                )}
                {side === "bottom" && adjustedCoords.top !== 0 && (
                    <div
                        className="absolute w-2 h-2 bg-white/95 dark:bg-zinc-800/95 border-gray-200 dark:border-white/5 rotate-45 z-[-1] top-[-4px] border-l border-t"
                        style={{ left: Math.max(8, Math.min(tooltipSize.width - 16, coords.left + coords.width / 2 - adjustedCoords.left - 4)) }}
                    />
                )}
            </div>
        </motion.div>
    );
}

"use client";
import { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ContestTimerProps {
    endTime: string | Date;
    contestId: string;
}

export const ContestTimer = memo(({ endTime, contestId }: ContestTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const notifiedMins = useRef<Set<number>>(new Set());

    // Reset notifications when endTime changes (e.g. extension)
    useEffect(() => {
        notifiedMins.current = new Set();
    }, [endTime]);

    useEffect(() => {
        const targetDate = new Date(endTime);
        let interval: NodeJS.Timeout | null = null;

        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft("00:00:00");
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
                return;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            const totalMinutes = Math.floor(diff / (1000 * 60));
            if ([30, 10, 5, 1].includes(totalMinutes) && !notifiedMins.current.has(totalMinutes)) {
                toast.warning(`${totalMinutes} minute${totalMinutes > 1 ? 's' : ''} remaining!`, {
                    description: "Make sure to submit your work before the time expires.",
                    duration: 10000,
                });
                notifiedMins.current.add(totalMinutes);
            }
        };

        updateTimer();
        interval = setInterval(updateTimer, 1000);
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [endTime]);

    if (!timeLeft) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center px-4 py-1.5 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#262626] ml-4 transition-colors"
        >
            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none mb-0.5 whitespace-nowrap">Time Left</span>
            <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 leading-none tabular-nums">{timeLeft}</span>
        </motion.div>
    );
});

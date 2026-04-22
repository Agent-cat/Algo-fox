"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getSubmissionDistributionAction } from "@/actions/submission.action";
import { Loader2 } from "lucide-react";

interface DistributionItem {
    value: number;
    count: number;
}

interface SubmissionDistributionProps {
    problemId: string;
    currentValue: number;
    type: 'runtime' | 'memory';
    showGraph?: boolean;
}

export default function SubmissionDistribution({ problemId, currentValue, type, showGraph = true }: SubmissionDistributionProps) {
    const [distribution, setDistribution] = useState<DistributionItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDistribution = async () => {
            try {
                const data = await getSubmissionDistributionAction(problemId);
                const items = type === 'runtime' ? data.runtimes : data.memories;
                setDistribution(items);
            } catch (error) {
                 console.error("Failed to load distribution", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDistribution();
    }, [problemId, type]);

    const stats = useMemo(() => {
        if (distribution.length === 0) return null;

        const total = distribution.reduce((acc, item) => acc + item.count, 0);
        const maxCount = Math.max(...distribution.map(d => d.count));

        // Calculate percentage of students users beat
        let defeatedCount = 0;
        for (const item of distribution) {
            if (item.value > currentValue) {
                defeatedCount += item.count;
            }
        }

        const beatsPercentage = total > 0 ? (defeatedCount / total) * 100 : 0;

        return { total, maxCount, beatsPercentage };
    }, [distribution, currentValue]);

    if (loading) {
        return (
            <div className="h-32 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500/50" />
            </div>
        );
    }

    if (!stats || distribution.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className={`flex items-end justify-between ${!showGraph ? 'py-2 px-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5' : ''}`}>
                <div className="space-y-1">
                    <p className={`text-[10px] font-black text-emerald-500 uppercase tracking-widest italic ${!showGraph ? 'text-xs' : ''}`}>
                        Beats {stats.beatsPercentage.toFixed(1)}%
                    </p>
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-tighter">
                        of users with {type}
                    </p>
                </div>
                <div className="text-right">
                    <p className={`font-black text-gray-900 dark:text-white tabular-nums ${!showGraph ? 'text-lg' : 'text-sm'}`}>
                        {currentValue}{type === 'runtime' ? 'ms' : 'KB'}
                    </p>
                </div>
            </div>

            {/* Bar Graph */}
            {showGraph && (
                <>
                    <div className="h-24 flex items-end gap-[2px] pt-4">
                        {distribution.map((item, idx) => {
                            const heightPercent = (item.count / stats.maxCount) * 100;
                            const isUserBucket = type === 'runtime'
                                ? Math.abs(item.value - currentValue) < 2 // within 2ms range
                                : Math.abs(item.value - currentValue) < 50; // within 50KB range

                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPercent}%` }}
                                        transition={{ duration: 0.5, delay: idx * 0.01 }}
                                        className={`
                                            w-full rounded-t-[1px] transition-colors duration-300
                                            ${isUserBucket
                                                ? 'bg-orange-500 shadow-[0_-4px_12px_rgba(249,115,22,0.3)] z-10'
                                                : 'bg-gray-200 dark:bg-white/10 group-hover:bg-gray-300 dark:group-hover:bg-white/20'}
                                        `}
                                    />
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black dark:bg-[#1a1a1a] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10 uppercase font-bold tracking-widest shadow-2xl">
                                        {item.value}{type === 'runtime' ? 'ms' : 'KB'}: {item.count} users
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Axis Labels */}
                    <div className="flex justify-between border-t border-gray-100 dark:border-white/5 pt-2">
                        <span className="text-[8px] font-black text-gray-400 uppercase">{distribution[0].value}{type === 'runtime' ? 'ms' : 'KB'}</span>
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{type} distribution</span>
                        <span className="text-[8px] font-black text-gray-400 uppercase">{distribution[distribution.length - 1].value}{type === 'runtime' ? 'ms' : 'KB'}</span>
                    </div>
                </>
            )}
        </div>
    );
}

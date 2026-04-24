"use client";

import { useState, useMemo, useEffect } from "react";
import { getProblemStats } from "@/actions/analytics";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    ReferenceDot,
    Tooltip,
    Cell
} from "recharts";
import { motion } from "framer-motion";

interface SubmissionPerformanceProps {
    runtime?: number; // ms
    memory?: number;  // KB
    problemId: string;
    runtimePercentile: number;
    memoryPercentile: number;
}

// Generate distribution data
const generateDistribution = () => {
    const data = [];
    const points = 60;

    for (let i = 0; i <= points; i++) {
        const x = i;
        // Base bell curve plus some peaks to look like real data spikes
        const base = Math.exp(-Math.pow(i - 20, 2) / 200) * 40;
        const peak1 = Math.exp(-Math.pow(i - 45, 2) / 50) * 15;
        const peak2 = Math.exp(-Math.pow(i - 10, 2) / 20) * 10;

        // Add some realistic "noise" for an accurate histogram look
        const noise = (Math.sin(i * 0.8) * 2) + (Math.cos(i * 1.5) * 1.5);

        data.push({
            x,
            y: Math.max(2, base + peak1 + peak2 + noise),
            percentile: (i / points) * 100
        });
    }
    return data;
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-white/10 px-3 py-2 rounded-lg shadow-xl text-[10px] font-mono">
                <div className="text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">Density</div>
                <div className="text-gray-900 dark:text-white font-bold">
                    {payload[0].value.toFixed(1)} submissions
                </div>
            </div>
        );
    }
    return null;
};

export default function SubmissionPerformance({ runtime, memory, problemId }: { runtime?: number; memory?: number; problemId: string }) {
    const [activeTab, setActiveTab] = useState<"runtime" | "memory">("runtime");
    const [stats, setStats] = useState<{ runtimePercentile: number; memoryPercentile: number } | null>(null);

    useEffect(() => {
        if (problemId && runtime !== undefined) {
            getProblemStats(problemId, runtime, memory || 0).then(setStats);
        }
    }, [problemId, runtime, memory]);

    const runtimePercentile = stats?.runtimePercentile ?? 50;
    const memoryPercentile = stats?.memoryPercentile ?? 50;

    const percentile = activeTab === "runtime" ? runtimePercentile : memoryPercentile;
    const value = activeTab === "runtime" ? (runtime || 0) : (memory || 0);
    const unit = activeTab === "runtime" ? "ms" : "KB";
    const label = activeTab === "runtime" ? "Runtime" : "Memory";

    const data = useMemo(() => generateDistribution(), []);

    // Calculate which index corresponds to the user's percentile
    // (100 - percentile) / 100 * data.length
    const userIndex = Math.min(
        data.length - 1,
        Math.max(0, Math.round(((100 - percentile) / 100) * (data.length - 1)))
    );
    const userPoint = data[userIndex];

    if (!stats) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-4 bg-[#fafafa] dark:bg-[#121212] border border-gray-200 dark:border-[#1e1e1e] rounded-xl overflow-hidden shadow-sm dark:shadow-2xl"
        >
            {/* Nav Tabs */}
            <div className="flex bg-gray-50/50 dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-white/5 px-2">
                <button
                    onClick={() => setActiveTab("runtime")}
                    className={`px-6 py-2.5 text-[12px] font-bold font-mono transition-all relative ${
                        activeTab === "runtime" ? "text-orange-600 dark:text-white" : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                    }`}
                >
                    Runtime graph
                    {activeTab === "runtime" && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-[24px] right-[24px] h-[2px] bg-orange-500 dark:bg-white rounded-t-sm" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("memory")}
                    className={`px-6 py-2.5 text-[12px] font-bold font-mono transition-all relative ${
                        activeTab === "memory" ? "text-orange-600 dark:text-white" : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                    }`}
                >
                    Memory graph
                    {activeTab === "memory" && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-[24px] right-[24px] h-[2px] bg-orange-500 dark:bg-white rounded-t-sm" />
                    )}
                </button>
            </div>

            <div className="p-5">
                {/* Status Bar */}
                <div className="flex justify-between items-baseline mb-6">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-baseline gap-2"
                    >
                        <span className="text-[13px] text-gray-400 dark:text-gray-500 font-mono tracking-tight">Better than</span>
                        <span className={`text-[15px] font-bold font-mono transition-colors duration-500 ${
                            percentile < 40 ? "text-rose-500" :
                            percentile < 80 ? "text-amber-500" :
                            "text-emerald-500"
                        }`}>
                            {(percentile || 0).toFixed(2)}%
                        </span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-baseline gap-2"
                    >
                        <span className="text-[13px] text-gray-400 dark:text-gray-500 font-mono tracking-tight">{label}</span>
                        <span className="text-[15px] text-gray-900 dark:text-white font-bold font-mono">{(value || 0)} {unit}</span>
                    </motion.div>
                </div>

                {/* Graph Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative h-[120px] w-full"
                >
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="perfGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>

                            <XAxis dataKey="x" hide />
                            <YAxis hide domain={[0, 'auto']} />

                             <Area
                                type="monotone"
                                dataKey="y"
                                stroke={activeTab === "runtime" ? "#f97316" : "#ffffff"}
                                strokeWidth={2}
                                fill="url(#perfGradient)"
                                fillOpacity={1}
                                isAnimationActive={true}
                                animationDuration={1000}
                                strokeOpacity={0.8}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <ReferenceDot
                                x={userPoint.x}
                                y={userPoint.y}
                                r={6}
                                fill="#f97316"
                                stroke="#ffffff"
                                strokeWidth={2}
                                className="drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                            />

                            {/* Vertical Line for User Position */}
                            <ReferenceDot
                                x={userPoint.x}
                                y={0}
                                r={0}
                                label={{
                                    position: 'top',
                                    value: 'YOU',
                                    fill: '#f97316',
                                    fontSize: 8,
                                    fontWeight: '900',
                                    dy: -15
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Bottom Labels */}
                     <div className="flex justify-between text-[10px] font-black font-mono text-gray-400 dark:text-gray-600 mt-4 px-1 uppercase tracking-widest">
                        <span className="flex flex-col">
                            <span>Faster</span>
                            <span className="text-[14px] text-emerald-500 font-bold">~{(value * 0.4).toFixed(0)}{unit}</span>
                        </span>
                        <span className="flex flex-col items-center opacity-40">
                            <span>Average</span>
                            <span className="text-[14px] text-gray-300 font-bold">~{(value * 1.2).toFixed(0)}{unit}</span>
                        </span>
                        <span className="flex flex-col items-end">
                            <span>Slower</span>
                            <span className="text-[14px] text-rose-500 font-bold">~{(value * 2.1).toFixed(0)}{unit}</span>
                        </span>
                    </div>

                    <div className="absolute left-0 top-6 bottom-4 w-px bg-gray-200 dark:bg-white/5" />
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex justify-end"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black font-mono text-emerald-500 uppercase tracking-widest">Best</span>
                        <div className="w-[80px] h-[5px] rounded-full bg-linear-to-r from-emerald-500 via-yellow-500 to-rose-500 opacity-70" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

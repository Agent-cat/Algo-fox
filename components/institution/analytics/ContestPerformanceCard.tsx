"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ContestPerformancePoint } from "@/actions/institution/analytics";

interface ContestPerformanceCardProps {
    data: ContestPerformancePoint[];
}

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function DeltaIndicator({ current, previous }: { current: number; previous: number }) {
    if (previous === 0 && current === 0) {
        return (
            <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full">
                <Minus className="w-3 h-3" />
                No change
            </span>
        );
    }

    if (previous === 0) {
        return (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                <TrendingUp className="w-3 h-3" />
                First contest
            </span>
        );
    }

    const delta = ((current - previous) / previous) * 100;
    const isPositive = delta >= 0;
    const abs = Math.abs(delta).toFixed(1);

    if (isPositive) {
        return (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                <TrendingUp className="w-3 h-3" />
                +{abs}%
            </span>
        );
    }

    return (
        <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-500/20">
            <TrendingDown className="w-3 h-3" />
            -{abs}%
        </span>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs py-2 px-3 rounded-xl shadow-xl border border-gray-700 dark:border-gray-200">
            <p className="font-bold mb-0.5">{payload[0]?.payload?.title}</p>
            <p className="text-gray-300 dark:text-gray-600">{label}</p>
            <p className="font-black text-orange-400 dark:text-orange-600 mt-1">
                {payload[0]?.value} pts
            </p>
        </div>
    );
};

export function ContestPerformanceCard({ data }: ContestPerformanceCardProps) {
    const chartData = data.map((d) => ({
        date: formatDate(d.date),
        score: d.score,
        title: d.title,
    }));

    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const totalContests = data.length;
    const highestScore = Math.max(...data.map((d) => d.score), 0);
    const avgScore =
        totalContests > 0
            ? Math.round(data.reduce((s, d) => s + d.score, 0) / totalContests)
            : 0;

    return (
        <div className="bg-white dark:bg-[#141414] rounded-3xl border border-dashed border-gray-300 dark:border-[#262626] p-6 flex flex-col gap-6 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                            Contest Performance
                        </h3>
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                            Real-time score trajectory
                        </p>
                    </div>
                </div>
                {latest && previous && (
                    <DeltaIndicator
                        current={latest.score}
                        previous={previous.score}
                    />
                )}
            </div>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 border border-gray-100 dark:border-[#262626] rounded-2xl p-4 text-center group hover:bg-white dark:hover:bg-[#1a1a1a] transition-all">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] mb-1">
                        Events
                    </p>
                    <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">
                        {totalContests}
                    </p>
                </div>
                <div className="bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 rounded-2xl p-4 text-center group hover:bg-orange-500/10 transition-all">
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.1em] mb-1">
                        Latest
                    </p>
                    <p className="text-xl font-black text-orange-500 tabular-nums">
                        {latest?.score ?? 0}
                    </p>
                </div>
                <div className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 border border-gray-100 dark:border-[#262626] rounded-2xl p-4 text-center group hover:bg-white dark:hover:bg-[#1a1a1a] transition-all">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] mb-1">
                        Peak
                    </p>
                    <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">
                        {highestScore}
                    </p>
                </div>
            </div>

            {/* Chart */}
            {chartData.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-8 h-8 text-gray-200 dark:text-gray-700" />
                    </div>
                    <p className="text-base font-black text-gray-300 dark:text-gray-600">
                        Awaiting Participation
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-700 mt-1 max-w-[150px]">
                        Contest data will be visualized once activities resume.
                    </p>
                </div>
            ) : (
                <div className="flex-1 min-h-[160px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="contestGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e5e7eb"
                                className="dark:[&>line]:stroke-[#262626]"
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ea580c', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#ea580c"
                                strokeWidth={3}
                                fill="url(#contestGradient)"
                                dot={{ fill: "#ea580c", r: 4, strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, fill: "#ea580c", strokeWidth: 2, stroke: "#fff" }}
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

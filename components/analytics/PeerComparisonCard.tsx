"use client";

import { useEffect, useState } from "react";
import { getProblemStats } from "@/actions/analytics";
import { Zap, Database, TrendingUp } from "lucide-react";

interface PeerComparisonCardProps {
    problemId: string;
    runtime: number; // in ms
    memory?: number; // in KB (or MB? usually KB from Judge0 but need to check)
}

export default function PeerComparisonCard({ problemId, runtime, memory = 0 }: PeerComparisonCardProps) {
    const [stats, setStats] = useState<{ runtimePercentile: number; memoryPercentile: number } | null>(null);

    useEffect(() => {
        if (problemId) {
            getProblemStats(problemId, runtime, memory).then(setStats);
        }
    }, [problemId, runtime, memory]);

    if (!stats) return null;

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Submission Performance
            </h4>

            {/* Runtime Stat */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Runtime: <span className="text-gray-900">{runtime.toFixed(2)}ms</span></span>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-gray-900">Beats {stats.runtimePercentile}%</span>
                    </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.runtimePercentile}%` }}
                    />
                </div>
            </div>

            {/* Memory Stat */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Memory: <span className="text-gray-900">{memory.toFixed(1)}KB</span></span>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-gray-900">Beats {stats.memoryPercentile}%</span>
                    </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.memoryPercentile}%` }}
                    />
                </div>
            </div>

            {(stats.runtimePercentile > 80 || stats.memoryPercentile > 80) && (
                 <p className="text-xs text-gray-500 text-center pt-2 border-t border-dashed">
                    🚀 Incredible! Your solution is highly optimized.
                </p>
            )}
        </div>
    );
}

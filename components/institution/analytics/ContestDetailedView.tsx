"use client";

import { ArrowLeft, Ban, ShieldAlert, Trophy, Calendar, History, ArrowUp, ArrowDown, Info, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ContestPerformancePoint } from "@/actions/institution/analytics";

interface ContestDetailedViewProps {
    studentName: string;
    studentId: string;
    performance: ContestPerformancePoint[];
}

export function ContestDetailedView({ studentId, performance }: ContestDetailedViewProps) {
    const router = useRouter();

    const wasBlockedAtLeastOnce = performance.some(p => p.isBlocked);
    const sortedPerformance = [...performance].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-4xl mx-auto pb-20">
            {/* Minimal Header */}
            <div className="flex items-center justify-between py-2">
                <button
                    onClick={() => router.push(`/dashboard/institution/analytics?student=${studentId}`)}
                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-orange-500 transition-colors group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Registry
                </button>
                {wasBlockedAtLeastOnce && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-600 rounded-full animate-pulse shadow-sm">
                        <Ban className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Integrity Violation Detected</span>
                    </div>
                )}
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-dashed border-gray-200 dark:border-[#262626]">
                 <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Score</p>
                     <p className="text-3xl font-black text-gray-900 dark:text-white">
                        {Math.round(performance.reduce((acc, p) => acc + p.score, 0) / Math.max(performance.length, 1))}
                     </p>
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Points</p>
                     <p className="text-3xl font-black text-orange-500">
                        {performance.reduce((acc, p) => acc + p.score, 0)}
                     </p>
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Violations</p>
                     <p className={`text-3xl font-black ${performance.some(p => p.violationsCount > 0) ? 'text-red-500' : 'text-emerald-500'}`}>
                        {performance.reduce((acc, p) => acc + p.violationsCount, 0)}
                     </p>
                 </div>
                 <div className="text-right hidden md:block">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contests</p>
                     <p className="text-3xl font-black text-blue-500">{performance.length}</p>
                 </div>
            </div>

            {/* Detailed History Table */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2 px-2">
                    <History className="w-4 h-4 text-orange-500" />
                    <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Contest Performance Log</h3>
                 </div>

                 <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#151515]">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Internal Contest</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-[#222]">
                            {sortedPerformance.length > 0 ? (
                                [...sortedPerformance].reverse().map((entry, idx, arr) => {
                                    const nextEntry = arr[idx + 1];
                                    const currentScore = entry.score;
                                    const prevScore = nextEntry ? nextEntry.score : null;

                                    let trend = null;
                                    if(prevScore !== null) {
                                        if(currentScore > prevScore) trend = 'up';
                                        else if(currentScore < prevScore) trend = 'down';
                                    }

                                    return (
                                        <tr key={idx} className={`hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group ${entry.isBlocked ? 'bg-red-500/[0.02]' : ''}`}>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-black tracking-tight ${entry.isBlocked ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                                            {entry.title}
                                                        </span>
                                                        {entry.isBlocked && (
                                                            <span className="px-1.5 py-0.5 rounded bg-red-500 text-white text-[8px] font-black uppercase">Blocked</span>
                                                        )}
                                                    </div>
                                                    {entry.violationsCount > 0 && (
                                                        <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1 mt-0.5">
                                                            <AlertTriangle className="w-3 h-3" />
                                                            {entry.violationsCount} integrity flags
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
                                                    <Calendar className="w-3 h-3 opacity-50" />
                                                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-3">
                                                    <span className={`text-sm font-black tabular-nums ${entry.isBlocked ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                                        {entry.isBlocked ? 0 : currentScore}
                                                    </span>
                                                    {!entry.isBlocked && (
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                            trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' :
                                                            trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-gray-100 dark:bg-[#1a1a1a] text-gray-400'
                                                        }`}>
                                                            {trend === 'up' ? <ArrowUp className="w-3 h-3" strokeWidth={3} /> :
                                                             trend === 'down' ? <ArrowDown className="w-3 h-3" strokeWidth={3} /> :
                                                             <span className="text-[8px] font-bold">-</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-24 text-center">
                                        <Info className="w-8 h-8 text-gray-200 dark:text-[#222] mx-auto mb-3" />
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No Contest History</p>
                                        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Student has not participated in any internal contests.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
}

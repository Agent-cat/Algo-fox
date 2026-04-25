"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Activity, CheckCircle2, History, TrendingUp, Calendar, ArrowUp, ArrowDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkLeetCodeUser, checkCodeChefUser, checkCodeforcesUser } from "@/actions/platform.action";
import { toast } from "sonner";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";

interface PlatformDetailedViewProps {
    platform: "LeetCode" | "CodeChef" | "Codeforces";
    handle: string;
    studentName: string;
    studentId: string;
}

export function PlatformDetailedView({ platform, handle, studentName, studentId }: PlatformDetailedViewProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let result;
                if (platform === "LeetCode") result = await checkLeetCodeUser(handle);
                else if (platform === "CodeChef") result = await checkCodeChefUser(handle);
                else if (platform === "Codeforces") result = await checkCodeforcesUser(handle);

                if (result?.success) {
                    setData(result);
                } else {
                    toast.error(`Failed to fetch ${platform} data for ${handle}`);
                }
            } catch (error) {
                toast.error("An error occurred while fetching platform data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [platform, handle]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <Activity className="absolute inset-0 m-auto w-6 h-6 text-orange-500 animate-pulse" />
                </div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Synchronizing with {platform}...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center py-40">
                <p className="text-gray-500">Could not retrieve data for this handle.</p>
                <button onClick={() => router.push(`/dashboard/institution/analytics?student=${studentId}`)} className="mt-4 text-orange-500 font-bold underline">Go Back</button>
            </div>
        );
    }

    // Unified History Mapping
    const rawHistory = platform === "CodeChef" ? data.ratingData :
                        platform === "Codeforces" ? data.ratingHistory :
                        data.contestHistory || [];

    const unifiedHistory = rawHistory.map((item: any) => {
        if (platform === "CodeChef") {
            const date = item.end_date ? new Date(item.end_date) : null;
            return {
                name: item.name || item.code,
                date: (date && !isNaN(date.getTime())) ? date.toISOString() : '',
                rating: parseInt(item.rating),
                rank: item.rank
            };
        } else if (platform === "Codeforces") {
            const timestamp = item.ratingUpdateTimeSeconds;
            return {
                name: item.contestName,
                date: (timestamp && typeof timestamp === 'number') ? new Date(timestamp * 1000).toISOString() : '',
                rating: item.newRating,
                rank: item.rank
            };
        } else {
            // LeetCode
            const startTime = item.contest?.startTime;
            return {
                name: item.contest?.title,
                date: (startTime && typeof startTime === 'number') ? new Date(startTime * 1000).toISOString() : '',
                rating: Math.floor(item.rating),
                rank: item.ranking
            };
        }
    }).filter((h: any) => h.name && h.rating);

    const solvedTotal = data.fullySolvedCount || data.solvedByDifficulty?.TOTAL || (data.submitStats?.acSubmissionNum?.[0]?.count) || data.totalProblemsSolved || 0;

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
                <div className="flex items-center gap-2">
                     <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-widest">
                        {platform}: {handle}
                     </div>
                </div>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-dashed border-gray-200 dark:border-[#262626]">
                 <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Rating</p>
                     <p className="text-3xl font-black text-gray-900 dark:text-white">{data.currentRating || data.rating || 0}</p>
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Global Weight</p>
                     <p className="text-3xl font-black text-orange-500">{data.globalRank || data.rank || 'N/A'}</p>
                 </div>
                 <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Solved</p>
                     <p className="text-3xl font-black text-emerald-500">{solvedTotal}</p>
                 </div>
            </div>

            {/* Participation Log */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2 px-2">
                    <History className="w-4 h-4 text-orange-500" />
                    <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Contest Participation Log</h3>
                 </div>

                 <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#151515]">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contest Name</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-[#222]">
                            {unifiedHistory.length > 0 ? (
                                [...unifiedHistory].reverse().map((entry: any, idx: number, arr: any[]) => {
                                    const nextEntry = arr[idx + 1];
                                    const currentRating = entry.rating;
                                    const prevRating = nextEntry ? nextEntry.rating : null;

                                    let trend = null;
                                    if(prevRating !== null) {
                                        if(currentRating > prevRating) trend = 'up';
                                        else if(currentRating < prevRating) trend = 'down';
                                    }

                                    return (
                                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
                                                        {entry.name}
                                                    </span>
                                                    {entry.rank && (
                                                        <span className="text-[10px] font-bold text-gray-400">Rank: #{entry.rank}</span>
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
                                                    <span className="text-sm font-black text-gray-900 dark:text-white tabular-nums">
                                                        {currentRating}
                                                    </span>
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                        trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-gray-100 dark:bg-[#1a1a1a] text-gray-400'
                                                    }`}>
                                                        {trend === 'up' ? <ArrowUp className="w-3 h-3" strokeWidth={3} /> :
                                                         trend === 'down' ? <ArrowDown className="w-3 h-3" strokeWidth={3} /> :
                                                         <span className="text-[8px] font-bold">-</span>}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-24 text-center">
                                        <Info className="w-8 h-8 text-gray-200 dark:text-[#222] mx-auto mb-3" />
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No Competitions Found</p>
                                        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">User has not participated in any rated events.</p>
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

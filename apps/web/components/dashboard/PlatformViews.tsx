"use client";

// PERF: This module carries recharts (~100KB+ gzip). It is loaded on demand
// when the user opens a platform/contest tab on the dashboard, not on initial
// page load. Shared view primitives live here and are reused by
// ProblemOverviewCard.

import { useState, useEffect } from "react";
import { checkLeetCodeUser, checkCodeChefUser, checkCodeforcesUser } from "@/actions/platform.action";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Cell
} from "recharts";

export function StatCard({ label, value, icon, trend, className }: any) {
    return (
        <div className={`bg-gray-100 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-between ${className}`}>
             <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
                 {icon}
             </div>
             <div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{value}</div>
                {trend && <div className="text-[10px] font-medium text-green-600 dark:text-green-500 mt-1">{trend}</div>}
             </div>
        </div>
    )
}

export function ConnectPlatformEmptyState({ logoPath, Icon, message, subMessage }: any) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className={`w-16 h-16 p-2.5 rounded-full flex items-center justify-center shadow-sm border ${
                logoPath
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 dark:bg-white/5 border-gray-100 dark:border-white/5"
            }`}>
                {Icon ? <Icon className="w-8 h-8 text-gray-900 dark:text-gray-100" /> : <img src={logoPath} alt={message} className="w-full h-full object-contain" />}
            </div>
            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{message}</h4>
                <p className="text-xs text-gray-500 max-w-[150px] mx-auto mb-4">{subMessage}</p>
                <Link href="/dashboard/settings" className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    Connect &rarr;
                </Link>
            </div>
        </div>
    )
}

export function LoadingState() {
     return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
}

export function ErrorState() {
     return <div className="h-full flex items-center justify-center text-sm text-red-500">Failed to load data</div>
}

export function LeetCodeView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && isVerified && !cachedData) {
            setLoading(true);
            checkLeetCodeUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, isVerified, cachedData, onDataFetched]);

    if (!handle || !isVerified) return <ConnectPlatformEmptyState logoPath="/handles_logos/leetcode.png" message="Connect LeetCode" subMessage="Link and verify your account in settings" />;
    if (loading) return <LoadingState />;
    if (!data) return <ErrorState />;

    const easy = data.submitStats?.acSubmissionNum?.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const medium = data.submitStats?.acSubmissionNum?.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hard = data.submitStats?.acSubmissionNum?.find((s: any) => s.difficulty === "Hard")?.count || 0;

    // Process Contest History for Graph
    const contestHistory = data.contestHistory?.map((c: any) => ({
        date: new Date(c.contest.startTime * 1000).toLocaleDateString(),
        rating: Math.round(c.rating),
        title: c.contest.title
    })) || [];

    return (
        <div className="h-full flex flex-col gap-6">
             {/* Top Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <StatCard
                    label="Contest Rating"
                    value={data.contestStats?.rating ? Math.round(data.contestStats.rating) : "N/A"}
                    trend={data.contestStats?.topPercentage ? `Top ${data.contestStats.topPercentage}%` : undefined}
                />
                 <StatCard
                    label="Global Ranking"
                    value={data.contestStats?.globalRanking?.toLocaleString() || "N/A"}
                />
                 <StatCard
                    label="Contests Attended"
                    value={data.contestStats?.attendedContestsCount || 0}
                />
                 <StatCard
                    label="Problems Solved"
                    value={easy + medium + hard}
                />
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
                {/* Contest Rating Graph */}
                <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 relative flex flex-col">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Rating History</h4>
                    {contestHistory.length > 0 ? (
                        <div className="flex-1 w-full min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={contestHistory}>
                                    <defs>
                                        <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ display: 'none' }}
                                    />
                                    <Area type="monotone" dataKey="rating" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRating)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                         <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No contest history</div>
                    )}
                </div>

                 {/* Difficulty Breakdown - Mini Bar */}
                 <div className="w-full md:w-1/3 flex flex-col justify-center space-y-4 p-4 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium"><span className="text-green-600">Easy</span> <span>{easy}</span></div>
                        <div className="w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${(easy / (easy+medium+hard))*100}%` }} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium"><span className="text-orange-600">Medium</span> <span>{medium}</span></div>
                        <div className="w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(medium / (easy+medium+hard))*100}%` }} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium"><span className="text-red-600">Hard</span> <span>{hard}</span></div>
                        <div className="w-full bg-gray-200 dark:bg-[#333] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: `${(hard / (easy+medium+hard))*100}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CodeChefView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && isVerified && !cachedData) {
            setLoading(true);
            checkCodeChefUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, isVerified, cachedData, onDataFetched]);

    if (!handle || !isVerified) return <ConnectPlatformEmptyState logoPath="/handles_logos/codechef.png" message="Connect CodeChef" subMessage="Link and verify your account in settings" />;
    if (loading) return <LoadingState />;
    if (!data) return <ErrorState />;

     return (
        <div className="h-full flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <StatCard label="Rating" value={data.currentRating} trend={data.stars} />
                 <StatCard label="Global Rank" value={data.globalRank} />
                 <StatCard label="Fully Solved" value={data.fullySolvedCount} />
                 <StatCard label="Contests" value={data.ratingData?.length || 0} />
            </div>

            <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 relative flex flex-col">
                 <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Rating History</h4>
                  {data.ratingData && data.ratingData.length > 0 ? (
                        <div className="flex-1 w-full min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.ratingData}>
                                     <defs>
                                        <linearGradient id="colorCCRating" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b4513" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#8b4513" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ display: 'none' }}
                                    />
                                    <Area type="monotone" dataKey="rating" stroke="#8b4513" fillOpacity={1} fill="url(#colorCCRating)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                         <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No contest history</div>
                    )}
            </div>
        </div>
    );
}

export function CodeForcesView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && isVerified && !cachedData) {
            setLoading(true);
            checkCodeforcesUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, isVerified, cachedData, onDataFetched]);

    if (!handle || !isVerified) return <ConnectPlatformEmptyState logoPath="/handles_logos/codeforces.png" message="Connect CodeForces" subMessage="Link and verify your account in settings" />;
    if (loading) return <LoadingState />;
    if (!data) return <ErrorState />;

    const solved = data.solvedByDifficulty || { EASY: 0, MEDIUM: 0, HARD: 0, TOTAL: 0 };
    const chartData = [
        { name: 'Easy', value: solved.EASY, color: '#22c55e' },
        { name: 'Medium', value: solved.MEDIUM, color: '#f97316' },
        { name: 'Hard', value: solved.HARD, color: '#ef4444' },
    ];

    return (
        <div className="h-full flex flex-col gap-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <StatCard label="Rating" value={data.rating || "Unrated"} />
                 <StatCard label="Max Rating" value={data.maxRating || "Unrated"} />
                 <StatCard label="Rank" value={data.rank || "-"} className="capitalize" />
                 <StatCard label="Total Solved" value={solved.TOTAL} />
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
                <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 flex flex-col justify-center">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Tags Distribution</h4>
                    {/* Placeholder for tags if we had them, or just another visual. Using solving breakdown chart here. */}
                    <div className="w-full h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12, fill: '#888'}} axisLine={false} tickLine={false}/>
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                                <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ContestsView({ performance }: { performance?: any[] }) {
    if (!performance || performance.length === 0) {
        return <div className="h-full flex items-center justify-center text-gray-400 text-sm">No contest history available</div>;
    }

    const data = performance.map(p => ({
        name: p.title,
        score: p.score,
        date: new Date(p.date).toLocaleDateString()
    }));

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <StatCard label="Total Contests" value={performance.length} />
                 <StatCard label="Avg Score" value={Math.round(performance.reduce((acc, p) => acc + p.score, 0) / performance.length)} />
                 <StatCard label="Highest Score" value={Math.max(...performance.map(p => p.score))} />
                 <StatCard label="Recent Contest" value={performance[performance.length - 1]?.score || 0} trend="Score" />
            </div>

            <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 flex flex-col">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Performance History</h4>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#888' }}
                                interval={0}
                                tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '12px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}
                                itemStyle={{ color: '#fff' }}
                                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                                formatter={(value: any) => [value, 'Score']}
                            />
                            <Bar
                                dataKey="score"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

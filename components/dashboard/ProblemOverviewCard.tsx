"use client";

import { useState, useEffect } from "react";
import { checkCodeChefUser, checkCodeforcesUser, checkLeetCodeUser } from "@/actions/platform.action";
import { Loader2, ExternalLink, Trophy, TrendingUp, Award, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Cell
} from "recharts";

interface ProblemOverviewCardProps {
    solvedByDifficulty: {
        EASY: number;
        MEDIUM: number;
        HARD: number;
    };
    totalProblems: {
        EASY: number;
        MEDIUM: number;
        HARD: number;
        TOTAL: number;
    };
    problemsSolved: number;
    leetCodeHandle?: string | null;
    codeChefHandle?: string | null;
    codeforcesHandle?: string | null;
}

export function ProblemOverviewCard({
    solvedByDifficulty,
    totalProblems,
    problemsSolved,
    leetCodeHandle,
    codeChefHandle,
    codeforcesHandle
}: ProblemOverviewCardProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "leetcode" | "codechef" | "codeforces">("overview");

    // Client-side cache for fetched data to avoid redundant network calls
    const [cachedData, setCachedData] = useState<{
        leetcode?: any;
        codechef?: any;
        codeforces?: any;
    }>({});

    const updateCache = (platform: "leetcode" | "codechef" | "codeforces", data: any) => {
        setCachedData(prev => ({ ...prev, [platform]: data }));
    };

    return (
        <div className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-200 dark:border-[#262626] p-6 hover:shadow-lg transition-all flex flex-col h-[500px]">
             {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Performance</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Analytics & Problem Solving</p>
                    </div>
                </div>

                {/* Modern Pill Tabs */}
                <div className="flex bg-gray-100 dark:bg-[#1a1a1a] p-1.5 rounded-full relative">
                     <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>Overview</TabButton>
                     <TabButton active={activeTab === "leetcode"} onClick={() => setActiveTab("leetcode")}>LeetCode</TabButton>
                     <TabButton active={activeTab === "codechef"} onClick={() => setActiveTab("codechef")}>CodeChef</TabButton>
                     <TabButton active={activeTab === "codeforces"} onClick={() => setActiveTab("codeforces")}>CodeForces</TabButton>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                 <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <OverviewView solvedByDifficulty={solvedByDifficulty} totalProblems={totalProblems} />
                        </motion.div>
                    )}

                    {activeTab === "leetcode" && (
                         <motion.div
                            key="leetcode"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <LeetCodeView
                                handle={leetCodeHandle}
                                cachedData={cachedData.leetcode}
                                onDataFetched={(data) => updateCache("leetcode", data)}
                            />
                        </motion.div>
                    )}

                    {activeTab === "codechef" && (
                        <motion.div
                            key="codechef"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                             className="h-full"
                        >
                             <CodeChefView
                                handle={codeChefHandle}
                                cachedData={cachedData.codechef}
                                onDataFetched={(data) => updateCache("codechef", data)}
                            />
                        </motion.div>
                    )}

                    {activeTab === "codeforces" && (
                         <motion.div
                            key="codeforces"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                             className="h-full"
                        >
                            <CodeForcesView
                                handle={codeforcesHandle}
                                cachedData={cachedData.codeforces}
                                onDataFetched={(data) => updateCache("codeforces", data)}
                            />
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className="relative px-4 py-1.5 text-xs font-semibold z-10 transition-colors duration-200"
        >
             {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white dark:bg-[#262626] shadow-sm rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <span className={`relative z-20 ${active ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                {children}
            </span>
        </button>
    );
}

// --- Views ---

function OverviewView({ solvedByDifficulty, totalProblems }: any) {
    const calculatedSolved = solvedByDifficulty.EASY + solvedByDifficulty.MEDIUM + solvedByDifficulty.HARD;
    const total = Math.max(totalProblems.TOTAL || 1, 1);
    const percentage = Math.round((calculatedSolved / total) * 100);
    const easyPct = (solvedByDifficulty.EASY / total) * 100;
    const medPct = (solvedByDifficulty.MEDIUM / total) * 100;
    const hardPct = (solvedByDifficulty.HARD / total) * 100;
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const easyArc = (easyPct / 100) * circumference;
    const medArc = (medPct / 100) * circumference;
    const hardArc = (hardPct / 100) * circumference;

     return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 h-full pb-4">
             <div className="w-full md:w-1/3 space-y-4 self-center">
                <StatRow color="bg-green-500" label="Easy" value={solvedByDifficulty.EASY} total={totalProblems.EASY} />
                <StatRow color="bg-orange-500" label="Medium" value={solvedByDifficulty.MEDIUM} total={totalProblems.MEDIUM} />
                <StatRow color="bg-red-500" label="Hard" value={solvedByDifficulty.HARD} total={totalProblems.HARD} />

                <div className="pt-4 border-t border-gray-100 dark:border-[#262626] mt-4">
                     <div className="flex justify-between items-center">
                         <span className="text-xs font-medium text-gray-500">Total Solved</span>
                         <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{calculatedSolved}</span>
                     </div>
                </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center h-full">
                <div className="relative w-56 h-56 md:w-64 md:h-64">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
                        <circle cx="50%" cy="50%" r={radius} fill="none" className="stroke-gray-100 dark:stroke-[#262626]" strokeWidth="16" />
                        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#22c55e" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={circumference - easyArc} strokeLinecap="round" />
                        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#f97316" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={circumference - medArc} strokeLinecap="round" style={{ transform: `rotate(${(easyPct / 100) * 360}deg)`, transformOrigin: "50% 50%" }} />
                        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={circumference - hardArc} strokeLinecap="round" style={{ transform: `rotate(${((easyPct + medPct) / 100) * 360}deg)`, transformOrigin: "50% 50%" }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter">{percentage}%</span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Platform</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


function LeetCodeView({ handle, cachedData, onDataFetched }: { handle?: string | null, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && !cachedData) {
            setLoading(true);
            checkLeetCodeUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, cachedData, onDataFetched]);

    if (!handle) return <EmptyState PlatformIcon={<Zap className="w-8 h-8 text-yellow-500" />} message="Connect LeetCode" subMessage="Link your account in settings" />;
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
                <div className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] relative flex flex-col">
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
                 <div className="w-full md:w-1/3 flex flex-col justify-center space-y-4 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#262626]">
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

function CodeChefView({ handle, cachedData, onDataFetched }: { handle?: string | null, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && !cachedData) {
            setLoading(true);
            checkCodeChefUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, cachedData, onDataFetched]);

    if (!handle) return <EmptyState PlatformIcon={<Trophy className="w-8 h-8 text-orange-700" />} message="Connect CodeChef" subMessage="Link your account in settings" />;
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

            <div className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] relative flex flex-col">
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

function CodeForcesView({ handle, cachedData, onDataFetched }: { handle?: string | null, cachedData?: any, onDataFetched: (data: any) => void }) {
    const [loading, setLoading] = useState(!cachedData);
    const [data, setData] = useState<any>(cachedData || null);

    useEffect(() => {
        if (handle && !cachedData) {
            setLoading(true);
            checkCodeforcesUser(handle).then(res => {
                if (res.success) {
                    setData(res);
                    onDataFetched(res);
                }
                setLoading(false);
            });
        }
    }, [handle, cachedData, onDataFetched]);

    if (!handle) return <EmptyState message="Connect CodeForces" subMessage="Link your account in settings" />;
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
                <div className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-[#262626] flex flex-col justify-center">
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

// --- Shared Components ---

function StatRow({ color, label, value, total }: { color: string; label: string; value: number; total?: number }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626]">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{value}</span>
                {total !== undefined && <span className="text-xs text-gray-400">/ {total}</span>}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, trend, className }: any) {
    return (
        <div className={`bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-[#262626] flex flex-col justify-between ${className}`}>
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

function EmptyState({ PlatformIcon, message, subMessage }: any) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-full">
                {PlatformIcon}
            </div>
            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{message}</h4>
                <p className="text-xs text-gray-500 max-w-[150px] mx-auto">{subMessage}</p>
            </div>
        </div>
    )
}

function LoadingState() {
     return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
}

function ErrorState() {
     return <div className="h-full flex items-center justify-center text-sm text-red-500">Failed to load data</div>
}

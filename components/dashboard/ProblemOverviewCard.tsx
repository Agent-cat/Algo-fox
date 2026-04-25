"use client";

import { useState, useEffect } from "react";
import { checkCodeChefUser, checkCodeforcesUser, checkLeetCodeUser } from "@/actions/platform.action";
import { Loader2, ExternalLink, Trophy, TrendingUp, Award, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CircularProgress } from "./CircularProgress";
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
        EASY: { count: number; breakdown: Record<string, number> };
        MEDIUM: { count: number; breakdown: Record<string, number> };
        HARD: { count: number; breakdown: Record<string, number> };
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
    leetCodeVerified?: boolean;
    codeChefVerified?: boolean;
    codeforcesVerified?: boolean;
    contestStats?: {
        attended: number;
        totalScore: number;
        performance?: {
            contestId: string;
            title: string;
            date: Date;
            score: number;
        }[];
    };
    managerViews?: {
        onViewContests?: () => void;
        onViewPlatform?: (platform: string) => void;
    };
}

export function ProblemOverviewCard({
    solvedByDifficulty,
    totalProblems,
    problemsSolved,
    leetCodeHandle,
    codeChefHandle,
    codeforcesHandle,
    leetCodeVerified,
    codeChefVerified,
    codeforcesVerified,
    contestStats,
    managerViews
}: ProblemOverviewCardProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "leetcode" | "codechef" | "codeforces" | "contests">("overview");

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
        <div className="bg-white dark:bg-[#141414] rounded-3xl border border-dashed border-gray-300 dark:border-[#262626] p-6 hover:shadow-lg transition-all flex flex-col h-[500px]">
             {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Performance</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Analytics & Problem Solving</p>
                    </div>
                </div>

                {/* Modern Pill Tabs */}
                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 dark:bg-[#1a1a1a] p-1.5 rounded-full relative">
                        <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>Overview</TabButton>
                        <TabButton active={activeTab === "contests"} onClick={() => setActiveTab("contests")}>Contests</TabButton>
                        <TabButton active={activeTab === "leetcode"} onClick={() => setActiveTab("leetcode")} showWarning={!leetCodeHandle || !leetCodeVerified}>LeetCode</TabButton>
                        <TabButton active={activeTab === "codechef"} onClick={() => setActiveTab("codechef")} showWarning={!codeChefHandle || !codeChefVerified}>CodeChef</TabButton>
                        <TabButton active={activeTab === "codeforces"} onClick={() => setActiveTab("codeforces")} showWarning={!codeforcesHandle || !codeforcesVerified}>CodeForces</TabButton>
                    </div>

                    {managerViews && activeTab !== "overview" && (
                        <button
                            onClick={() => {
                                if (activeTab === "contests") managerViews.onViewContests?.();
                                else managerViews.onViewPlatform?.(
                                    activeTab === "leetcode" ? "LeetCode" :
                                    activeTab === "codechef" ? "CodeChef" : "CodeForces"
                                );
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-widest transition-all border border-orange-500/20"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Detailed View
                        </button>
                    )}
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
                            <OverviewView
                                solvedByDifficulty={solvedByDifficulty}
                                totalProblems={totalProblems}
                                contestStats={contestStats}
                            />
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
                                isVerified={leetCodeVerified}
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
                                isVerified={codeChefVerified}
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
                                isVerified={codeforcesVerified}
                                cachedData={cachedData.codeforces}
                                onDataFetched={(data) => updateCache("codeforces", data)}
                            />
                        </motion.div>
                    )}

                    {activeTab === "contests" && (
                         <motion.div
                            key="contests"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                             className="h-full"
                        >
                            <ContestsView
                                performance={contestStats?.performance}
                            />
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, children, showWarning }: { active: boolean; onClick: () => void; children: React.ReactNode; showWarning?: boolean }) {
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
                {showWarning && (
                    <span
                        className="absolute -top-1 -right-2 text-red-500 text-sm font-bold animate-bounce"
                        title="Account not connected"
                    >
                        !
                    </span>
                )}
            </span>
        </button>
    );
}

function BreakdownTooltip({ breakdown, mousePos }: { breakdown: Record<string, number>; mousePos: { x: number; y: number } }) {
    const entries = Object.entries(breakdown).filter(([_, count]) => count > 0);
    if (entries.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
                left: mousePos.x + 16,
                top: mousePos.y - 12,
                position: 'fixed'
            }}
            className="z-200 pointer-events-none min-w-[160px]"
        >
            <div className="bg-white/95 dark:bg-[#1a1a1a]/95 text-gray-900 dark:text-white p-3 rounded-xl shadow-2xl border border-gray-200 dark:border-[#333] backdrop-blur-md">
                <div className="flex flex-col gap-2">
                    {entries.map(([domain, count]) => (
                        <div key={domain} className="flex justify-between items-center gap-6">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">{domain}</span>
                            <span className="text-xs font-bold tabular-nums">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// --- Views ---

function OverviewView({ solvedByDifficulty, totalProblems, contestStats }: any) {
    const easyCount = solvedByDifficulty.EASY.count || 0;
    const medCount = solvedByDifficulty.MEDIUM.count || 0;
    const hardCount = solvedByDifficulty.HARD.count || 0;

    const calculatedSolved = easyCount + medCount + hardCount;
    const total = Math.max(totalProblems.TOTAL || 1, 1);
    const percentage = Math.round((calculatedSolved / total) * 100);

    const easyPct = (easyCount / total) * 100;
    const medPct = (medCount / total) * 100;
    const hardPct = (hardCount / total) * 100;

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const easyArc = (easyPct / 100) * circumference;
    const medArc = (medPct / 100) * circumference;
    const hardArc = (hardPct / 100) * circumference;

    const [hoveredBreakdown, setHoveredBreakdown] = useState<Record<string, number> | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

     return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 h-full pb-4" onMouseMove={handleMouseMove}>
             <div className="w-full md:w-1/3 flex flex-col justify-center h-full">
                <div className="space-y-4">
                    <StatRow color="bg-green-500" label="Easy" value={easyCount} total={totalProblems.EASY} onHoverChange={(h) => setHoveredBreakdown(h ? solvedByDifficulty.EASY.breakdown : null)} />
                    <StatRow color="bg-orange-500" label="Medium" value={medCount} total={totalProblems.MEDIUM} onHoverChange={(h) => setHoveredBreakdown(h ? solvedByDifficulty.MEDIUM.breakdown : null)} />
                    <StatRow color="bg-red-500" label="Hard" value={hardCount} total={totalProblems.HARD} onHoverChange={(h) => setHoveredBreakdown(h ? solvedByDifficulty.HARD.breakdown : null)} />
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#262626] flex items-center justify-around text-center">
                     <div className="flex flex-col items-center">
                         <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Contests</span>
                         <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tighter">{contestStats?.attended || 0}</span>
                     </div>
                     <div className="w-px h-8 bg-gray-100 dark:bg-[#262626]" />
                     <div className="flex flex-col items-center">
                         <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Contest Score</span>
                         <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tighter">{contestStats?.totalScore || 0}</span>
                     </div>
                </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center h-full" onMouseMove={handleMouseMove}>
                <div className="relative w-56 h-56 md:w-64 md:h-64">
                    <CircularProgress
                        solved={calculatedSolved}
                        total={total}
                        easyPct={easyPct}
                        medPct={medPct}
                        hardPct={hardPct}
                        onHoverEasy={(h: boolean) => setHoveredBreakdown(h ? solvedByDifficulty.EASY.breakdown : null)}
                        onHoverMed={(h: boolean) => setHoveredBreakdown(h ? solvedByDifficulty.MEDIUM.breakdown : null)}
                        onHoverHard={(h: boolean) => setHoveredBreakdown(h ? solvedByDifficulty.HARD.breakdown : null)}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter">{percentage}%</span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Practice</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {hoveredBreakdown && <BreakdownTooltip breakdown={hoveredBreakdown} mousePos={mousePos} />}
            </AnimatePresence>
        </div>
    );
}


function LeetCodeView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
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

    if (!handle || !isVerified) return <EmptyState logoPath="/handles_logos/leetcode.png" message="Connect LeetCode" subMessage="Link and verify your account in settings" />;
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

function CodeChefView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
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

    if (!handle || !isVerified) return <EmptyState logoPath="/handles_logos/codechef.png" message="Connect CodeChef" subMessage="Link and verify your account in settings" />;
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

function CodeForcesView({ handle, isVerified, cachedData, onDataFetched }: { handle?: string | null, isVerified?: boolean, cachedData?: any, onDataFetched: (data: any) => void }) {
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

    if (!handle || !isVerified) return <EmptyState logoPath="/handles_logos/codeforces.png" message="Connect CodeForces" subMessage="Link and verify your account in settings" />;
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

function ContestsView({ performance }: { performance?: any[] }) {
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

            <div className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-100 dark:border-[#262626] flex flex-col">
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

// --- Shared Components ---

function StatRow({ color, label, value, total, onHoverChange }: { color: string; label: string; value: number; total?: number; onHoverChange: (h: boolean) => void }) {
    const handleMouseMove = (e: React.MouseEvent) => {
        // If we want the rows to also support mouse follow, they need to pass it up.
        // But for now, since they are static, just trigger hover.
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onMouseMove={(e) => {
                // Trigger mouse pos update in parent if possible
                // But row tracking might be tricky without a ref-based mouse track.
            }}
        >
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] transition-all group-hover:border-gray-300 dark:group-hover:border-[#444] group-hover:shadow-sm">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{value}</span>
                    {total !== undefined && <span className="text-xs text-gray-400">/ {total}</span>}
                </div>
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

function EmptyState({ logoPath, message, subMessage }: any) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 p-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-[#262626]">
                <img src={logoPath} alt={message} className="w-full h-full object-contain" />
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

function LoadingState() {
     return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
}

function ErrorState() {
     return <div className="h-full flex items-center justify-center text-sm text-red-500">Failed to load data</div>
}

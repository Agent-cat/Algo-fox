"use client";

import { useEffect, useState, useMemo } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, User, Crown, ChevronLeft, ChevronRight, RotateCw, Filter, Building2, Globe, Flame, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getInstitutions } from "@/actions/admin/institution";
import Link from "next/link";
import Image from "next/image";

const PAGE_SIZE = 50;

const getRankDisplay = (rank: number) => {
    if (rank === 0) return { medal: "🥇", color: "from-yellow-300 to-yellow-600", text: "Champion" };
    if (rank === 1) return { medal: "🥈", color: "from-gray-300 to-gray-500", text: "Apex" };
    if (rank === 2) return { medal: "🥉", color: "from-orange-300 to-orange-600", text: "Elite" };
    if (rank < 10) return { medal: null, color: null, text: "Legend" };
    if (rank < 50) return { medal: null, color: null, text: "Master" };
    return { medal: null, color: null, text: "Warrior" };
};

export default function LeaderboardPage() {
    const { data: session } = authClient.useSession();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInstitution, setSelectedInstitution] = useState<string>("all");
    const [availableInstitutions, setAvailableInstitutions] = useState<{id: string, name: string}[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (session?.user?.role === "ADMIN") {
            setIsAdmin(true);
            const fetchInst = async () => {
                const res = await getInstitutions();
                if (res.success && res.institutions) {
                    setAvailableInstitutions(res.institutions as any);
                }
            };
            fetchInst();
        }
    }, [session?.user?.role]);

    const fetchData = async (force: boolean = false) => {
        if (!force) setIsLoading(true);
        else setIsRefreshing(true);

        try {
            const data = await getLeaderboardData(selectedInstitution, force);
            setLeaderboard(data);
        } catch (error) {
            console.error("Failed to fetch leaderboard", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedInstitution]);

    const totalPages = Math.ceil(leaderboard.length / PAGE_SIZE);

    const displayedStudents = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return leaderboard.slice(start, start + PAGE_SIZE);
    }, [leaderboard, currentPage]);

    return (
        <AnimatePresence mode="wait">
        {isLoading ? (
            <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen flex flex-col items-center justify-center pt-12 bg-gradient-to-br from-[#fafafa] to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a]"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-t-orange-500 border-r-orange-500/50 animate-spin" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Fetching rankings...</p>
                </div>
            </motion.div>
        ) : (
        <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-br from-[#fafafa] via-white to-gray-50 dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#1a1a1a]"
        >
            {/* Animated background orb */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-orange-500 opacity-20 dark:opacity-30 blur-[120px] rounded-full animate-pulse pointer-events-none" />
            
            {/* Header Section */}
            <div className="relative pt-8 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Flame className="w-5 h-5 text-orange-500 animate-bounce" style={{ animationDelay: "0s" }} />
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Global Rankings</span>
                            <Flame className="w-5 h-5 text-orange-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white uppercase"
                    >
                        Competitive Arena
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest"
                    >
                        {selectedInstitution === 'all' ? 'Global Network' : availableInstitutions.find(i => i.id === selectedInstitution)?.name || 'Campus'} • {leaderboard.length} Competitors
                    </motion.p>
                </div>
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                {isAdmin && (
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="flex gap-3"
                        >
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 rounded-lg text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/50 transition-all shadow-sm hover:shadow-md"
                            >
                                <Filter className="w-4 h-4" />
                                Filter Campus
                            </button>
                            <button
                                onClick={() => fetchData(true)}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 rounded-lg text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                            >
                                <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </motion.div>

                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="flex flex-wrap justify-center gap-2 p-4 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-white/10 shadow-lg"
                            >
                                <button
                                    onClick={() => setSelectedInstitution("all")}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                                        selectedInstitution === "all"
                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                        : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                                    }`}
                                >
                                    <Globe className="w-4 h-4" />
                                    All Networks
                                </button>
                                {availableInstitutions.map((inst) => (
                                    <button
                                        key={inst.id}
                                        onClick={() => setSelectedInstitution(inst.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                            selectedInstitution === inst.id
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                            : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                                        }`}
                                    >
                                        <Building2 className="w-3.5 h-3.5" />
                                        {inst.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Leaderboard Table */}
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/70 dark:bg-[#0d0d0d]/70 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl dark:shadow-orange-500/5 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-white/5 dark:to-white/2 border-b border-gray-100 dark:border-white/10">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Rank
                                    </th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        College ID
                                    </th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Student Name
                                    </th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Academic Year
                                    </th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Branch
                                    </th>
                                    <th className="px-8 py-5 text-center text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Problems
                                    </th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                                        Total Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {displayedStudents.map((user, index) => {
                                        const actualRank = (currentPage - 1) * PAGE_SIZE + index;
                                        const isCurrentUser = user.userId === session?.user?.id;
                                        const rankInfo = getRankDisplay(actualRank);

                                        return (
                                            <motion.tr
                                                key={user.userId}
                                                layout
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                className={`group transition-all duration-200 ${
                                                    isCurrentUser
                                                    ? "bg-orange-50/50 dark:bg-orange-500/10 hover:bg-orange-50 dark:hover:bg-orange-500/15"
                                                    : "hover:bg-gray-50 dark:hover:bg-white/2"
                                                }`}
                                            >
                                                {/* Rank Cell */}
                                                <td className="px-8 py-5">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        {actualRank < 3 ? (
                                                            <div className={`w-12 h-12 bg-gradient-to-br ${rankInfo.color} rounded-xl flex items-center justify-center shadow-lg shadow-${actualRank === 0 ? 'yellow' : actualRank === 1 ? 'gray' : 'orange'}-500/30`}>
                                                                <span className="text-2xl">{rankInfo.medal}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10">
                                                                <span className="text-sm font-black text-gray-600 dark:text-gray-400">
                                                                    #{actualRank + 1}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <div className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                {rankInfo.text}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </td>

                                                {/* College ID */}
                                                <td className="px-8 py-5">
                                                    <code className="text-sm font-black text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg">
                                                        {user.userId.slice(0, 8).toUpperCase()}
                                                    </code>
                                                </td>

                                                {/* Student Name */}
                                                <td className="px-8 py-5">
                                                    <Link
                                                        href={`/profile/${user.userId}`}
                                                        className="flex items-center gap-3 group/name"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-500/20 flex-shrink-0 shadow-sm">
                                                            {user.image ? (
                                                                <Image
                                                                    src={user.image}
                                                                    alt={user.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                                    <span className="text-xs font-black">{user.name?.charAt(0) || 'U'}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-black text-gray-900 dark:text-white group-hover/name:text-orange-500 dark:group-hover/name:text-orange-400 transition-colors uppercase tracking-tight">
                                                            {user.name}
                                                        </span>
                                                    </Link>
                                                </td>

                                                {/* Academic Year (Placeholder) */}
                                                <td className="px-8 py-5">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                                                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">2024</span>
                                                    </div>
                                                </td>

                                                {/* Branch (Placeholder) */}
                                                <td className="px-8 py-5">
                                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                        CS
                                                    </span>
                                                </td>

                                                {/* Problems Solved */}
                                                <td className="px-8 py-5 text-center">
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg"
                                                    >
                                                        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                        <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                                                            {user.problemsSolved}
                                                        </span>
                                                    </motion.div>
                                                </td>

                                                {/* Total Points */}
                                                <td className="px-8 py-5 text-right">
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-black text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
                                                    >
                                                        <Trophy className="w-4 h-4" />
                                                        <span className="tabular-nums">{user.totalScore.toLocaleString()}</span>
                                                    </motion.div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-8 py-5 bg-gray-50/50 dark:bg-white/2 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
                                Showing <span className="text-gray-900 dark:text-white">{(currentPage - 1) * PAGE_SIZE + 1}</span> — <span className="text-gray-900 dark:text-white">{Math.min(currentPage * PAGE_SIZE, leaderboard.length)}</span> of <span className="text-gray-900 dark:text-white">{leaderboard.length}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-orange-500/50 disabled:opacity-30 transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </motion.button>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 px-3">
                                    <span className="text-gray-900 dark:text-white">{currentPage}</span> / {totalPages}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-orange-500/50 disabled:opacity-30 transition-all"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Footer Spacing */}
            <div className="h-16" />
        </motion.div>
        )}
        </AnimatePresence>
    );
}

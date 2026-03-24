"use client";

import { useEffect, useState, useMemo } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, User, Crown, CheckCircle2, ChevronLeft, ChevronRight, RotateCw, Filter, Building2, Globe, Award } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getInstitutions } from "@/actions/admin/institution";
import Link from "next/link";

const PAGE_SIZE = 50;

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
                className="min-h-[60vh] flex flex-col items-center justify-center pt-12"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading standings...</p>
                </div>
            </motion.div>
        ) : (
        <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen dark:bg-[#121212] pt-4"
        >
            {/* Header */}
            <div className="relative bg-[#fafafa] dark:bg-[#121212] pb-8 overflow-hidden">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center gap-2">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">Hall of Fame</h1>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.3em] opacity-80">
                            {selectedInstitution === 'all' ? 'Global Dominance' : availableInstitutions.find(i => i.id === selectedInstitution)?.name || 'Campus Standings'} • {leaderboard.length} Total Warriors
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 relative -mt-16">
                {/* Filter Controls */}
                {isAdmin && (
                    <div className="mb-6 flex flex-col items-center gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shadow-sm"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                Filter by Campus
                            </button>
                            <button
                                onClick={() => fetchData(true)}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shadow-sm disabled:opacity-50"
                            >
                                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap justify-center gap-2 p-4 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-[#262626] shadow-lg"
                            >
                                <button
                                    onClick={() => setSelectedInstitution("all")}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        selectedInstitution === "all"
                                        ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20 border-orange-400/50"
                                        : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5"
                                    }`}
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    All Institutions
                                </button>
                                {availableInstitutions.map((inst) => (
                                    <button
                                        key={inst.id}
                                        onClick={() => setSelectedInstitution(inst.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                                            selectedInstitution === inst.id
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                            : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
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

                {/* Leaderboard Table Container */}
                <div className="bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl rounded-xl border border-gray-100 dark:border-white/10 shadow-2xl dark:shadow-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-[#0d0d0d]/50 border-b border-gray-100 dark:border-white/5">
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] w-24">
                                        Rank
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                                        Warrior
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-center">
                                        Difficulty Split
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] text-center w-40">
                                        Arena Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {displayedStudents.map((user, index) => {
                                    const actualRank = (currentPage - 1) * PAGE_SIZE + index;
                                    const isCurrentUser = user.userId === session?.user?.id;

                                    return (
                                        <tr
                                            key={user.userId}
                                            className={`group transition-all duration-200 ${
                                                isCurrentUser
                                                ? "bg-orange-50/50 dark:bg-orange-500/5"
                                                : "hover:bg-gray-50 dark:hover:bg-white/2"
                                            }`}
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center">
                                                    {actualRank === 0 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30">
                                                            <Crown className="w-5 h-5 text-white drop-shadow-md" />
                                                        </div>
                                                    ) : actualRank === 1 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center shadow-lg shadow-gray-400/30">
                                                            <Medal className="w-5 h-5 text-white drop-shadow-md" />
                                                        </div>
                                                    ) : actualRank === 2 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                                                            <Medal className="w-5 h-5 text-white drop-shadow-md" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm font-black text-gray-400 dark:text-gray-600 opacity-50 italic">
                                                            #{actualRank + 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] shrink-0">
                                                        {user.image ? (
                                                            <img
                                                                src={user.image}
                                                                alt={user.name}
                                                                className="w-full h-full object-cover"
                                                                referrerPolicy="no-referrer"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <User className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/profile/${user.userId}`}
                                                            className="text-[13px] font-black text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors block truncate uppercase tracking-tight"
                                                        >
                                                            {user.name}
                                                        </Link>
                                                        <div className="flex items-center gap-1.5 mt-1 opacity-70">
                                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                                                                {user.problemsSolved} conquers
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between text-xs font-medium">
                                                        <span className="text-emerald-500">{user.stats.easy}E</span>
                                                        <span className="text-amber-500">{user.stats.medium}M</span>
                                                        <span className="text-rose-500">{user.stats.hard}H</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 flex rounded-sm overflow-hidden mt-1">
                                                        {user.problemsSolved > 0 ? (
                                                            <>
                                                                <div className="h-full bg-emerald-500 opacity-80" style={{ width: `${(user.stats.easy / user.problemsSolved) * 100}%` }} />
                                                                <div className="h-full bg-amber-500 opacity-80" style={{ width: `${(user.stats.medium / user.problemsSolved) * 100}%` }} />
                                                                <div className="h-full bg-rose-500 opacity-80" style={{ width: `${(user.stats.hard / user.problemsSolved) * 100}%` }} />
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 dark:bg-white/5" />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white rounded-lg shadow-md">
                                                    <Award className="w-4 h-4 text-orange-500" />
                                                    <span className="text-[12px] font-black text-white dark:text-black tracking-widest leading-none">
                                                        {user.totalScore.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-[#0d0d0d]/50 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                Showing <span className="text-gray-900 dark:text-white">{(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, leaderboard.length)}</span> of {leaderboard.length}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-100 dark:border-white/5 bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    Page <span className="text-gray-900 dark:text-white">{currentPage}</span> / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-100 dark:border-white/5 bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
        )}
        </AnimatePresence>
    );
}

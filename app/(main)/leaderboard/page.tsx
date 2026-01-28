"use client";

import { useEffect, useState, useMemo } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { motion } from "framer-motion";
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
    }, [session]);

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

    if (isLoading) {
        return (
            <div className="min-h-screen dark:bg-[#0a0a0a] pt-12">
                <div className="relative mb-12 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] pb-32 overflow-hidden">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] shadow-sm">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-orange-100 dark:border-orange-500/20 rounded-full" />
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" />
                        </div>
                        <p className="mt-6 text-gray-600 dark:text-gray-400 font-bold tracking-tight">
                            Loading leaderboard...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-[#0a0a0a] pt-12">
            {/* Header */}
            <div className="relative  bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] pb-32 overflow-hidden">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative group cursor-default">
                            <div className="absolute -inset-1 rounded-full"></div>
                            <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-[#0a0a0a] text-orange-600 dark:text-orange-500 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20">
                                <Trophy className="w-4 h-4" />
                                Leaderboard
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {selectedInstitution === 'all' ? 'Global Standings' : availableInstitutions.find(i => i.id === selectedInstitution)?.name || 'Campus Standings'} • {leaderboard.length} Warriors
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
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                                        selectedInstitution === "all"
                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                        : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
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

                {/* Leaderboard Table */}
                <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-[#262626]">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                                        Rank
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Warrior
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center w-32">
                                        Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
                                {displayedStudents.map((user, index) => {
                                    const actualRank = (currentPage - 1) * PAGE_SIZE + index;
                                    const isCurrentUser = user.userId === session?.user?.id;

                                    return (
                                        <tr
                                            key={user.userId}
                                            className={`group transition-all duration-200 ${
                                                isCurrentUser
                                                ? "bg-orange-50/50 dark:bg-orange-500/5"
                                                : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                            }`}
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center">
                                                    {actualRank === 0 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                                                            <Crown className="w-5 h-5 text-white" />
                                                        </div>
                                                    ) : actualRank === 1 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg shadow-gray-400/30">
                                                            <Medal className="w-5 h-5 text-white" />
                                                        </div>
                                                    ) : actualRank === 2 ? (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                                                            <Medal className="w-5 h-5 text-white" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                                                            #{actualRank + 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] flex-shrink-0">
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
                                                            className="text-sm font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors block truncate"
                                                        >
                                                            {user.name}
                                                        </Link>
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                                {user.problemsSolved} solved
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
                                                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 flex rounded-full overflow-hidden">
                                                        {user.problemsSolved > 0 ? (
                                                            <>
                                                                <div className="h-full bg-emerald-500" style={{ width: `${(user.stats.easy / user.problemsSolved) * 100}%` }} />
                                                                <div className="h-full bg-amber-500" style={{ width: `${(user.stats.medium / user.problemsSolved) * 100}%` }} />
                                                                <div className="h-full bg-rose-500" style={{ width: `${(user.stats.hard / user.problemsSolved) * 100}%` }} />
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-white rounded-lg">
                                                    <Award className="w-3.5 h-3.5 text-orange-400 dark:text-orange-500" />
                                                    <span className="text-sm font-bold text-white dark:text-black">
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
                        <div className="px-6 py-4 bg-gray-50 dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-[#262626] flex items-center justify-between">
                            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                Showing <span className="text-gray-900 dark:text-white font-bold">{(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, leaderboard.length)}</span> of {leaderboard.length}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                    Page <span className="text-gray-900 dark:text-white">{currentPage}</span> of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

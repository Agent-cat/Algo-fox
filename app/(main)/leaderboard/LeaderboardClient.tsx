"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy, Search, Maximize, Minimize, ChevronRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const PAGE_SIZE = 50;

export default function LeaderboardPage() {
    const { data: session } = authClient.useSession();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [totalEntries, setTotalEntries] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to page 1 on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchData = async (force: boolean = false) => {
        setIsLoading(true);
        try {
            const data = await getLeaderboardData({
                institutionId: "all",
                page: currentPage,
                pageSize: PAGE_SIZE,
                search: debouncedSearch,
                refresh: force
            });
            setLeaderboard(data.entries);
            setTotalEntries(data.total);
        } catch (error) {
            console.error("Failed to fetch leaderboard", error);
            toast.error("Failed to fetch rankings");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, debouncedSearch]);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                toast.error(`Error enabling full-screen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const totalPages = Math.ceil(totalEntries / PAGE_SIZE);

    const displayedStudents = leaderboard;



    return (
        <div ref={containerRef} className="h-[calc(100vh-64px)] w-full flex flex-col bg-[#fafafa] dark:bg-[#121212] overflow-hidden">
            {/* Search Bar - Full edge-to-edge */}
            <div className="bg-white/40 dark:bg-[#111]/40 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 flex items-center z-40">
                <div className="relative group flex-1">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Locate student by name or identifier..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-transparent pl-16 pr-6 py-6 rounded-none text-xs font-bold focus:ring-0 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                    />
                </div>

                <button
                    onClick={toggleFullscreen}
                    className="h-full px-8 border-l border-gray-100 dark:border-white/5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group active:scale-95"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? (
                        <Minimize className="w-4 h-4 text-orange-600" />
                    ) : (
                        <Maximize className="w-4 h-4 text-orange-600" />
                    )}
                    <span className="text-[10px] font-black uppercase text-gray-600 dark:text-gray-400 hidden md:block">
                        {isFullscreen ? "Windowed" : "Fullscreen"}
                    </span>
                </button>
            </div>

            {/* Table Area - Full flex fill */}
            <div className="flex-1 overflow-auto relative scrollbar-hide">
                {/* Soft Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-[1px] z-50 flex flex-col items-center justify-center gap-4 transition-all animate-in fade-in duration-500">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-orange-600">Syncing...</p>
                        </div>
                    </div>
                )}
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-40">
                        <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/90 dark:bg-[#111]/90 backdrop-blur-md">
                            <th className="sticky left-0 px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 w-20 bg-inherit z-50">#</th>
                            <th className="sticky left-20 px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 w-40 bg-inherit z-50">College ID</th>
                            <th className="sticky left-60 px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 w-96 bg-inherit z-50">Student Profile</th>
                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 min-w-[150px] bg-inherit">Branch</th>
                            <th className="px-8 py-4 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 min-w-[160px] bg-inherit">Problems Solved</th>
                            <th className="px-8 py-4 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-100 dark:border-white/5 min-w-[140px] bg-inherit">Academic Year</th>
                            <th className="px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest w-40 z-10 bg-orange-50/20 dark:bg-orange-500/10 border-l border-gray-100 dark:border-white/5">Total Points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/5 text-[12px]">
                        <AnimatePresence mode="wait">
                            {displayedStudents.map((entry, index) => {
                                const rank = (currentPage - 1) * PAGE_SIZE + index + 1;
                                const isTopThree = rank <= 3;
                                const isCurrentUser = entry.userId === session?.user?.id;

                                return (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        key={entry.userId}
                                        className={`group hover:bg-gray-50/50 dark:hover:bg-white/2 transition-all ${isCurrentUser ? 'bg-orange-50/30 dark:bg-orange-500/5' : ''}`}
                                    >
                                        <td className="sticky left-0 px-8 py-2 border-r border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#121212] z-20">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-black tabular-nums text-sm ${isTopThree ? 'text-orange-600' : 'text-gray-400'}`}>
                                                    {rank}
                                                </span>
                                                {isTopThree && (
                                                    <Trophy className={`w-4 h-4 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-orange-300'}`} />
                                                )}
                                            </div>
                                        </td>
                                        <td className="sticky left-20 px-8 py-2 border-r border-gray-100 dark:border-white/5 font-mono text-gray-900 dark:text-gray-200 font-bold bg-[#fafafa] dark:bg-[#121212] z-20">
                                            {entry.collegeId || entry.userId.slice(0, 8).toUpperCase()}
                                        </td>
                                        <td className="sticky left-60 px-8 py-2 border-r border-gray-100 dark:border-white/5 bg-[#fafafa] dark:bg-[#121212] z-20">
                                            <Link href={`/profile/${entry.userId}`} className="flex items-center gap-4 group/name">
                                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200/50 dark:border-orange-500/20 relative overflow-hidden shrink-0 flex items-center justify-center">
                                                    {entry.image ? (
                                                        <Image src={entry.image} alt={entry.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="text-sm font-black text-orange-600 dark:text-orange-400">
                                                            {entry.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-black text-gray-900 dark:text-white truncate group-hover/name:text-orange-600 transition-colors">
                                                        {entry.name || "Anonymous"}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                                        {entry.collegeName || "Global Student"}
                                                    </span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-8 py-2 border-r border-gray-100 dark:border-white/5 text-left text-[11px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                            {entry.branch || "N/A"}
                                        </td>
                                        <td className="px-8 py-2 border-r border-gray-100 dark:border-white/5 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                                                    {entry.problemsSolved || 0}
                                                </span>
                                                <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-tighter">Solved</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-2 border-r border-gray-100 dark:border-white/5 text-center">
                                            <div className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50 dark:border-blue-500/30 rounded-lg px-4 py-1.5">
                                                <span className="text-[11px] font-black text-blue-700 dark:text-blue-400">
                                                    {entry.year ? `${entry.year}${entry.year === 1 ? 'ST' : entry.year === 2 ? 'ND' : entry.year === 3 ? 'RD' : 'TH'} YEAR` : "N/A"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-2 text-right bg-orange-50/5 dark:bg-orange-500/5 relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-orange-500/50" />
                                            <div className="flex flex-col items-end px-2">
                                                <span className="text-xl font-black text-gray-950 dark:text-white tabular-nums tracking-tighter">
                                                    {entry.totalScore.toLocaleString()}
                                                </span>
                                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Points</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Navigation - Edge to edge bottom sticky */}
            <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl px-8 py-4 flex items-center justify-between border-t border-gray-100 dark:border-white/10 sticky bottom-0 z-50">
                <div className="flex items-center gap-4">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                        Rankings <span className="text-gray-900 dark:text-white ml-2">{(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, totalEntries)}</span> <span className="mx-2 text-gray-300">/</span> {totalEntries} Total
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="h-10 px-6 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="h-10 px-6 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

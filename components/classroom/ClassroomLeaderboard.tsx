"use client";

import { useState, useMemo, useRef } from "react";
import { Trophy, Search, ChevronLeft, ChevronRight, User, Trash2, Loader2, Maximize, Minimize } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { removeStudentFromClassroom } from "@/actions/classroom";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface Student {
    id: string;
    name: string | null;
    collegeId: string | null;
    collegeName?: string | null;
    branch?: string | null;
    totalScore: number;
    image: string | null;
    problemsSolved?: number;
    year?: number | null;
    codeChefHandle?: string | null;
    leetCodeHandle?: string | null;
    codeforcesHandle?: string | null;

    // Platform Specific Stats
    leetCodeRating?: number;
    leetCodeSolved?: number;
    leetCodeContests?: number;

    codeforcesRating?: number;
    codeforcesSolved?: number;
    codeforcesContests?: number;

    codeChefRating?: number;
    codeChefSolved?: number;
    codeChefContests?: number;

    updatedAt?: Date | string;
    _count?: {
        submissions: number;
        contestParticipations: number;
    };
}

interface ClassroomLeaderboardProps {
    students: Student[];
    isTeacher?: boolean;
    classroomId?: string;
}

const ITEMS_PER_PAGE = 20;

export function ClassroomLeaderboard({ students, isTeacher, classroomId }: ClassroomLeaderboardProps) {
    const { data: session } = authClient.useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'score_desc' | 'score_asc' | 'name_asc' | 'name_desc'>('score_desc');
    const [minScore, setMinScore] = useState(0);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const [filter, setFilter] = useState<'all' | 'top10' | 'active'>('all');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                toast.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Keep state in sync with external escapes
    useState(() => {
        if (typeof document !== 'undefined') {
            const handler = () => setIsFullscreen(!!document.fullscreenElement);
            document.addEventListener('fullscreenchange', handler);
            return () => document.removeEventListener('fullscreenchange', handler);
        }
    });

    const getLeetCodeScore = (s: Student) => {
        const ps = s.leetCodeSolved || 0;
        const r = s.leetCodeRating || 0;
        const nc = s.leetCodeContests || 0;
        const ratingBonus = r > 1300 ? Math.pow(r - 1300, 2) / 10 : 0;
        return (ps * 12) + ratingBonus + (nc * 60);
    };

    const getCodeforcesScore = (s: Student) => {
        const ps = s.codeforcesSolved || 0;
        const r = s.codeforcesRating || 0;
        const nc = s.codeforcesContests || 0;
        const ratingBonus = r > 800 ? Math.pow(r - 800, 2) / 12 : 0;
        return (ps * 15) + ratingBonus + (nc * 100);
    };

    const getCodeChefScore = (s: Student) => {
        const ps = s.codeChefSolved || 0;
        const r = s.codeChefRating || 0;
        const nc = s.codeChefContests || 0;
        const ratingBonus = r > 1200 ? Math.pow(r - 1200, 2) / 15 : 0;
        return (ps * 8) + ratingBonus + (nc * 80);
    };

    const filteredStudents = useMemo(() => {
        let filtered = students.filter(student =>
            (student.name || "Anonymous User").toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filter === 'top10') {
             filtered = [...filtered].sort((a,b) => b.totalScore - a.totalScore).slice(0, 10);
        } else if (filter === 'active') {
             filtered = filtered.filter(s => s.totalScore > 0);
        }

        return filtered.sort((a, b) => {
            if (sortBy === 'score_desc') return b.totalScore - a.totalScore;
            if (sortBy === 'score_asc') return a.totalScore - b.totalScore;

            const nameA = a.name || "Anonymous";
            const nameB = b.name || "Anonymous";

            if (sortBy === 'name_asc') return nameA.localeCompare(nameB);
            if (sortBy === 'name_desc') return nameB.localeCompare(nameA);
            return 0;
        });
    }, [students, searchQuery, sortBy, filter]);

    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleRemoveStudent = async (studentId: string, studentName: string) => {
        if (!classroomId) return;

        if (!confirm(`Are you sure you want to remove ${studentName || "this student"} from the classroom?`)) {
            return;
        }

        setRemovingId(studentId);
        try {
            const res = await removeStudentFromClassroom(classroomId, studentId);
            if (res.success) {
                toast.success("Student removed successfully");
            } else {
                toast.error(res.error || "Failed to remove student");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setRemovingId(null);
        }
    };

    if (students.length === 0) {
        return (
            <div className="bg-white/30 dark:bg-white/5 backdrop-blur-xl p-20 text-center border-t border-white/10 rounded-none mt-8 shadow-sm">
                <Trophy className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Leaderboard Offline</h3>
                <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">Awaiting student initialization for ranking problems.</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`flex flex-col gap-0 w-full ${isFullscreen ? 'h-screen bg-[#f0f0f0] dark:bg-[#121212] overflow-auto' : 'h-full bg-[#f0f0f0] dark:bg-[#121212]'}`}>
            <div className="bg-[#f0f0f0] dark:bg-[#111]/40 border-b border-gray-200 dark:border-white/5 p-6 rounded-none flex items-center gap-4">
                <div className="relative group flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Locate student by identifier or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/50 dark:bg-[#111]/40 backdrop-blur-sm border border-gray-200 dark:border-white/5 pl-14 pr-6 py-4 rounded-none text-xs font-medium focus:ring-0 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                    />
                </div>

                <button
                    onClick={toggleFullscreen}
                    className="h-[52px] px-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center gap-3 hover:border-orange-500/50 transition-all group shadow-sm active:scale-95"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? (
                        <>
                            <Minimize className="w-4 h-4 text-orange-600" />
                            <span className="text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">Windowed</span>
                        </>
                    ) : (
                        <>
                            <Maximize className="w-4 h-4 text-orange-600" />
                            <span className="text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">Fullscreen</span>
                        </>
                    )}
                </button>
            </div>

            <div className="flex-1 bg-transparent border-x border-transparent rounded-none overflow-hidden flex flex-col">
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-[#111]/90">
                                <th className="sticky left-0 px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 w-20 bg-gray-50 dark:bg-[#111] z-30">#</th>
                                <th className="sticky left-20 px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 w-40 bg-gray-50 dark:bg-[#111] z-30">College ID</th>
                                <th className="sticky left-60 px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 w-96 bg-gray-50 dark:bg-[#111] z-30">Student Profile</th>
                                <th className="px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[120px]">Branch</th>
                                <th className="px-8 py-3 text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[140px]">Problems Solved</th>
                                <th className="px-8 py-3 text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[120px]">Academic Year</th>
                                <th className="px-8 py-3 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest w-40 bg-orange-50/20 dark:bg-orange-500/10 z-10">Total Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50 dark:divide-white/5 text-[12px]">
                            <AnimatePresence>
                                {paginatedStudents.map((student, index) => {
                                    const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                                    const isTopThree = rank <= 3;
                                    const isEven = index % 2 === 0;
                                    const isSelected = student.id === selectedStudentId;
                                    const isCurrentUser = student.id === session?.user?.id;

                                    // Dynamic background for the row
                                    const rowClass = isSelected
                                        ? "bg-blue-600/10 dark:bg-blue-500/20"
                                        : isCurrentUser
                                            ? "bg-orange-100/20 dark:bg-orange-500/5"
                                            : isEven
                                                ? "bg-black/[0.03] dark:bg-white/[0.02]"
                                                : "bg-transparent";

                                    // Solid background for sticky columns to prevent transparency issues
                                    const stickyClass = isSelected
                                        ? "bg-[#e2e8f0] dark:bg-[#1e293b]"
                                        : isCurrentUser
                                            ? "bg-[#efe8e3] dark:bg-[#1a1614]"
                                            : isEven
                                                ? "bg-[#e5e5e5] dark:bg-[#161616]"
                                                : "bg-[#f0f0f0] dark:bg-[#121212]";

                                    return (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={student.id}
                                            onClick={() => setSelectedStudentId(student.id === selectedStudentId ? null : student.id)}
                                            className={`transition-all cursor-pointer active:scale-[0.998] ${rowClass}`}
                                        >
                                            <td className={`sticky left-0 px-8 py-1.5 border-r border-gray-200 dark:border-white/5 ${stickyClass} z-20`}>
                                                <div className="flex items-center gap-3">
                                                    <span className={`font-semibold tabular-nums text-sm ${isTopThree ? 'text-orange-600' : 'text-gray-400'}`}>
                                                        {rank}
                                                    </span>
                                                    {isTopThree && (
                                                        <Trophy className={`w-4 h-4 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-orange-300'}`} />
                                                    )}
                                                </div>
                                            </td>
                                            <td className={`sticky left-20 px-8 py-1.5 border-r border-gray-200 dark:border-white/5 font-mono text-gray-900 dark:text-gray-200 font-medium ${stickyClass} z-20`}>
                                                {student.collegeId || "N/A"}
                                            </td>
                                            <td className={`sticky left-60 px-8 py-1.5 border-r border-gray-200 dark:border-white/5 ${stickyClass} z-20`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-9 h-9 rounded-lg bg-linear-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200/50 dark:border-orange-500/20 relative overflow-hidden shrink-0 flex items-center justify-center">
                                                        {student.image ? (
                                                            <Image src={student.image} alt="" fill className="object-cover" />
                                                        ) : (
                                                            <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                                                {(student.name?.charAt(0) || student.collegeId?.charAt(0) || "?").toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                            {student.name || "Anonymous"}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                                            {student.collegeName || "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-1.5 border-r border-gray-200/50 dark:border-white/5 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {student.branch || "N/A"}
                                            </td>
                                            <td className="px-8 py-1.5 border-r border-gray-200 dark:border-white/5 text-center">
                                                <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                                                    {student.problemsSolved || 0}
                                                </span>
                                            </td>
                                            <td className="px-8 py-1.5 border-r border-gray-200 dark:border-white/5 text-center">
                                                <span className="text-[11px] font-semibold text-gray-900 dark:text-white tracking-wider">
                                                    {student.year ? `${student.year} ${student.year === 1 ? 'st' : student.year === 2 ? 'nd' : student.year === 3 ? 'rd' : 'th'} year` : "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-1.5 text-right bg-orange-50/10 dark:bg-orange-500/5 border-l border-gray-200/50 dark:border-white/5 relative">
                                                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-orange-500/40" />
                                                <div className="flex items-center justify-end gap-3 px-2">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
                                                            {student.totalScore.toLocaleString()}
                                                        </span>
                                                        <span className="text-[8px] font-semibold text-orange-500 uppercase tracking-tighter">Points</span>
                                                    </div>
                                                    {isTeacher && (
                                                        <button
                                                            onClick={() => handleRemoveStudent(student.id, student.name || "Student")}
                                                            disabled={removingId === student.id}
                                                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            {removingId === student.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Compact Pagination */}
                <div className="bg-gray-50/30 dark:bg-[#111]/80 backdrop-blur-md px-8 py-5 flex items-center justify-between border-t border-gray-200 dark:border-white/5">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                        Displaying <span className="text-gray-900 dark:text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)}</span> of {filteredStudents.length}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-none border border-gray-200 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-none border border-gray-200 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

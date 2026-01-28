"use client";

import { useState, useMemo } from "react";
import { Trophy, Medal, User, Crown, CheckCircle2, Clock, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FinalizeContestButton } from "./FinalizeContestButton";
import { LanguageLogo } from "./LanguageLogo";

interface ProblemStat {
    problemId: string;
    title: string;
    slug: string;
    score: number;
    maxScore: number;
    submissions: number;
    solved: boolean;
    solvedAt: string | null;
    language: string | null;
    languageId: number | null;
}

interface ContestStudent {
    id: string;
    name: string | null;
    score: number;
    image: string | null;
    problemsSolved: number;
    timeTaken: number;
    problemStats?: ProblemStat[];
}

interface ContestProblem {
    id: string;
    title: string;
    slug: string;
    maxScore: number;
}

interface ContestStandingsProps {
    students: ContestStudent[];
    currentUserId?: string;
    contestId: string;
    isFinalized?: boolean;
    userRole?: string;
    problems?: ContestProblem[];
}

const PAGE_SIZE = 50;

export function ContestStandings({ students, currentUserId, contestId, isFinalized = false, userRole, problems = [] }: ContestStandingsProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Check for permissions
    const canFinalize = ["ADMIN", "CONTEST_MANAGER", "INSTITUTION_MANAGER", "TEACHER"].includes(userRole || "");

    const totalPages = Math.ceil(students.length / PAGE_SIZE);

    const displayedStudents = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return students.slice(start, start + PAGE_SIZE);
    }, [students, currentPage]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (students.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#262626] p-12 text-center">
                <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The arena is silent...</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                    Standings will be updated as soon as warriors start solving challenges.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full max-w-full overflow-hidden">
            <div className="relative flex flex-col items-center justify-center gap-4 px-2 py-4">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Arena Leaderboard</h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1 opacity-70">
                        Contest Standing • Page {currentPage} of {totalPages}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {canFinalize && (
                        <FinalizeContestButton contestId={contestId} isFinalized={isFinalized} />
                    )}
                    <div className="px-4 py-1.5 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center gap-2 shadow-sm">
                        <User className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                            {students.length} Total Warriors
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px] table-fixed">
                        <thead>
                            <tr className="bg-gray-50/80 dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-[#262626]">
                                {/* Sticky Rank */}
                                <th className="sticky left-0 z-20 bg-gray-50/80 dark:bg-[#0d0d0d] px-4 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] w-[70px] border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                                    <div className="flex items-center justify-center">Rank</div>
                                </th>
                                {/* Sticky Warrior */}
                                <th className="sticky left-[70px] z-20 bg-gray-50/80 dark:bg-[#0d0d0d] px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] w-[250px] border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                                    Warrior
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] text-center w-[100px] border-r border-gray-200 dark:border-gray-800">
                                    Score
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] text-center w-[120px] border-r border-gray-200 dark:border-gray-800">
                                    Time
                                </th>
                                {problems.map((p, idx) => (
                                    <th key={p.id} className="px-4 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] text-center min-w-[140px] border-r border-gray-200 dark:border-gray-800 last:border-r-0">
                                        <div className="flex flex-col items-center">
                                            <span className="mb-1 text-gray-900 dark:text-white">Q{idx + 1}</span>
                                            <span className="text-[9px] lowercase font-medium opacity-50 truncate max-w-[100px]">{p.title}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
                            {displayedStudents.map((student, index) => {
                                const actualRank = (currentPage - 1) * PAGE_SIZE + index;
                                return (
                                    <tr
                                        key={student.id}
                                        className={`group transition-all duration-200 ${
                                            student.id === currentUserId
                                            ? "bg-orange-50/30 dark:bg-orange-500/5 shadow-inner"
                                            : "hover:bg-gray-50/30 dark:hover:bg-white/[0.01]"
                                        }`}
                                    >
                                        <td className={`sticky left-0 z-10 px-4 py-4 border-r border-gray-200 dark:border-gray-800 ${
                                            student.id === currentUserId ? "bg-orange-50/30 dark:bg-orange-500/5 shadow-inner" : "bg-white dark:bg-[#141414]"
                                        }`}>
                                            <div className="flex items-center justify-center">
                                                {actualRank === 0 ? (
                                                    <div className="w-7 h-7 bg-yellow-400 rounded flex items-center justify-center shadow-sm">
                                                        <Crown className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                ) : actualRank === 1 ? (
                                                    <div className="w-7 h-7 bg-gray-300 rounded flex items-center justify-center shadow-sm">
                                                        <Medal className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                ) : actualRank === 2 ? (
                                                    <div className="w-7 h-7 bg-orange-400 rounded flex items-center justify-center shadow-sm">
                                                        <Medal className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-black text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                        {actualRank + 1}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className={`sticky left-[70px] z-10 px-6 py-4 border-r border-gray-200 dark:border-gray-800 ${
                                            student.id === currentUserId ? "bg-orange-50/30 dark:bg-orange-500/5 shadow-inner" : "bg-white dark:bg-[#141414]"
                                        }`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626]">
                                                    {student.image ? (
                                                        <img
                                                            src={student.image}
                                                            alt={student.name || "Warrior"}
                                                            className="w-full h-full object-cover"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a] text-gray-400">
                                                            <User className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/profile/${student.id}`}
                                                        className="text-xs font-bold text-gray-900 dark:text-white hover:text-orange-500 transition-colors block truncate"
                                                    >
                                                        {student.name || "Anonymous Warrior"}
                                                    </Link>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter flex items-center gap-0.5">
                                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                                            {student.problemsSolved} Solved
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center border-r border-gray-100 dark:border-gray-800/50">
                                            <div className="inline-block px-2 py-0.5 bg-gray-900 dark:bg-white rounded text-[11px] font-black text-white dark:text-black">
                                                {student.score}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center border-r border-gray-100 dark:border-gray-800/50">
                                            <div className="flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400">
                                                <Clock className="w-3 h-3 opacity-40" />
                                                {formatTime(student.timeTaken)}
                                            </div>
                                        </td>
                                        {problems.map(p => {
                                            const stat = student.problemStats?.find(s => s.problemId === p.id);
                                            return (
                                                <td key={p.id} className="px-4 py-4 border-r border-gray-100 dark:border-gray-800/50 last:border-r-0">
                                                    <div className="flex flex-col items-center gap-1">
                                                        {stat?.solved ? (
                                                            <>
                                                                <div className="flex items-center gap-1">
                                                                    <LanguageLogo language={stat.language} className="w-6 h-6" />
                                                                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">+{stat.score}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                                                                    <div className="flex items-center gap-0.5" title="Submissions">
                                                                        {stat.submissions}
                                                                    </div>
                                                                    <span className="opacity-30">|</span>
                                                                    <div className="flex items-center gap-0.5" title="Solve Time">
                                                                        {stat.solvedAt ? new Date(stat.solvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center opacity-20">
                                                                {stat && stat.submissions > 0 ? (
                                                                    <>
                                                                        <span className="text-[11px] font-black text-red-500">0</span>
                                                                        <div className="flex items-center gap-0.5 text-[8px] font-bold text-gray-400">
                                                                            <Hash className="w-2 h-2" />
                                                                            {stat.submissions}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <div className="w-5 h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-[#262626] flex items-center justify-between">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Showing <span className="text-gray-900 dark:text-white">{(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, students.length)}</span> of {students.length}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Logic to show a window of pages
                                    let pageNum = currentPage;
                                    if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;

                                    if (pageNum <= 0 || pageNum > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                                                currentPage === pageNum
                                                ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-md"
                                                : "bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

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

            {/* End Indicator for single page */}
            {totalPages <= 1 && students.length > 5 && (
                <div className="py-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50/50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-[#1a1a1a] rounded-lg">
                        <Trophy className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Leaderboard Complete
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}


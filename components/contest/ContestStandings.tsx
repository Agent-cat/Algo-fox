"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trophy, Medal, User, Crown, CheckCircle2, Clock, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FinalizeContestButton } from "./FinalizeContestButton";
import { LanguageLogo } from "./LanguageLogo";
import * as XLSX from "xlsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface ProblemStat {
    problemId: string;
    title: string;
    slug: string;
    score: number;
    maxScore: number;
    submissions: number;
    wrongAttempts: number;
    solved: boolean;
    solvedAt: string | null;
    language: string | null;
    languageId: number | null;
    passedPercentage: number;
    maxPassed: number;
    totalTestCases: number;
}

interface Student {
    id: string;
    name: string | null;
    score: number;
    image: string | null;
    problemsSolved: number;
    timeTaken: number;
    problemStats?: ProblemStat[];
    ipAddress?: string | null;
    totalViolations?: number;
}

interface ContestProblem {
    id: string;
    title: string;
    description?: string | null;
    slug: string;
    maxScore: number;
}
interface ContestStandingsProps {
    students: Student[];
    currentUserId?: string | null;
    contestId: string;
    isFinalized?: boolean;
    userRole?: string; // Using string to avoid @prisma/client import issues in client component if they arise
    problems?: ContestProblem[];
    pagination?: {
        page: number;
        totalPages: number;
        total: number;
    };
}

export function ContestStandings({ students, currentUserId, contestId, isFinalized = false, userRole, problems = [], pagination }: ContestStandingsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use server-side pagination values if available, fallback to local (though shouldn't happen now)
    const currentPage = pagination?.page || 1;
    const totalPages = pagination?.totalPages || 1;
    const totalStudents = pagination?.total || students.length;

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

    const canFinalize = userRole === "ADMIN" || userRole === "INSTITUTION_MANAGER" || userRole === "CONTEST_MANAGER" || userRole === "TEACHER";

    return (
        <div className="space-y-6 w-full max-w-full overflow-hidden">
            <AnimatePresence>
                {/* Header ... */}
            </AnimatePresence>

            <div className="relative flex flex-col items-center justify-center gap-4 px-2 py-4">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Arena Leaderboard</h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1 opacity-70">
                        Contest Standing • Page {currentPage} of {totalPages}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {canFinalize && (
                        <>
                            <FinalizeContestButton contestId={contestId} isFinalized={isFinalized} />
                            <button
                                onClick={() => {
                                    const rows = students.map((s: Student, idx: number) => {
                                            const row: any = {
                                                "Rank": idx + 1,
                                                "Name": s.name || "Anonymous",
                                                "Score": s.score,
                                                "Time Taken (ms)": s.timeTaken,
                                                "Total Violations": s.totalViolations || 0,
                                                "IP Address History": s.ipAddress || ""
                                            };

                                            problems.forEach((p: ContestProblem, i: number) => {
                                                const stat = s.problemStats?.find((ps: ProblemStat) => ps.problemId === p.id);
                                                const score = stat?.solved ? stat.score : 0;
                                                const wrong = stat?.wrongAttempts || 0;
                                                row[`Q${i+1} (${p.title})`] = `${score} (${wrong})`;
                                            });

                                        return row;
                                    });

                                    const worksheet = XLSX.utils.json_to_sheet(rows);
                                    const workbook = XLSX.utils.book_new();
                                    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
                                    XLSX.writeFile(workbook, `contest-${contestId}-results.xlsx`);
                                }}
                                className="px-4 py-1.5 bg-[#1d6f42] hover:bg-[#155331] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                            >
                                Download Excel
                            </button>
                        </>
                    )}
                    <div className="px-4 py-1.5 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center gap-2 shadow-sm">
                        <User className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                            {totalStudents} Total Warriors
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
                                <th className="sticky left-0 z-20 bg-gray-50/80 dark:bg-[#0d0d0d] px-4 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest w-[70px] border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                                    <div className="flex items-center justify-center">Rank</div>
                                </th>
                                {/* Sticky Warrior */}
                                <th className="sticky left-[70px] z-20 bg-gray-50/80 dark:bg-[#0d0d0d] px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest w-[250px] border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                                    Warrior
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center w-[100px] border-r border-gray-200 dark:border-gray-800">
                                    Score
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center w-[120px] border-r border-gray-200 dark:border-gray-800">
                                    Time
                                </th>
                                {problems.map((p: ContestProblem, idx: number) => (
                                    <th
                                        key={p.id}
                                        className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center min-w-[140px] border-r border-gray-200 dark:border-gray-800 last:border-r-0 transition-colors cursor-pointer hover:bg-orange-500/5 text-gray-400 group/th"
                                    >
                                        <div className="flex flex-col items-center h-full">
                                            <Link
                                                href={`/problems/${p.slug}`}
                                                className="flex flex-col items-center flex-1 w-full"
                                            >
                                                <span className="mb-1 text-gray-900 dark:text-white group-hover/th:text-orange-500 transition-colors">Q{idx + 1}</span>
                                                <span className="text-[9px] lowercase font-medium opacity-50 truncate max-w-[130px]">{p.title}</span>
                                                <span className="mt-2 px-3 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[8px] font-black rounded border border-orange-500/20 opacity-0 group-hover/th:opacity-100 transition-all hover:bg-orange-500 hover:text-white uppercase tracking-tighter">
                                                    Solve in Practice
                                                </span>
                                            </Link>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#1a1a1a]">
                            {students.map((student: Student, index: number) => {
                                const actualRank = (currentPage - 1) * 50 + index;
                                return (
                                    <tr
                                        key={student.id}
                                        className={`group transition-all duration-200 ${
                                            student.id === currentUserId
                                            ? "bg-orange-50/30 dark:bg-orange-500/5 shadow-inner"
                                            : "hover:bg-gray-50/30 dark:hover:bg-white/1"
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
                                        {problems.map((p: ContestProblem) => {
                                            const stat = student.problemStats?.find((s: ProblemStat) => s.problemId === p.id);
                                            return (
                                                <td key={p.id} className="px-4 py-4 border-r border-gray-100 dark:border-gray-800/50 last:border-r-0" title={p.title}>
                                                    <div className="flex flex-col items-center gap-1">
                                                        {stat && stat.submissions > 0 ? (
                                            <div className="flex flex-col items-center gap-1.5 w-full">
                                                {/* Progress Bar for partial completion */}
                                                <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden border border-gray-200 dark:border-white/5">
                                                    <div
                                                        className={`h-full transition-all duration-300 ${
                                                            stat.solved ? "bg-emerald-500" :
                                                            stat.passedPercentage > 0 ? "bg-orange-500" : "bg-red-500"
                                                        }`}
                                                        style={{ width: `${stat.passedPercentage}%` }}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between w-full px-1">
                                                    {/* Score or Percentage */}
                                                    <span className={`text-[10px] font-black ${
                                                        stat.solved ? "text-emerald-600 dark:text-emerald-400" :
                                                        stat.passedPercentage > 0 ? "text-orange-600 dark:text-orange-400" : "text-red-500"
                                                    }`}>
                                                        {stat.solved ? `+${stat.score}` : `${stat.passedPercentage}%`}
                                                    </span>

                                                    {/* Wrong Attempts / Total Submissions */}
                                                    <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                                                        <span title="Wrong Attempts" className="text-red-500/70">-{stat.wrongAttempts}</span>
                                                        <span className="opacity-30">|</span>
                                                        <span title="Total Submissions">{stat.submissions}</span>
                                                    </div>
                                                </div>

                                                {/* Meta Info: Time or Best Case count */}
                                                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    {stat.solved ? (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-2 h-2" />
                                                            {stat.solvedAt ? new Date(stat.solvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                                        </div>
                                                    ) : (
                                                        <span>{stat.maxPassed}/{stat.totalTestCases} Cases</span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-5 h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
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
                            Showing <span className="text-gray-900 dark:text-white">{(currentPage - 1) * 50 + 1} - {Math.min(currentPage * 50, totalStudents)}</span> of {totalStudents}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("page", Math.max(1, currentPage - 1).toString());
                                    router.push(`/contest/${contestId}/standings?${params.toString()}`);
                                }}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum = currentPage;
                                    if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;

                                    if (pageNum <= 0 || pageNum > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams.toString());
                                                params.set("page", pageNum.toString());
                                                router.push(`/contest/${contestId}/standings?${params.toString()}`);
                                            }}
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
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("page", Math.min(totalPages, currentPage + 1).toString());
                                    router.push(`/contest/${contestId}/standings?${params.toString()}`);
                                }}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Problem Details Modal */}
            {/* Modal removed as per request */}
        </div>
    );
}


"use client";

import { useState, useMemo } from "react";
import { Trophy, Search, ChevronLeft, ChevronRight, User, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { removeStudentFromClassroom } from "@/actions/classroom";
import { toast } from "sonner";

interface Student {
    id: string;
    name: string | null;
    totalScore: number;
    image: string | null;
}

interface ClassroomLeaderboardProps {
    students: Student[];
    isTeacher?: boolean;
    classroomId?: string;
}

const ITEMS_PER_PAGE = 20;

export function ClassroomLeaderboard({ students, isTeacher, classroomId }: ClassroomLeaderboardProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'score_desc' | 'score_asc' | 'name_asc' | 'name_desc'>('score_desc');
    const [minScore, setMinScore] = useState(0);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const filteredStudents = useMemo(() => {
        let filtered = students.filter(student =>
            (student.name || "Anonymous User").toLowerCase().includes(searchQuery.toLowerCase()) &&
            student.totalScore >= minScore
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'score_desc') return b.totalScore - a.totalScore;
            if (sortBy === 'score_asc') return a.totalScore - b.totalScore;

            const nameA = a.name || "Anonymous";
            const nameB = b.name || "Anonymous";

            if (sortBy === 'name_asc') return nameA.localeCompare(nameB);
            if (sortBy === 'name_desc') return nameB.localeCompare(nameA);
            return 0;
        });
    }, [students, searchQuery, sortBy, minScore]);

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
            <div className="bg-white dark:bg-[#141414] p-16 text-center border-t border-gray-100 dark:border-[#262626]">
                <Trophy className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Leaderboard Empty</h3>
                <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">Waiting for students to start solving ranking problems.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141414]">
            {/* Header / Search Area */}
            <div className="p-6 border-b border-gray-100 dark:border-[#262626] flex flex-col xl:flex-row gap-6 justify-between">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Leaderboard</h2>
                    <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 ml-2 uppercase tracking-[0.2em]">{students.length} Total</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                    {/* Search */}
                    <div className="relative group flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search student name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600 text-black dark:text-white"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                         <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 focus:border-orange-500 focus:outline-none outline-none appearance-none cursor-pointer"
                        >
                            <option value="score_desc">Highest Score</option>
                            <option value="score_asc">Lowest Score</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                        </select>

                        <select
                            value={minScore}
                            onChange={(e) => setMinScore(Number(e.target.value))}
                            className="px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg text-sm font-bold text-gray-700 dark:text-gray-200 focus:border-orange-500 focus:outline-none outline-none appearance-none cursor-pointer"
                        >
                            <option value={0}>All Scores</option>
                            <option value={100}>&gt; 100 Points</option>
                            <option value={500}>&gt; 500 Points</option>
                            <option value={1000}>&gt; 1000 Points</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Systematic Table - No rounded corners on container, full width */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 border-b border-gray-100 dark:border-[#262626]">
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] w-20 text-center">Rank</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Student</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-right">Points</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-center w-32">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#262626]">
                        <AnimatePresence mode="popLayout">
                            {paginatedStudents.map((student, index) => {
                                const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                                return (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={student.id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-lg font-black ${actualIndex === 0 ? "text-orange-500" : "text-gray-300 dark:text-gray-600"} group-hover:text-orange-600 transition-colors`}>
                                                #{actualIndex + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333] group-hover:border-orange-200 dark:group-hover:border-orange-900 transition-all">
                                                    {student.image ? (
                                                        <Image
                                                            src={student.image}
                                                            alt={student.name || "Student"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 font-bold text-sm">
                                                            {student.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-200 group-hover:text-orange-600 transition-colors">
                                                        {student.name || "Anonymous User"}
                                                    </span>
                                                    <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest leading-none mt-1">
                                                        Enrolled Student
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xl font-black text-gray-950 dark:text-white tabular-nums group-hover:text-orange-600 transition-colors">
                                                {student.totalScore.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/profile/${student.id}`}
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 dark:text-gray-600 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                                    title="View Profile"
                                                >
                                                    <User className="w-4 h-4" />
                                                </Link>
                                                {isTeacher && (
                                                    <button
                                                        onClick={() => handleRemoveStudent(student.id, student.name || "")}
                                                        disabled={removingId === student.id}
                                                        className="inline-flex items-center justify-center p-2 text-gray-400 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition-colors disabled:opacity-50"
                                                        title="Remove Student"
                                                    >
                                                        {removingId === student.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
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

            {/* Pagination squared layout */}
            {totalPages > 1 && (
                <div className="p-6 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        Page <span className="text-gray-900 dark:text-white">{currentPage}</span> of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(1, prev - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-100 dark:border-[#333] text-xs font-black uppercase tracking-widest text-black dark:text-white hover:text-orange-600 dark:hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 disabled:opacity-30 transition-all"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 hover:border-orange-600 dark:hover:border-gray-200 disabled:opacity-30 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

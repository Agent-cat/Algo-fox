"use client";

import { useState, useMemo } from "react";
import { Trophy, Search, ChevronLeft, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
    id: string;
    name: string | null;
    totalScore: number;
    image: string | null;
}

interface ClassroomLeaderboardProps {
    students: Student[];
}

const ITEMS_PER_PAGE = 20;

export function ClassroomLeaderboard({ students }: ClassroomLeaderboardProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            (student.name || "Anonymous User").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [students, searchQuery]);

    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (students.length === 0) {
        return (
            <div className="bg-white p-16 text-center border-t border-gray-100">
                <Trophy className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 mb-1">Leaderboard Empty</h3>
                <p className="text-gray-400 font-medium text-sm">Waiting for students to start solving ranking problems.</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header / Search Area */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Leaderboard</h2>
                    <span className="text-[10px] font-black text-gray-300 ml-2 uppercase tracking-[0.2em]">{students.length} Total</span>
                </div>

                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search student name..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-bold placeholder:text-gray-300"
                    />
                </div>
            </div>

            {/* Systematic Table - No rounded corners on container, full width */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-20 text-center">Rank</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Student</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Points</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
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
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-lg font-black ${actualIndex === 0 ? "text-orange-500" : "text-gray-300"} group-hover:text-orange-600 transition-colors`}>
                                                #{actualIndex + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-orange-200 transition-all">
                                                    {student.image ? (
                                                        <Image
                                                            src={student.image}
                                                            alt={student.name || "Student"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-600 font-bold text-sm">
                                                            {student.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                        {student.name || "Anonymous User"}
                                                    </span>
                                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mt-1">
                                                        Enrolled Student
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xl font-black text-gray-950 tabular-nums group-hover:text-orange-600 transition-colors">
                                                {student.totalScore.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                href={`/profile/${student.id}`}
                                                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-orange-600 transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                            </Link>
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
                <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Page <span className="text-gray-900">{currentPage}</span> of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(1, prev - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-100 text-xs font-black uppercase tracking-widest hover:text-orange-600 hover:border-orange-500 disabled:opacity-30 transition-all"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-black bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 disabled:opacity-30 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

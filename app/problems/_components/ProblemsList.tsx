"use client";

import { useState } from "react";
import { getProblems } from "@/actions/problems";
import { Difficulty, Problem } from "@prisma/client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type ProblemWithStats = Problem & { acceptance: number, isSolved?: boolean };

interface ProblemsListProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
}

export default function ProblemsList({ initialProblems, initialTotalPages }: ProblemsListProps) {
    const [problems, setProblems] = useState<ProblemWithStats[]>(initialProblems);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(page < initialTotalPages);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const loadMore = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const res = await getProblems(nextPage);
            setProblems([...problems, ...res.problems]);
            setPage(nextPage);
            setHasMore(nextPage < res.totalPages);
        } catch (error) {
            console.error("Failed to load more problems", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyColor = (difficulty: Difficulty) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-500 bg-emerald-50/50";
            case "MEDIUM": return "text-amber-500 bg-amber-50/50";
            case "HARD": return "text-rose-500 bg-rose-50/50";
            default: return "text-gray-500";
        }
    };

    // Filter problems on client side for now since search API is not fully implemented with search term
    // Ideally we should do server side search
    const filteredProblems = problems.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
            {/* Header Tools */}
            <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search problems"
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-400 sm:text-sm transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-2.5 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </button>
                <button className="p-2.5 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </button>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-8 md:col-span-6">Title</div>
                <div className="col-span-2 md:col-span-3">Difficulty</div>
                <div className="col-span-2 md:col-span-3">Acceptance</div>
            </div>

            {/* List Items */}
            <div className="space-y-1 mt-2">
                <AnimatePresence initial={false}>
                    {filteredProblems.map((problem) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ scale: 1.005, backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                            className="group"
                        >
                            <Link href={`/problems/${problem.slug}`} className="grid grid-cols-12 gap-4 px-6 py-4 rounded-xl items-center transition-all duration-200">
                                <div className="col-span-8 md:col-span-6 font-medium text-gray-900 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                                    {problem.isSolved && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                    {problem.title}
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                        {problem.difficulty === 'MEDIUM' ? 'Med.' : problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
                                    </span>
                                </div>
                                <div className="col-span-2 md:col-span-3 text-sm text-gray-500">
                                    {problem.acceptance.toFixed(1)}%
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && !searchTerm && (
                <div className="flex justify-center mt-12 mb-8">
                    <button
                        onClick={loadMore}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More"
                        )}
                    </button>
                </div>
            )}

            {!hasMore && filteredProblems.length > 0 && (
                <div className="text-center mt-12 text-sm text-gray-400">
                    You've reached the end of the list.
                </div>
            )}

            {filteredProblems.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-gray-400 mb-2">No problems found</div>
                    <p className="text-sm text-gray-500">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    );
}

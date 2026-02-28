"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { searchProblems, getProblems } from "@/actions/problems";
import { Problem, ProblemType, Difficulty, ProblemDomain } from "@prisma/client";
import { ProblemRow } from "../shared/ProblemRow";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PROBLEMS_PAGE_SIZE, INTERSECTION_THRESHOLD } from "../shared/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

type ProblemWithStats = {
    id: string;
    title: string;
    slug: string;
    difficulty: Difficulty;
    type: ProblemType;
    acceptance: number;
    solved?: number | null;
    isSolved?: boolean;
    score: number;
    createdAt: Date;
    _count: { submissions: number };
};

interface PracticeClientProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
    type?: ProblemType;
    domain?: ProblemDomain;
    searchTerm: string;
}

export default function PracticeClient({
    initialProblems,
    initialTotalPages,
    type = "PRACTICE",
    domain = "DSA",
    searchTerm
}: PracticeClientProps) {
    const [problems, setProblems] = useState<ProblemWithStats[]>(initialProblems);

    useEffect(() => {
        setProblems(initialProblems);
        setPage(1);
        setHasMore(page < initialTotalPages);
    }, [initialProblems, initialTotalPages]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(page < initialTotalPages);
    const [isLoading, setIsLoading] = useState(false);

    const [searchResults, setSearchResults] = useState<ProblemWithStats[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const performSearch = async () => {
            if (!searchTerm || searchTerm.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const result = await searchProblems(searchTerm, type, domain);
                setSearchResults(result.problems);
            } catch (error) {
                console.error("Search failed:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        performSearch();
    }, [searchTerm, type, domain]);

    const displayedProblems = useMemo(() => {
        return searchTerm ? searchResults : problems;
    }, [searchTerm, searchResults, problems]);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore || searchTerm || problems.length === 0) return;

        setIsLoading(true);
        try {
            const lastProblem = problems[problems.length - 1];
            const nextPage = page + 1;
            const res = await getProblems(nextPage, PROBLEMS_PAGE_SIZE, type, domain, undefined, undefined, lastProblem.id);

            if (res.problems.length > 0) {
                setProblems((prev) => [...prev, ...res.problems]);
                setPage(nextPage);
                setHasMore(nextPage < res.totalPages);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to load more problems", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, page, type, domain, searchTerm, problems]);

    useEffect(() => {
        if (searchTerm) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: INTERSECTION_THRESHOLD }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isLoading, searchTerm, loadMore]);

    return (
        <div className="w-full">
            {/* List Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 dark:border-[#1e1e1e] text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest"
            >
                <div className="col-span-8 md:col-span-6">Title</div>
                <div className="col-span-2 md:col-span-3">Difficulty</div>
                <div className="col-span-2 md:col-span-3">Acceptance</div>
            </motion.div>

            {/* List Items */}
            <div className="mt-1">
                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div
                            key="searching"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <LoadingSpinner size="lg" message="Searching..." className="py-20" />
                        </motion.div>
                    ) : displayedProblems.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="divide-y divide-gray-50 dark:divide-[#111111]"
                        >
                            {displayedProblems.map((problem, idx) => (
                                <ProblemRow
                                    key={problem.id}
                                    id={problem.id}
                                    slug={problem.slug}
                                    title={problem.title}
                                    difficulty={problem.difficulty}
                                    acceptance={problem.acceptance}
                                    isSolved={problem.isSolved}
                                    index={idx}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-24"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-[#262626] flex items-center justify-center">
                                <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 font-medium">No problems found</div>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5">
                                {searchTerm ? "Try adjusting your search terms." : "No problems available."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Infinite Scroll Trigger */}
            {hasMore && !searchTerm && (
                <div ref={observerTarget} className="flex justify-center mt-10 mb-8 min-h-[60px]">
                    {isLoading && <LoadingSpinner size="md" message="Loading more problems..." />}
                </div>
            )}

            {!hasMore && !searchTerm && displayedProblems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-10 mb-4 text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide"
                >
                    — End of list —
                </motion.div>
            )}
        </div>
    );
}

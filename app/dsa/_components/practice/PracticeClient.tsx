"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { searchProblems, getProblems } from "@/actions/problems";
import { Problem, ProblemType, Difficulty, ProblemDomain } from "@prisma/client";
import { ProblemRow } from "../shared/ProblemRow";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PROBLEMS_PAGE_SIZE, INTERSECTION_THRESHOLD } from "../shared/constants";

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
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(page < initialTotalPages);
    const [isLoading, setIsLoading] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState(""); // Internal for debouncing if needed, but here we just rely on parent or direct effect? 
    // Actually parent passes debounced term if SearchBar handles it, or raw term? 
    // SearchBar in parent handles input. DsaProblemsClient state updates. 
    // We should debounce in parent or here? SearchBar has internal debounce. DsaProblemsClient receives value *after* debounce? 
    // Let's check SearchBar.tsx. It calls onSearch with debounced value. 
    // So searchTerm prop here is already debounced.

    const [searchResults, setSearchResults] = useState<ProblemWithStats[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Effect to handle search changes from prop
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

    // Memoize displayed problems
    const displayedProblems = useMemo(() => {
        return searchTerm ? searchResults : problems;
    }, [searchTerm, searchResults, problems]);

    // Load more problems (pagination)
    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore || searchTerm) return;

        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const res = await getProblems(nextPage, PROBLEMS_PAGE_SIZE, type, domain);
            setProblems((prev) => [...prev, ...res.problems]);
            setPage(nextPage);
            setHasMore(nextPage < res.totalPages);
        } catch (error) {
            console.error("Failed to load more problems", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, page, type, domain, searchTerm]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (searchTerm) return; // Disable infinite scroll during search

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
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="col-span-8 md:col-span-6">Title</div>
                <div className="col-span-2 md:col-span-3">Difficulty</div>
                <div className="col-span-2 md:col-span-3">Acceptance</div>
            </div>

            {/* List Items */}
            <div className="mt-2">
                {isSearching ? (
                    <LoadingSpinner size="lg" message="Searching..." className="py-20" />
                ) : displayedProblems.length > 0 ? (
                    <>
                        {displayedProblems.map((problem) => (
                            <ProblemRow
                                key={problem.id}
                                id={problem.id}
                                slug={problem.slug}
                                title={problem.title}
                                difficulty={problem.difficulty}
                                acceptance={problem.acceptance}
                                isSolved={problem.isSolved}
                            />
                        ))}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-2">No problems found</div>
                        <p className="text-sm text-gray-500">
                            {searchTerm ? "Try adjusting your search terms." : "No problems available."}
                        </p>
                    </div>
                )}
            </div>

            {/* Infinite Scroll Trigger */}
            {hasMore && !searchTerm && (
                <div ref={observerTarget} className="flex justify-center mt-12 mb-8 min-h-[60px]">
                    {isLoading && <LoadingSpinner size="md" message="Loading more problems..." />}
                </div>
            )}

            {!hasMore && !searchTerm && displayedProblems.length > 0 && (
                <div className="text-center mt-12 text-sm text-gray-400">
                    You've reached the end of the list.
                </div>
            )}
        </div>
    );
}

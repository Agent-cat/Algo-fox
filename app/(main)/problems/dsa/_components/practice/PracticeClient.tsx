"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { searchProblems } from "@/actions/problems";
import { ProblemType, Difficulty, ProblemDomain } from "@prisma/client";
import { ProblemRow } from "../shared/ProblemRow";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { parseCompanies } from "@/components/problems/CompanyAvatars";
import Pagination from "./Pagination";

// Whitelisted page sizes — must match server-side whitelist
const PAGE_SIZE_OPTIONS = [10, 16, 25, 50] as const;

type ProblemWithStats = {
    id: string;
    title: string;
    slug: string;
    difficulty: Difficulty;
    type: ProblemType;
    acceptance: number;
    solved?: number | null;
    isSolved?: boolean;
    companies?: any;
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
    pageSize?: number;
}

export default function PracticeClient({
    initialProblems,
    initialTotalPages,
    type = "PRACTICE",
    domain = "DSA",
    searchTerm,
    pageSize = 16,
}: PracticeClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [limitOpen, setLimitOpen] = useState(false);

    const difficulty = searchParams.get("difficulty") as Difficulty | undefined;
    const tags = searchParams.getAll("tags");
    const selectedCompany = searchParams.get("company");
    const currentPage = Number(searchParams.get("page")) || 1;

    // Search state (client-side)
    const [searchResults, setSearchResults] = useState<ProblemWithStats[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const run = async () => {
            if (!searchTerm || searchTerm.length < 2) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const result = await searchProblems(searchTerm, type, domain);
                if (isMounted) setSearchResults(result.problems);
            } catch {
                if (isMounted) setSearchResults([]);
            } finally {
                if (isMounted) setIsSearching(false);
            }
        };
        run();
        return () => { isMounted = false; };
    }, [searchTerm, type, domain]);

    const displayedProblems = useMemo(() => {
        const base = searchTerm ? searchResults : initialProblems;
        if (!selectedCompany) return base;
        return base.filter((p) => {
            const list = parseCompanies(p.companies);
            return list.some((c) => c.name === selectedCompany);
        });
    }, [searchTerm, searchResults, initialProblems, selectedCompany]);

    // Navigate to a new page number
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) params.delete("page");
        else params.set("page", String(page));
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    // Change page size: reset page to 1
    const handleLimitChange = (newLimit: number) => {
        setLimitOpen(false);
        if (newLimit === pageSize) return;
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (newLimit === 16) params.delete("limit"); // 16 is default — cleaner URL
        else params.set("limit", String(newLimit));
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    return (
        <div className="w-full">
            {/* List Header */}
            <div className="bg-[#FDFDFD] dark:bg-[#222328] border border-gray-200 dark:border-white/10 rounded-xl mb-3">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-3.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest"
                >
                    <div className="col-span-6 md:col-span-5">Title</div>
                    <div className="col-span-2 md:col-span-2 md:text-center">Difficulty</div>
                    <div className="col-span-2 md:col-span-2 md:text-right">Acceptance</div>
                    <div className="col-span-2 md:col-span-3 md:text-center">Company</div>
                </motion.div>
            </div>

            {/* List Items */}
            <div className="mt-1 relative">
                {isPending && (
                    <div className="absolute inset-0 z-10 bg-white/40 dark:bg-[#1D1E23]/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                        <LoadingSpinner size="md" message="Loading..." />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingSpinner size="lg" message="Searching..." className="py-20" />
                        </motion.div>
                    ) : displayedProblems.length > 0 ? (
                        <motion.div
                            key={`page-${currentPage}-limit-${pageSize}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="divide-y divide-gray-50 dark:divide-[#1D1E23]"
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
                                    companies={problem.companies}
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
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] flex items-center justify-center">
                                <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 font-medium">No problems found</div>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5">
                                {searchTerm ? "Try adjusting your search terms." : "No problems match your filters."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pagination row — centered numbers, per-page selector pinned right */}
            {!searchTerm && initialTotalPages > 1 && (
                <div className="relative flex items-center justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={initialTotalPages}
                        onPageChange={handlePageChange}
                        isPending={isPending}
                    />

                    {/* Per-page selector — absolute right so it doesn't shift the center */}
                    <div className="absolute right-1 flex-shrink-0">
                        <button
                            onClick={() => setLimitOpen((o) => !o)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                            aria-label="Rows per page"
                        >
                            <span>{pageSize} / page</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${limitOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {limitOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-full right-0 mb-2 w-32 bg-white dark:bg-[#24262C] border border-gray-100 dark:border-[#2a2a2a] rounded-xl shadow-xl shadow-black/10 py-1 z-50"
                                >
                                    {PAGE_SIZE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleLimitChange(opt)}
                                            className={`w-full flex items-center justify-between px-4 py-2 text-[12px] font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${opt === pageSize
                                                    ? "text-orange-500"
                                                    : "text-gray-600 dark:text-gray-400"
                                                }`}
                                        >
                                            {opt} per page
                                            {opt === pageSize && <Check className="w-3 h-3 flex-shrink-0" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}

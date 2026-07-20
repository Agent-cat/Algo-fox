"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ModeToggle from "@/components/problems/ModeToggle";
import PracticeClient from "./practice/PracticeClient";
import LearnMode from "./learn/LearnMode";
import { SearchBar } from "./shared/SearchBar";
import { FilterBar } from "@/components/problems/FilterBar";
import { Category, Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import { getCategories } from "@/actions/category.action";
import { motion } from "framer-motion";
import { parseCompanies } from "@/components/problems/CompanyAvatars";
import { PageTooltip } from "@/components/shared/PageTooltip";

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

interface DsaProblemsClientProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
    initialCategories?: any[];
    userRole: string;
    totalProblems?: number;
    solvedProblems?: number;
    pageSize?: number;
}

export default function DsaProblemsClient({
    initialProblems,
    initialTotalPages,
    initialCategories = [],
    userRole,
    totalProblems,
    solvedProblems,
    pageSize = 16,
}: DsaProblemsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const mode = (searchParams.get("mode") as "practice" | "learn") || "practice";
    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState<any[]>(initialCategories);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [hasFetchedCategories, setHasFetchedCategories] = useState(initialCategories.length > 0);

    useEffect(() => {
        if (initialCategories.length > 0) {
            setCategories(initialCategories);
            setHasFetchedCategories(true);
        }
    }, [initialCategories]);

    useEffect(() => {
        if (mode === "learn" && !hasFetchedCategories && !isCategoriesLoading) {
            const fetchCategories = async () => {
                setIsCategoriesLoading(true);
                try {
                    const res = await getCategories("DSA");
                    setCategories(res.categories);
                    setHasFetchedCategories(true);
                } catch (error) {
                     console.error("Failed to fetch categories:", error);
                } finally {
                    setIsCategoriesLoading(false);
                }
            };
            fetchCategories();
        }
    }, [mode, hasFetchedCategories, isCategoriesLoading]);

    const setMode = (newMode: "practice" | "learn") => {
        const params = new URLSearchParams(searchParams.toString());
        if (newMode === "practice") {
            params.delete("mode");
        } else {
            params.set("mode", newMode);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Collect unique companies from all loaded problems for the filter dropdown
    const allCompanies = useMemo(() => {
        const seen = new Map<string, { name: string; logo?: string }>();
        for (const problem of initialProblems) {
            const list = parseCompanies(problem.companies);
            for (const c of list) {
                if (!seen.has(c.name)) {
                    seen.set(c.name, { name: c.name, logo: c.logo?.trim() || undefined });
                }
            }
        }
        return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [initialProblems]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-8"
        >
            <div className="w-full px-6 lg:px-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                DSA Problems
                            </h1>
                            <PageTooltip description="Solve Data Structures & Algorithms problems to sharpen your coding skills and ace technical interviews." />
                        </div>
                    </div>
                </motion.div>

                {/* HEADER TOOLS */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
                >
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder={mode === "practice" ? "Search problems..." : "Search categories..."}
                        className="w-full md:flex-1"
                    />
                    <ModeToggle
                        mode={mode}
                        onModeChange={setMode}
                        practiceLabel="Practice"
                        learnLabel="Learn"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden"
                >
                    {mode === "practice" ? (
                        <>
                            <div className="px-5 pt-4 pb-2 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                <div className="flex-1 w-full">
                                    <FilterBar domain="DSA" companies={allCompanies} />
                                </div>
                                {(totalProblems !== undefined && solvedProblems !== undefined) && (
                                    <div 
                                        className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 self-start xl:self-auto pl-1 pr-2"
                                        role="img"
                                        aria-label={`Problems solved: ${solvedProblems} out of ${totalProblems}`}
                                    >
                                        <svg width={16} height={16} viewBox="0 0 16 16" className="transform -rotate-90">
                                            <circle cx={8} cy={8} r={6.5} stroke="currentColor" strokeWidth={2} fill="none" className="text-gray-200 dark:text-[#333333]" />
                                            <circle cx={8} cy={8} r={6.5} stroke="currentColor" strokeWidth={2} fill="none" strokeDasharray={40.84} strokeDashoffset={totalProblems > 0 ? 40.84 - ((solvedProblems / totalProblems) * 40.84) : 40.84} strokeLinecap="round" className="text-orange-500 transition-all duration-1000 ease-out" />
                                        </svg>
                                        <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 tracking-wide">{solvedProblems}/{totalProblems} Solved</span>
                                    </div>
                                )}
                            </div>
                            <PracticeClient
                                initialProblems={initialProblems}
                                initialTotalPages={initialTotalPages}
                                searchTerm={searchTerm}
                                domain="DSA"
                                pageSize={pageSize}
                            />
                        </>
                    ) : (
                        <div className="p-5">
                            <LearnMode
                                searchTerm={searchTerm}
                                categories={categories}
                                isLoading={isCategoriesLoading}
                                userRole={userRole}
                                domain="DSA"
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div >
    );
}

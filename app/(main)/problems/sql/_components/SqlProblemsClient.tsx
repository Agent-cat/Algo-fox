"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ModeToggle from "@/components/problems/ModeToggle";
import PracticeClient from "../../dsa/_components/practice/PracticeClient";
import LearnMode from "../../dsa/_components/learn/LearnMode";
import { SearchBar } from "../../dsa/_components/shared/SearchBar";
import { FilterBar } from "@/components/problems/FilterBar";
import { Category, Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import { getCategories } from "@/actions/category.action";
import { motion } from "framer-motion";

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

interface SqlProblemsClientProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
    initialCategories?: any[];
}

export default function SqlProblemsClient({
    initialProblems,
    initialTotalPages,
    initialCategories = [],
}: SqlProblemsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const mode = (searchParams.get("mode") as "practice" | "learn") || "practice";
    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState<Category[]>(initialCategories);
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
                    const res = await getCategories("SQL");
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8"
        >
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-1">
                        SQL Problems
                    </h1>

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
                    <ModeToggle mode={mode} onModeChange={setMode} />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden"
                >
                    {mode === "practice" ? (
                        <>
                            <div className="px-5 pt-4 pb-2">
                                <FilterBar />
                            </div>
                            <PracticeClient
                                initialProblems={initialProblems}
                                initialTotalPages={initialTotalPages}
                                searchTerm={searchTerm}
                                domain="SQL"
                            />
                        </>
                    ) : (
                        <div className="p-5">
                            <LearnMode
                                searchTerm={searchTerm}
                                categories={categories}
                                isLoading={isCategoriesLoading}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

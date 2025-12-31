"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ModeToggle from "@/components/problems/ModeToggle";
import PracticeClient from "./practice/PracticeClient";
import LearnMode from "./learn/LearnMode";
import { SearchBar } from "./shared/SearchBar";
import { Category, Difficulty, ProblemType } from "@prisma/client";
import { getCategories } from "@/actions/category.action";

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

interface DsaProblemsClientProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
}

export default function DsaProblemsClient({
    initialProblems,
    initialTotalPages,
}: DsaProblemsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // DERIVED STATE FROM URL, DEFAULT TO 'PRACTICE'
    const mode = (searchParams.get("mode") as "practice" | "learn") || "practice";
    const [searchTerm, setSearchTerm] = useState("");

    // LIFTED STATE FOR LEARN MODE CACHING
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [hasFetchedCategories, setHasFetchedCategories] = useState(false);

    useEffect(() => {
        if (mode === "learn" && !hasFetchedCategories && !isCategoriesLoading) {
            const fetchCategories = async () => {
                setIsCategoriesLoading(true);
                try {
                    const res = await getCategories();
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
        <div className="min-h-screen bg-white py-8">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                {/* HEADER TOOLS */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder={mode === "practice" ? "Search problems" : "Search categories"}
                        className="w-full md:flex-1"
                    />
                    <ModeToggle mode={mode} onModeChange={setMode} />
                </div>

                {mode === "practice" ? (
                    <PracticeClient
                        initialProblems={initialProblems}
                        initialTotalPages={initialTotalPages}
                        searchTerm={searchTerm}
                    />
                ) : (
                    <LearnMode
                        searchTerm={searchTerm}
                        categories={categories}
                        isLoading={isCategoriesLoading}
                    />
                )}
            </div>
        </div>
    );
}


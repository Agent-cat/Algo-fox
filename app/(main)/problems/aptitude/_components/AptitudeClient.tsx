"use client";

import { useState, useEffect } from "react";
import LearnMode from "../../dsa/_components/learn/LearnMode";
import { SearchBar } from "../../dsa/_components/shared/SearchBar";
import { Difficulty, ProblemType } from "@prisma/client";
import { getCategories } from "@/actions/category.action";
import { motion } from "framer-motion";

interface AptitudeClientProps {
    initialCategories?: any[];
    userRole: string;
}

export default function AptitudeClient({
    initialCategories = [],
    userRole,
}: AptitudeClientProps) {
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
        if (!hasFetchedCategories && !isCategoriesLoading) {
            const fetchCategories = async () => {
                setIsCategoriesLoading(true);
                try {
                    const res = await getCategories("APTITUDE");
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
    }, [hasFetchedCategories, isCategoriesLoading]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen bg-[#fafafa] dark:bg-[#121212] py-8"
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
                        Aptitude Problems
                    </h1>
                </motion.div>

                {/* HEADER TOOLS */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-6"
                >
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search categories..."
                        className="w-full md:max-w-md"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fafafa] dark:bg-[#121212] rounded-2xl overflow-hidden"
                >
                    <div className="p-5">
                        <LearnMode
                            searchTerm={searchTerm}
                            categories={categories}
                            isLoading={isCategoriesLoading}
                            userRole={userRole}
                            domain="APTITUDE"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div >
    );
}



"use client";

import { useEffect, useState } from "react";
import LearnMode from "./LearnMode";
import { getCategories } from "@/actions/category.action";
import { toast } from "sonner";

/**
 * Wrapper component for Learn mode
 * Renders the category-based learning interface
 */
export default function LearnList() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                toast.error("Failed to load categories");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return <LearnMode categories={categories} isLoading={isLoading} />;
}

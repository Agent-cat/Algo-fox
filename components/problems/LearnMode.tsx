"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/actions/category.action";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  order: number;
  _count: {
    categoryProblems: number;
  };
}

export default function LearnMode() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await getCategories();
        setCategories(res.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No categories available yet.</p>
        <p className="text-gray-400 text-sm mt-2">
          Categories will appear here once they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="space-y-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            problemCount={category._count.categoryProblems}
          />
        ))}
      </div>
    </div>
  );
}


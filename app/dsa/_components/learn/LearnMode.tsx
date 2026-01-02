"use client";

import CategoryCard from "./CategoryCard";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  order: number;
  _count: {
    categoryProblems: number;
  };
  solvedCount: number;
}

interface LearnModeProps {
  searchTerm?: string;
  categories: any[];
  isLoading: boolean;
}

export default function LearnMode({ searchTerm = "", categories, isLoading }: LearnModeProps) {
  // Internal state removed, using props

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading && categories.length === 0) {
    return <LoadingSpinner size="lg" message="Loading categories..." className="min-h-[400px]" />;
  }

  if (categories.length === 0 && !isLoading) {
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
    <div className="w-full">
      <div className="space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              problemCount={category._count.categoryProblems}
              solvedCount={category.solvedCount || 0}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2">No categories found</div>
            <p className="text-sm text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}


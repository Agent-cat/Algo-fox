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

interface TreeCategory extends Category {
  children?: TreeCategory[];
  displayOrder?: string;
}

export default function LearnMode({ searchTerm = "", categories, isLoading }: LearnModeProps) {
  // Internal state removed, using props

  // Build tree structure
  const buildTree = (cats: any[]): TreeCategory[] => {
    const map = new Map<string, TreeCategory>();
    cats.forEach(cat => map.set(cat.id, { ...cat, children: [] }));

    const roots: TreeCategory[] = [];

    // First, sort all categories by order
    const sortedCats = [...cats].sort((a, b) => a.order - b.order);

    sortedCats.forEach(cat => {
      const node = map.get(cat.id)!;
      if (cat.parentId && map.has(cat.parentId)) {
        map.get(cat.parentId)!.children?.push(node);
      } else {
        roots.push(node);
      }
    });

    // Assign display numbers (1, 1.1, etc.)
    const assignNumbers = (nodes: TreeCategory[], prefix: string = "") => {
      nodes.forEach((node, index) => {
        const currentNumber = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
        node.displayOrder = currentNumber;
        if (node.children && node.children.length > 0) {
          assignNumbers(node.children, currentNumber);
        }
      });
    };

    assignNumbers(roots);
    return roots;
  };

  const categoryTree = buildTree(categories);

  // Helper to filter tree
  const filterTree = (nodes: TreeCategory[]): TreeCategory[] => {
    return nodes.reduce((acc: TreeCategory[], node) => {
      const matches =
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.description && node.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const filteredChildren = node.children ? filterTree(node.children) : [];

      if (matches || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren
        });
      }
      return acc;
    }, []);
  };

  const filteredTree = searchTerm ? filterTree(categoryTree) : categoryTree;

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
        {filteredTree.length > 0 ? (
          filteredTree.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              problemCount={category._count.categoryProblems}
              solvedCount={category.solvedCount || 0}
              displayOrder={category.displayOrder}
              subCategories={category.children}
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


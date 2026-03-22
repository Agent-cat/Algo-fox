"use client";

import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "@/actions/category.action";
import { Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminListPage from "@/components/admin/AdminListPage";

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  order: number;
  parentId: string | null;
  level?: number;
  _count: {
    categoryProblems: number;
  };
}

export default function AptitudeAdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getCategories("APTITUDE");
      const cats = res.categories as Category[];

      const map = new Map<string, any>();
      cats.forEach(cat => map.set(cat.id, { ...cat, children: [] }));

      const roots: any[] = [];
      cats.forEach(cat => {
        const node = map.get(cat.id);
        if (cat.parentId && map.has(cat.parentId)) {
          map.get(cat.parentId).children.push(node);
        } else {
          roots.push(node);
        }
      });

      const flatten = (nodes: any[], level = 0): Category[] => {
        let result: Category[] = [];
        nodes.sort((a, b) => a.order - b.order).forEach(node => {
          result.push({ ...node, level });
          if (node.children) {
            result = [...result, ...flatten(node.children, level + 1)];
          }
        });
        return result;
      };

      setCategories(flatten(roots));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will remove all problems from this category.`)) {
      return;
    }

    const res = await deleteCategory(id);
    if (res.success) {
      toast.success("Category deleted");
      fetchCategories();
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen pt-4">
      <AdminListPage
        title="Aptitude Categories"
        subtitle="Manage categories for the Aptitude section."
        createLink="/admin/aptitude/categories/create"
        createLabel="New Category"
        data={categories}
        isLoading={isLoading}
        searchPlaceholder="Search by name or slug..."
        searchFields={["name", "slug"]}
        columns={[
          { label: "Name" },
          { label: "Description" },
          { label: "Questions" },
          { label: "Actions", className: "text-right" }
        ]}
        renderItem={(category) => (
          <tr key={category.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a] transition-colors group">
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                {category.level && category.level > 0 ? (
                  <div className="flex items-center text-gray-300 dark:text-gray-700 select-none">
                    {"\u00A0".repeat(category.level * 4)}
                    <span className="mr-2">↳</span>
                  </div>
                ) : null}
                <div>
                  <div className={`font-semibold text-gray-900 dark:text-gray-100 ${category.level && category.level > 0 ? "text-sm" : ""}`}>{category.name}</div>
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">{category.slug}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md truncate">
                {category.description || <span className="text-gray-400 dark:text-gray-600 italic">No description</span>}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#1a1a1a] px-3 py-1 rounded-full border border-gray-200 dark:border-[#262626]">
                {category._count.categoryProblems} questions
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/admin/aptitude/categories/${category.id}`}
                  className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-colors"
                  title="View Questions"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/aptitude/categories/${category.id}/edit`}
                  className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}

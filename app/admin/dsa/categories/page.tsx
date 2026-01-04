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
  _count: {
    categoryProblems: number;
  };
}

export default function DsaAdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getCategories("DSA");
      setCategories(res.categories);
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
        title="DSA Learn Categories"
        subtitle="Manage categories for the DSA Learn mode with ease."
        createLink="/admin/dsa/categories/create"
        createLabel="New Category"
        data={categories}
        isLoading={isLoading}
        searchPlaceholder="Search by name or slug..."
        searchFields={["name", "slug"]}
        columns={[
          { label: "Name" },
          { label: "Description" },
          { label: "Problems" },
          { label: "Actions", className: "text-right" }
        ]}
        renderItem={(category) => (
          <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
              <div className="font-semibold text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-400 font-mono mt-0.5">{category.slug}</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-600 max-w-md truncate">
                {category.description || <span className="text-gray-400 italic">No description</span>}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {category._count.categoryProblems} problems
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/admin/dsa/categories/${category.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Problems"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/dsa/categories/${category.id}/edit`}
                  className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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



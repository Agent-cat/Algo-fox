"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category.action";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getCategories } from "@/actions/category.action";
import { useEffect } from "react";

export default function CreateAptitudeCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [isParentsLoading, setIsParentsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    order: 0,
    parentId: "",
  });

  useEffect(() => {
    const fetchParents = async () => {
      setIsParentsLoading(true);
      try {
        const res = await getCategories("APTITUDE");
        setParentCategories(res.categories || []);
      } catch (error) {
         console.error("Failed to fetch parent categories:", error);
      } finally {
        setIsParentsLoading(false);
      }
    };
    fetchParents();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: formData.slug || generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createCategory({
        name: formData.name,
        description: formData.description || undefined,
        slug: formData.slug,
        order: formData.order,
        domain: "APTITUDE",
        parentId: formData.parentId || null,
      });

      if (res.success) {
        toast.success("Aptitude category created successfully");
        router.push("/admin/aptitude/categories");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create category");
      }
    } catch (error) {
       console.error("Failed to create category:", error);
      toast.error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto ml-0">
        <Link
          href="/admin/aptitude/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Aptitude Categories
        </Link>

        {/* Card Container */}
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-[#262626]">
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Create Aptitude Category</h1>
             <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Add a new category for the Aptitude section.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Category Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="e.g., Numerical Ability"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Slug <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                 className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-mono text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="numerical-ability"
              />
              <p className="text-xs text-gray-500 dark:text-gray-500">URL-friendly identifier (auto-generated)</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                 className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                placeholder="Brief description of this category..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="parentId" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Parent Category (Optional)
              </label>
              <select
                id="parentId"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                disabled={isParentsLoading}
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all disabled:opacity-50"
              >
                <option value="">None (Top-level)</option>
                {parentCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="order" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="0"
              />
              <p className="text-[10px] text-gray-500">Lower numbers appear first within the same level</p>
            </div>

            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-[#262626]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-200 dark:shadow-none hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Category"}
              </button>
              <Link
                href="/admin/aptitude/categories"
                className="px-6 py-3 bg-transparent hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 font-bold text-sm rounded-xl transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

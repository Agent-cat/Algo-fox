"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category.action";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateDsaCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    order: 0,
  });

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
        domain: "DSA",
      });

      if (res.success) {
        toast.success("Category created successfully");
        router.push("/admin/dsa/categories");
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
          href="/admin/dsa/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSA Categories
        </Link>

        {/* Card Container */}
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-[#262626]">
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Create DSA Category</h1>
             <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Add a new category for the DSA Learn mode.</p>
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
                className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="e.g., Arrays & Strings"
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
                 className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-mono text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="arrays-strings"
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
                 className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                placeholder="Brief description of this category..."
              />
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
                 className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="0"
              />
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
                href="/admin/dsa/categories"
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


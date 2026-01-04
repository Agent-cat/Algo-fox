"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateCategory } from "@/actions/category.action";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, and hyphen-separated"),
  description: z.string().optional(),
  order: z.number().int(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<any>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      order: 0,
    }
  });

  useEffect(() => {
    fetchCategory();
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const { getCategoryById } = await import("@/actions/category.action");
      const res = await getCategoryById(categoryId);
      if (res.success && res.category) {
        setCategory(res.category);
        reset({
          name: res.category.name,
          slug: res.category.slug,
          description: res.category.description || "",
          order: res.category.order,
        });
      } else {
        toast.error(res.error || "Failed to load category");
      }
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to load category");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await updateCategory(categoryId, {
        name: data.name,
        description: data.description || undefined,
        slug: data.slug,
        order: data.order,
      });

      if (res.success) {
        toast.success("Category updated successfully");
        router.push("/admin/categories");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update category");
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white text-center">
        <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
      <div className="max-w-2xl mx-auto ml-0">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Category</h1>
          <p className="text-gray-500 mb-8">Update category details.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
                placeholder="e.g., Arrays & Strings"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
                Slug *
              </label>
              <input
                {...register("slug")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-mono text-sm placeholder:text-gray-400"
                placeholder="arrays-strings"
              />
              <p className="mt-1 text-xs text-gray-500">URL-friendly identifier</p>
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none placeholder:text-gray-400"
                placeholder="Brief description of this category..."
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-semibold text-gray-700 mb-2">
                Display Order
              </label>
              <input
                {...register("order", { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
              {errors.order && <p className="text-xs text-red-500 mt-1">{errors.order.message}</p>}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Updating..." : "Update Category"}
              </button>
              <Link
                href="/admin/categories"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all"
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

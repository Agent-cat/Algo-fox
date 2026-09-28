import BlogForm from "@/components/admin/BlogForm";
import { createBlogPostAction } from "@/actions/blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  async function onSubmitAction(data: any) {
    "use server";
    return createBlogPostAction(data);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-5">
        <Link
          href="/admin/blogs"
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Create Blog Post
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Write and publish an educational article on Algo-fox
          </p>
        </div>
      </div>

      {/* Form */}
      <BlogForm onSubmitAction={onSubmitAction} />
    </div>
  );
}

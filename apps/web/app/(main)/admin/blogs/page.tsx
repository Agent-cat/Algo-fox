import Link from "next/link";
import { getBlogPostsAction, deleteBlogPostAction, updateBlogPostAction } from "@/actions/blog";
import { FilePlus, Edit, Trash2, Globe, FileText, ArrowLeft } from "lucide-react";
import { revalidateTag } from "next/cache";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminBlogsPage({ searchParams }: PageProps) {
  const { page, search } = await searchParams;
  const pageNum = parseInt(page || "1", 10);

  const { posts, total, totalPages } = await getBlogPostsAction({
    page: pageNum,
    pageSize: 15,
    search: search || "",
    onlyPublished: false, // Admin gets all posts (Draft + Published)
  });

  // Server Action inline helpers for actions (wrapped in Server Component actions)
  async function togglePublish(id: string, currentStatus: boolean) {
    "use server";
    await updateBlogPostAction(id, { isPublished: !currentStatus });
  }

  async function deletePost(id: string) {
    "use server";
    await deleteBlogPostAction(id);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
              Manage Blogs
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create, edit, publish, and delete blog articles on Algo-fox
            </p>
          </div>
        </div>
        <Link
          href="/admin/blogs/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-orange-600/10 cursor-pointer"
        >
          <FilePlus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-[#202227] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Read Time</th>
                <th className="px-6 py-4">Upvotes</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm text-gray-700 dark:text-gray-300">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500 font-medium">
                    No articles found. Start by creating a new blog!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold max-w-[320px] truncate text-gray-900 dark:text-white">
                      <Link href={`/blogs/${post.slug}`} className="hover:text-orange-500 transition-colors">
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5 max-w-[300px] truncate">
                        {post.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs">
                      {post.author.name}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold tabular-nums text-gray-500 dark:text-gray-400">
                      {post.readTime} min
                    </td>
                    <td className="px-6 py-4 text-xs font-bold tabular-nums text-gray-500 dark:text-gray-400">
                      {post.upvotesCount}
                    </td>
                    <td className="px-6 py-4">
                      <form action={togglePublish.bind(null, post.id, post.isPublished)}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer border transition-all ${
                            post.isPublished
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                              : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/5"
                          }`}
                        >
                          <Globe className="w-3 h-3" />
                          <span>{post.isPublished ? "Published" : "Draft"}</span>
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/${post.id}/edit`}
                          className="p-2 text-gray-500 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={deletePost.bind(null, post.id)}>
                          <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              Showing <span className="font-bold">{posts.length}</span> of{" "}
              <span className="font-bold">{total}</span> articles
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/blogs?page=${pageNum - 1}${search ? `&search=${search}` : ""}`}
                className={`px-3 py-1.5 border border-gray-200 dark:border-white/5 rounded-lg font-bold transition-all ${
                  pageNum <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                Previous
              </Link>
              <span className="font-semibold text-gray-800 dark:text-white">
                Page {pageNum} of {totalPages}
              </span>
              <Link
                href={`/admin/blogs?page=${pageNum + 1}${search ? `&search=${search}` : ""}`}
                className={`px-3 py-1.5 border border-gray-200 dark:border-white/5 rounded-lg font-bold transition-all ${
                  pageNum >= totalPages ? "opacity-40 pointer-events-none" : "hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

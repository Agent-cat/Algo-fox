import Link from "next/link";
import { getBlogPostsAction } from "@/actions/blog";
import { BlogService } from "@/core/services/blog.service";
import { Search, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import { PageTooltip } from "@/components/shared/PageTooltip";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

type BlogPostItem = Awaited<ReturnType<typeof BlogService.getBlogPosts>>["posts"][number];


export default async function BlogsPage({ searchParams }: PageProps) {
  const { page, search } = await searchParams;
  const pageNum = parseInt(page || "1", 10);

  // Fetch blogs using cached Server Action
  const { posts, total, totalPages } = await getBlogPostsAction({
    page: pageNum,
    pageSize: 8,
    search: search || "",
    onlyPublished: true, // Only show published posts to public
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-12">
      <div className="w-full px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Blogs
            </h1>
            <PageTooltip description="Explore educational articles, tutorials, and career advice written by the Algo-fox team." />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full">
          <form method="GET" action="/blogs" className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Search articles..."
              className="w-full pl-11 pr-5 py-3 rounded-2xl bg-white dark:bg-[#202227] border border-gray-200/60 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-[13px] transition-all text-gray-700 dark:text-gray-300 shadow-sm focus:shadow-md focus:shadow-orange-500/[0.02] dark:focus:shadow-black/20"
            />
          </form>
        </div>

        {/* Main Feed Container */}
        <div className="w-full flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#202227] border border-gray-200/60 dark:border-white/5 rounded-3xl p-8 shadow-sm">
              <p className="text-gray-400 dark:text-gray-500 font-semibold text-base">
                No articles found matching your criteria.
              </p>
              <Link
                href="/blogs"
                className="inline-block mt-4 text-xs font-bold text-orange-500 hover:underline"
              >
                Clear search
              </Link>
            </div>
          ) : (
            posts.map((post: BlogPostItem) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="block p-6 bg-transparent hover:bg-white dark:hover:bg-[#202227]/45 border border-transparent hover:border-gray-200/50 dark:hover:border-white/5 rounded-2xl sm:rounded-3xl hover:-translate-y-0.5 transition-all duration-300 ease-out hover:shadow-sm group"
              >
                <article>
                  {/* Author Meta Row */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                    {post.author.image ? (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-5.5 h-5.5 rounded-full object-cover ring-2 ring-gray-100 dark:ring-white/10"
                      />
                    ) : (
                      <div className="w-5.5 h-5.5 rounded-full bg-gray-150 dark:bg-white/5 text-[9px] font-bold flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-200">
                      {post.author.name}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {post.readTime} min read
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <div className="flex items-center gap-1 text-xs text-gray-550 font-medium">
                      <ThumbsUp className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                      <span className="tabular-nums">{post.upvotesCount}</span>
                    </div>
                  </div>

                  {/* Content Row */}
                  <div className="flex gap-5 sm:gap-6 justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-1 font-medium">
                        {post.description}
                      </p>

                      {/* Keywords */}
                      {post.seoKeywords.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {post.seoKeywords.slice(0, 3).map((k: string) => (
                            <span key={k} className="text-gray-400 dark:text-gray-500 text-[11px] font-medium">
                              #{k}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {post.coverImage && (
                      <div className="shrink-0 relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5 w-24 h-16 sm:w-28 sm:h-20 md:w-36 md:h-24">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-8 border-t border-gray-150 dark:border-white/5 text-xs text-gray-500 dark:text-gray-400 mt-4">
              <span className="font-semibold">
                Page {pageNum} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs?page=${pageNum - 1}${search ? `&search=${search}` : ""}`}
                  className={`px-4 py-2 border border-gray-200 dark:border-white/5 rounded-xl font-bold transition-all ${
                    pageNum <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={`/blogs?page=${pageNum + 1}${search ? `&search=${search}` : ""}`}
                  className={`px-4 py-2 border border-gray-200 dark:border-white/5 rounded-xl font-bold transition-all ${
                    pageNum >= totalPages
                      ? "opacity-40 pointer-events-none"
                      : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

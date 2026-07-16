import Link from "next/link";
import { getBlogPostsAction } from "@/actions/blog";
import { BlogService } from "@/core/services/blog.service";
import { Search, ThumbsUp } from "lucide-react";
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-8">
      <div className="w-full px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="mb-8">
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
              className="w-full pl-11 pr-5 py-2.5 rounded-xl bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
            />
          </form>
        </div>

        {/* Main Feed Container */}
        <div className="w-full space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 rounded-2xl p-8">
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
              <article
                key={post.id}
                className="flex gap-6 pb-8 border-b border-gray-200 dark:border-white/5 items-start justify-between group"
              >
                <div className="flex-1 min-w-0">
                  {/* Author Meta Row */}
                  <div className="flex items-center gap-2 mb-2">
                    {post.author.image ? (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 text-[9px] font-bold flex items-center justify-center text-gray-600 dark:text-gray-400">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-gray-400">•</span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <Link href={`/blogs/${post.slug}`}>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug group-hover:text-orange-500 transition-colors cursor-pointer mb-1.5">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed font-medium">
                    {post.description}
                  </p>

                  {/* Bottom Metadata Row */}
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold">
                    <div className="flex items-center gap-4">
                      <span className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {post.readTime} min read
                      </span>
                      {post.seoKeywords.slice(0, 2).map((k: string) => (
                        <span key={k} className="text-gray-400 uppercase tracking-wider">
                          #{k}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.2 text-gray-500 dark:text-gray-400">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="tabular-nums">{post.upvotesCount}</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail on Right */}
                {post.coverImage && (
                  <Link href={`/blogs/${post.slug}`} className="shrink-0">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 dark:border-white/5 transition-transform duration-300 group-hover:scale-[1.02]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                )}
              </article>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 text-xs text-gray-500 dark:text-gray-400">
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

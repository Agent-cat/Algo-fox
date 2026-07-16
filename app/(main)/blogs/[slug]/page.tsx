import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getBlogPostBySlugAction, getPopularBlogPostsAction } from "@/actions/blog";
import { BlogService } from "@/core/services/blog.service";
import UpvoteButton from "@/components/blog/UpvoteButton";
import ShareButton from "@/components/blog/ShareButton";
import TableOfContents from "@/components/blog/TableOfContents";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type RecommendedPost = Awaited<ReturnType<typeof BlogService.getPopularPosts>>[number];


// GENERATING DYNAMIC SEO METADATA
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugAction(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Algo-fox`,
    description: post.description,
    keywords: post.seoKeywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      authors: [post.author.name],
      images: [post.coverImage || "/Hero-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage || "/Hero-image.png"],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlugAction(slug);

  if (!post || !post.isPublished) {
    return notFound();
  }

  // Fetch popular posts for recommendation
  const popular = await getPopularBlogPostsAction(3);
  const recommendations = popular.filter((p: RecommendedPost) => p.id !== post.id).slice(0, 2);

  // Structured Schema (JSON-LD) for Google Search Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://algofox.in/blogs/${post.slug}`,
    },
    "headline": post.title,
    "description": post.description,
    "image": post.coverImage || "https://algofox.in/Hero-image.png",
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Algo-fox",
      "logo": {
        "@type": "ImageObject",
        "url": "https://algofox.in/icons/icon-512x512.png",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1D1E23] py-12">
      {/* Google Rich Snippet SEO Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full px-6 lg:px-12">

        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="space-y-6">

          {post.focusKeyword && (
            <span className="inline-block bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              {post.focusKeyword}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            {post.description}
          </p>

          {/* Author info & Read time row (Medium-style) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-gray-100 dark:border-white/5 py-4 gap-4">
            <div className="flex items-center gap-3">
              {post.author.image ? (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-white/5"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 text-sm font-bold flex items-center justify-center text-gray-600 dark:text-gray-400">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {post.author.name}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : ""}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Upvote & Share Buttons (Client side) */}
            <div className="flex items-center gap-3">
              <UpvoteButton
                postId={post.id}
                initialUpvotes={post.upvotesCount}
                initialHasUpvoted={post.hasUpvoted}
              />
              <ShareButton title={post.title} />
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 dark:border-white/5 my-8 shadow-sm">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article body + sticky TOC sidebar */}
        <div className="flex items-start gap-10 mt-10">

          {/* Main article content — 85% centered within flex-1 */}
          <div className="flex-1 min-w-0">
            <div className="w-[90%] mx-auto">
              <main
                id="blog-article-body"
                className="prose dark:prose-invert max-w-none prose-orange text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontSize: "18px",
                  lineHeight: "29px",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1({ children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h1 id={id} {...props}>{children}</h1>;
                    },
                    h2({ children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                    h3({ children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h3 id={id} {...props}>{children}</h3>;
                    },
                    img({ node: _node, ...imgProps }: React.ComponentPropsWithoutRef<"img"> & { node?: unknown }) {
                      return (
                        <img
                          {...imgProps}
                          className="rounded-2xl max-w-full h-auto my-8 border border-gray-200 dark:border-white/5 shadow-md mx-auto object-cover"
                          loading="lazy"
                        />
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </main>
            </div>
          </div>

          {/* Sticky TOC sidebar — hidden on <xl screens */}
          <TableOfContents content={post.content} />
        </div>

        {/* Footer Tags */}
        {post.seoKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-gray-100 dark:border-white/5">
            {post.seoKeywords.map((tag: string) => (
              <Link
                key={tag}
                href={`/blogs?tag=${tag}`}
                className="px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-gray-50 dark:bg-white/5 text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-wider border border-gray-100 dark:border-white/5"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author Box */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 dark:bg-[#202227] border border-gray-100 dark:border-white/5 flex gap-4 items-start">
          {post.author.image ? (
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 text-base font-bold flex items-center justify-center text-gray-600 dark:text-gray-400">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
              Written By
            </h4>
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {post.author.bio}
              </p>
            )}
          </div>
        </div>

        {/* Recommendation Widget */}
        {recommendations.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100 dark:border-white/5 space-y-6">
            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              More from Algo-fox
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendations.map((r: RecommendedPost) => (
                <div
                  key={r.id}
                  className="flex flex-col p-5 rounded-2xl bg-gray-50/50 dark:bg-[#202227]/50 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-2">
                      <Link href={`/blogs/${r.slug}`} className="hover:text-orange-500 transition-colors">
                        {r.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {r.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>{r.readTime} min read</span>
                    <Link
                      href={`/blogs/${r.slug}`}
                      className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

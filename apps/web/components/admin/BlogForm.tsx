"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";
import { FileText, Eye, Check, Loader2 } from "lucide-react";

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    content: string;
    coverImage?: string | null;
    isPublished?: boolean;
    seoKeywords?: string[];
    focusKeyword?: string | null;
  };
  onSubmitAction: (data: any) => Promise<{ success: boolean; error?: string }>;
}

export default function BlogForm({ initialData, onSubmitAction }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");
  const [seoKeywordsText, setSeoKeywordsText] = useState(
    initialData?.seoKeywords?.join(", ") || ""
  );

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      if (!uploadRes.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setCoverImage(data.url);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload image", { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !description.trim()) {
      toast.error("Please fill in the required fields (Title, Description, Content)");
      return;
    }

    setLoading(true);
    const keywords = seoKeywordsText
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      const res = await onSubmitAction({
        title,
        description,
        content,
        coverImage: coverImage || null,
        isPublished,
        seoKeywords: keywords,
        focusKeyword: focusKeyword || null,
      });

      if (res.success) {
        toast.success(initialData?.id ? "Article updated!" : "Article created!");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save article");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Inputs (Takes 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Mastering Quick Sort in Java"
              className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-base font-bold transition-all text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Excerpt / Short Description * (SEO Meta Description)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief, engaging summary of the article..."
              rows={3}
              className="w-full px-5 py-3 rounded-xl bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm transition-all text-gray-700 dark:text-gray-300 resize-none"
              required
            />
          </div>

          {/* Editor Container */}
          <div className="border border-gray-200 dark:border-white/5 rounded-2xl bg-white dark:bg-[#202227] overflow-hidden">
            {/* Editor Header / Tab Switcher */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 px-4 py-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "write"
                      ? "bg-white dark:bg-[#202227] text-orange-500 shadow-sm border border-gray-200/50 dark:border-white/5"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Write (Markdown)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "preview"
                      ? "bg-white dark:bg-[#202227] text-orange-500 shadow-sm border border-gray-200/50 dark:border-white/5"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="min-h-[500px]">
              {activeTab === "write" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Write your blog post here using Markdown..."
                  className="w-full h-[500px] p-6 outline-none bg-transparent font-mono text-sm text-gray-900 dark:text-white resize-y"
                  required
                />
              ) : (
                <div className="p-8 prose dark:prose-invert max-w-none h-[500px] overflow-y-auto custom-scrollbar">
                  {content.trim() ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        img({ node, ...props }: any) {
                          return (
                            <img
                              {...props}
                              className="rounded-2xl max-w-full h-auto my-6 border border-gray-200 dark:border-white/5 shadow-md mx-auto object-cover"
                              loading="lazy"
                            />
                          );
                        }
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-gray-400 italic">Nothing to preview yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Options & SEO Metadata (Takes 1 col) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-3">
              Publishing Options
            </h3>

            {/* Cover Image */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                  Cover Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
                  />
                  <label className="flex items-center justify-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-755 dark:text-gray-300 text-xs font-bold rounded-xl transition-all cursor-pointer border border-gray-200 dark:border-white/5 shrink-0 select-none">
                    {uploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Upload"
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {coverImage && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 group">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm text-xs font-bold"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.9)" }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Status (Publish immediately) */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/2 rounded-2xl border border-gray-200 dark:border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-900 dark:text-white">Publish Article</span>
                <span className="text-[10px] text-gray-400">Make it visible immediately</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 dark:bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pt-2 pb-3">
              SEO Optimization
            </h3>

            {/* Focus Keyword */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g., Quick Sort"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* SEO Keywords */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                Tags / Key Phrases (Comma-separated)
              </label>
              <input
                type="text"
                value={seoKeywordsText}
                onChange={(e) => setSeoKeywordsText(e.target.value)}
                placeholder="e.g., dsa, java, algorithms"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/blogs")}
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-white/5 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-600/10 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                {initialData?.id ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

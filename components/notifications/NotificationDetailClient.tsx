"use client";

import { ArrowLeft, User, Tag, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NotificationAuthor {
    id: string;
    name: string;
    image?: string | null;
}

interface Notification {
    id: string;
    title: string;
    content: string;
    author: NotificationAuthor;
    targetTags: string[];
    createdAt: string;
    updatedAt: string;
}

interface NotificationDetailClientProps {
    notification: Notification;
}

export function NotificationDetailClient({ notification }: NotificationDetailClientProps) {
    const router = useRouter();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        {/* Article */}
                        <article className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#333] overflow-hidden">
                            {/* Header */}
                            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-[#333]">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {notification.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        {notification.author?.image ? (
                                            <img
                                                src={notification.author.image}
                                                alt={notification.author.name}
                                                className="w-6 h-6 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                                <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                                            </div>
                                        )}
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            {notification.author?.name || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(notification.createdAt)}</span>
                                    </div>
                                </div>
                                {notification.targetTags.length > 0 && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <Tag className="w-4 h-4 text-gray-400" />
                                        <div className="flex flex-wrap gap-2">
                                            {notification.targetTags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 sm:p-8">
                                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {notification.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Author Card */}
                            <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#333] p-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Posted by</h3>
                                <div className="flex items-center gap-3">
                                    {notification.author?.image ? (
                                        <img
                                            src={notification.author.image}
                                            alt={notification.author.name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                            <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                                {(notification.author?.name || "P").charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {notification.author?.name || "Unknown"}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Placement Director
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-white dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#333] p-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {new Date(notification.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    {notification.targetTags.length > 0 && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                                <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Audience</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {notification.targetTags.join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

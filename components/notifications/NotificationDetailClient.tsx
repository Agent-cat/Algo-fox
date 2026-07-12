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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                            <div className="flex items-center gap-2.5">
                                {notification.author?.image ? (
                                    <img
                                        src={notification.author.image}
                                        alt={notification.author.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {notification.author?.name || "Unknown"}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full font-medium">
                                        Placement Director
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
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
        </div>
    );
}

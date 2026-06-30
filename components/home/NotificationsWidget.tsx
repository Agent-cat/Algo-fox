"use client";

import { useState } from "react";
import { Bell, ChevronDown, ChevronUp, User, Tag } from "lucide-react";
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
}

export function NotificationsWidget({ notifications }: { notifications: Notification[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (notifications.length === 0) {
        return null;
    }

    const formatDate = (date: string) => {
        const d = new Date(date);
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#333] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-[#333]">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            Placement Updates
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {notifications.length} announcement{notifications.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-[#333]">
                {notifications.map((notification) => {
                    const isExpanded = expandedId === notification.id;
                    return (
                        <div key={notification.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : notification.id)}
                                className="w-full p-4 text-left flex items-start gap-3"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {notification.author?.image ? (
                                        <img
                                            src={notification.author.image}
                                            alt={notification.author.name}
                                            className="w-8 h-8 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                            {(notification.author?.name || "P").charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {notification.title}
                                        </h4>
                                        {isExpanded ? (
                                            <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                            {notification.author?.name || "Placement Director"}
                                        </span>
                                        <span className="text-[11px] text-gray-400 dark:text-gray-500">•</span>
                                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                            {formatDate(notification.createdAt)}
                                        </span>
                                    </div>
                                    {!isExpanded && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1.5">
                                            {notification.content.replace(/[#*`>\-\[\]]/g, "").substring(0, 100)}
                                        </p>
                                    )}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="px-4 pb-4 pl-15">
                                    <div className="prose prose-xs dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {notification.content}
                                        </ReactMarkdown>
                                    </div>
                                    {notification.targetTags.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-[#333]">
                                            <Tag className="w-3 h-3 text-gray-400" />
                                            <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                                Sent to: {notification.targetTags.join(", ")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

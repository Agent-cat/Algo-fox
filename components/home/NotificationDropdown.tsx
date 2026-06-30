"use client";

import { useState, useEffect } from "react";
import { Bell, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

interface NotificationDropdownProps {
    notifications: Notification[];
}

export function NotificationDropdown({ notifications }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

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

    const handleNotificationClick = (notification: Notification) => {
        setIsOpen(false);
        router.push(`/notifications/${notification.id}`);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            >
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {notifications.length}
                </span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#24262C] border border-gray-100 dark:border-[#333] rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="p-3 border-b border-gray-100 dark:border-[#333]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                                <span className="text-[11px] text-gray-500 dark:text-gray-400">{notifications.length} new</span>
                            </div>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-[#2a2a30] last:border-0"
                                >
                                    <div className="flex items-start gap-3">
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
                                            <h4 className="text-[13px] font-semibold text-gray-900 dark:text-white line-clamp-1">
                                                {notification.title}
                                            </h4>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                                {formatDate(notification.createdAt)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                                                {notification.content.replace(/[#*`>\-\[\]]/g, "").substring(0, 80)}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

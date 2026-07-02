"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, ChevronRight, Loader2 } from "lucide-react";
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

const STORAGE_KEY = "algofox_read_notifications";
const PAGE_SIZE = 5;

function getReadNotifications(): Set<string> {
    if (typeof window === "undefined") return new Set();
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return new Set(JSON.parse(stored));
        }
    } catch {}
    return new Set();
}

function markAsRead(id: string) {
    try {
        const readSet = getReadNotifications();
        readSet.add(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(readSet)));
    } catch {}
}

export function NotificationDropdown({ notifications: initialNotifications }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [readIds, setReadIds] = useState<Set<string>>(new Set());
    const [allNotifications, setAllNotifications] = useState<Notification[]>(initialNotifications);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setReadIds(getReadNotifications());
    }, []);

    useEffect(() => {
        setAllNotifications(initialNotifications);
    }, [initialNotifications]);

    const unreadCount = allNotifications.filter((n) => !readIds.has(n.id)).length;

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
        markAsRead(notification.id);
        setReadIds(getReadNotifications());
        setIsOpen(false);
        router.push(`/notifications/${notification.id}`);
    };

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !nextCursor) return;

        setIsLoadingMore(true);
        try {
            const res = await fetch(`/api/notifications?limit=${PAGE_SIZE}&cursor=${nextCursor}`);
            const data = await res.json();

            if (data.success && data.notifications) {
                setAllNotifications((prev) => [...prev, ...data.notifications]);
                setNextCursor(data.nextCursor);
            }
        } catch (error) {
            console.error("Failed to load more notifications:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [nextCursor, isLoadingMore]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-[380px] bg-white dark:bg-[#24262C] border border-gray-100 dark:border-[#333] rounded-2xl shadow-2xl z-50 overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-[#333]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full">
                                        {unreadCount} unread
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {allNotifications.length === 0 ? (
                                <div className="py-12 text-center">
                                    <Bell className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400 dark:text-gray-500">No notifications yet</p>
                                </div>
                            ) : (
                                <>
                                    {allNotifications.map((notification) => {
                                        const isRead = readIds.has(notification.id);
                                        return (
                                            <button
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification)}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-[#2a2a30] last:border-0 ${isRead ? "opacity-60" : ""}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        {notification.author?.image ? (
                                                            <img
                                                                src={notification.author.image}
                                                                alt={notification.author.name}
                                                                className="w-9 h-9 rounded-xl object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                                                {(notification.author?.name || "P").charAt(0).toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            {!isRead && (
                                                                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                                                            )}
                                                            <h4 className="text-[13px] font-semibold text-gray-900 dark:text-white line-clamp-1">
                                                                {notification.title}
                                                            </h4>
                                                        </div>
                                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {notification.author?.name || "Unknown"} • {formatDate(notification.createdAt)}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                                                            {notification.content.replace(/[#*`>\-\[\]]/g, "").substring(0, 80)}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                                </div>
                                            </button>
                                        );
                                    })}

                                    {/* Load More */}
                                    {nextCursor && (
                                        <div className="px-4 py-3 border-t border-gray-100 dark:border-[#333]">
                                            <button
                                                onClick={loadMore}
                                                disabled={isLoadingMore}
                                                className="w-full py-2 text-[12px] font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {isLoadingMore ? (
                                                    <>
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    "Load more"
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

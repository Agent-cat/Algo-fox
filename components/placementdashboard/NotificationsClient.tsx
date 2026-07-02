"use client";

import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { Bell, Plus, Pencil, Trash2, Send, X, ChevronDown, Eye, EyeOff, Loader2, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createNotification, updateNotification, deleteNotification, getNotifications } from "@/actions/notification";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface NotificationAuthor {
    id: string;
    name: string;
    image?: string | null;
}

interface Notification {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: NotificationAuthor;
    targetTags: string[];
    pinned: boolean;
    createdAt: string;
    updatedAt: string;
}

interface AvailableTag {
    tag: string;
    count: number;
}

function serializeNotification(n: any): Notification {
    return {
        ...n,
        createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : String(n.createdAt),
        updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : String(n.updatedAt),
    };
}

export function NotificationsClient({
    initialNotifications,
    initialNextCursor,
    availableTags,
}: {
    initialNotifications: Notification[];
    initialNextCursor: string | null;
    availableTags: AvailableTag[];
}) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isPending, startTransition] = useTransition();

    const resetForm = useCallback(() => {
        setTitle("");
        setContent("");
        setSelectedTags([]);
        setShowPreview(false);
        setEditingNotification(null);
        setShowForm(false);
    }, []);

    const handleEdit = useCallback((notification: Notification) => {
        setEditingNotification(notification);
        setTitle(notification.title);
        setContent(notification.content);
        setSelectedTags(notification.targetTags || []);
        setShowForm(true);
        setShowPreview(false);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        setDeletingId(id);
        try {
            const result = await deleteNotification(id);
            if (result.success) {
                setNotifications(prev => prev.filter(n => n.id !== id));
                toast.success("Notification deleted");
            } else {
                toast.error(result.error || "Failed to delete");
            }
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content are required");
            return;
        }

        setIsSubmitting(true);
        try {
            if (editingNotification) {
                const result = await updateNotification(editingNotification.id, {
                    title: title.trim(),
                    content: content.trim(),
                    targetTags: selectedTags,
                });
                if (result.success && result.notification) {
                    setNotifications(prev =>
                        prev.map(n => n.id === editingNotification.id ? serializeNotification(result.notification!) : n)
                    );
                    toast.success("Notification updated");
                    resetForm();
                } else {
                    toast.error(result.error || "Failed to update");
                }
            } else {
                const result = await createNotification({
                    title: title.trim(),
                    content: content.trim(),
                    targetTags: selectedTags,
                });
                if (result.success && result.notification) {
                    setNotifications(prev => [serializeNotification(result.notification!), ...prev]);
                    toast.success("Notification published");
                    resetForm();
                } else {
                    toast.error(result.error || "Failed to create");
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    }, [title, content, selectedTags, editingNotification, resetForm]);

    const loadMore = useCallback(async () => {
        if (!nextCursor || isLoadingMore) return;
        setIsLoadingMore(true);
        try {
            const res = await getNotifications(nextCursor);
            if (res.success && res.notifications) {
                setNotifications(prev => [...prev, ...res.notifications!.map(serializeNotification)]);
                setNextCursor(res.nextCursor);
            }
        } finally {
            setIsLoadingMore(false);
        }
    }, [nextCursor, isLoadingMore]);

    const toggleTag = useCallback((tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    }, []);

    const insertMarkdown = useCallback((syntax: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = content.substring(0, start);
        const after = content.substring(end);
        const newContent = before + syntax + after;
        setContent(newContent);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + syntax.length, start + syntax.length);
        }, 0);
    }, [content]);

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
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Notifications
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Send announcements to students. Messages appear on their home page.
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Notification
                </button>
            </div>

            {/* Compose / Edit Form */}
            {showForm && (
                <div className="mb-8 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-[#333] flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {editingNotification ? "Edit Notification" : "New Notification"}
                        </h2>
                        <button
                            onClick={resetForm}
                            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Important: Campus Drive Schedule"
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#24262C] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm"
                            />
                        </div>

                        {/* Target Tags */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                <Tag className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                                Target Tags
                                {selectedTags.length === 0 && (
                                    <span className="text-gray-400 normal-case ml-1">(All students)</span>
                                )}
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {availableTags.map(({ tag, count }) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={cn(
                                            "px-2.5 py-1 rounded-md text-xs font-medium transition-all border",
                                            selectedTags.includes(tag)
                                                ? "bg-orange-600 text-white border-orange-600"
                                                : "bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#333] hover:border-orange-300 dark:hover:border-orange-500/50"
                                        )}
                                    >
                                        {tag}
                                        <span className="ml-1 opacity-60">({count})</span>
                                    </button>
                                ))}
                                {availableTags.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">No tags available.</p>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Message (Markdown)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-orange-500 transition-colors"
                                >
                                    {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    {showPreview ? "Edit" : "Preview"}
                                </button>
                            </div>

                            {/* Markdown Toolbar */}
                            {!showPreview && (
                                <div className="flex items-center gap-0.5 mb-2 p-1 bg-gray-100 dark:bg-white/5 rounded-lg">
                                    {[
                                        { label: "B", syntax: "**bold**", title: "Bold" },
                                        { label: "I", syntax: "*italic*", title: "Italic" },
                                        { label: "H1", syntax: "# ", title: "Heading 1" },
                                        { label: "H2", syntax: "## ", title: "Heading 2" },
                                        { label: "H3", syntax: "### ", title: "Heading 3" },
                                        { label: "—", syntax: "\n---\n", title: "Divider" },
                                        { label: ">", syntax: "> ", title: "Quote" },
                                        { label: "•", syntax: "- ", title: "List" },
                                        { label: "1.", syntax: "1. ", title: "Numbered List" },
                                        { label: "[]", syntax: "[text](url)", title: "Link" },
                                        { label: "`", syntax: "`code`", title: "Inline Code" },
                                        { label: "```", syntax: "\n```\n", title: "Code Block" },
                                    ].map(btn => (
                                        <button
                                            key={btn.label}
                                            type="button"
                                            onClick={() => insertMarkdown(btn.syntax)}
                                            title={btn.title}
                                            className="px-2 py-1 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors min-w-[26px]"
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {showPreview ? (
                                <div className="min-h-[180px] max-h-[360px] overflow-y-auto p-4 rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#24262C] prose prose-sm dark:prose-invert max-w-none">
                                    {content ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                                    ) : (
                                        <p className="text-gray-400 italic text-sm">Nothing to preview</p>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    ref={textareaRef}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your notification in markdown...&#10;&#10;## Important Update&#10;&#10;Here are the details for the upcoming campus drive...&#10;&#10;- **Date:** March 15th&#10;- **Time:** 10:00 AM&#10;- **Venue:** Main Auditorium"
                                    rows={10}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#24262C] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-mono leading-relaxed resize-y"
                                />
                            )}
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 dark:border-[#333] flex items-center justify-end gap-2">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !title.trim() || !content.trim()}
                            className="px-5 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {editingNotification ? "Update" : "Publish"}
                        </button>
                    </div>
                </div>
            )}

            {/* Notifications List */}
            {notifications.length === 0 ? (
                <div className="py-20 border border-dashed border-gray-200 dark:border-[#333] flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3">
                        <Bell className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">No notifications yet</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                        Create your first notification to send announcements to students.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#444] transition-colors overflow-hidden"
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1.5">
                                            {notification.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {notification.author?.name || "Unknown"}
                                            </span>
                                            <span>·</span>
                                            <span>{formatDate(notification.createdAt)}</span>
                                            {notification.targetTags.length > 0 && (
                                                <>
                                                    <span>·</span>
                                                    <span className="flex items-center gap-1">
                                                        <Tag className="w-3 h-3" />
                                                        {notification.targetTags.join(", ")}
                                                    </span>
                                                </>
                                            )}
                                            {notification.targetTags.length === 0 && (
                                                <>
                                                    <span>·</span>
                                                    <span className="text-orange-500 font-medium">All students</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-0.5 ml-3">
                                        <button
                                            onClick={() => handleEdit(notification)}
                                            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-orange-500 transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        {confirmDeleteId === notification.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(notification.id)}
                                                    disabled={deletingId === notification.id}
                                                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1"
                                                >
                                                    {deletingId === notification.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-3 h-3" />
                                                    )}
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDeleteId(null)}
                                                    className="px-2.5 py-1 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmDeleteId(notification.id)}
                                                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 line-clamp-4 mt-3 text-sm">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {notification.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {nextCursor && (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={loadMore}
                                disabled={isLoadingMore}
                                className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                                {isLoadingMore ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

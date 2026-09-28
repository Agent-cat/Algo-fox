"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bookmark, Trash2, Folder, FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { toggleBookmark, createBookmarkList, deleteBookmarkList } from "@/actions/bookmark.action";
import { parseCompanies } from "@/components/problems/CompanyAvatars";
import Link from "next/link";

interface BookmarksClientProps {
    initialProblems: any[];
    initialTotalPages: number;
    totalBookmarks: number;
    userRole: string;
    initialLists: any[];
    currentListId: string | null;
}

export default function BookmarksClient({
    initialProblems,
    initialTotalPages,
    totalBookmarks,
    userRole,
    initialLists,
    currentListId
}: BookmarksClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [problems, setProblems] = useState(initialProblems);
    const [searchTerm, setSearchTerm] = useState("");

    // Sync state when props change due to navigation
    useEffect(() => {
        setProblems(initialProblems);
    }, [initialProblems]);

    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [isDeletingList, setIsDeletingList] = useState<string | null>(null);

    const handleRemoveBookmark = async (problemId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Pass currentListId so it's removed from the currently viewed list if applicable
        const res = await toggleBookmark(problemId, currentListId);
        if (res.success) {
            setProblems(prev => prev.filter(p => p.id !== problemId));
            toast.success("Bookmark removed");
            router.refresh();
        } else {
            toast.error("Failed to remove bookmark");
        }
    };

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;

        const res = await createBookmarkList(newListName.trim());
        if (res.success) {
            toast.success("List created");
            setNewListName("");
            setIsCreatingList(false);
            router.refresh();
        } else {
            toast.error(res.error || "Failed to create list");
        }
    };

    const handleDeleteList = async (listId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this list? Bookmarks inside it will not be deleted, they will just be removed from this list.")) return;

        setIsDeletingList(listId);
        const res = await deleteBookmarkList(listId);
        if (res.success) {
            toast.success("List deleted");
            if (currentListId === listId) {
                router.push("/bookmarks");
            } else {
                router.refresh();
            }
        } else {
            toast.error(res.error || "Failed to delete list");
        }
        setIsDeletingList(null);
    };

    const filteredProblems = problems.filter(p => {
        if (!searchTerm) return true;
        const s = searchTerm.toLowerCase();
        return (
            p.title.toLowerCase().includes(s) ||
            p.slug.toLowerCase().includes(s) ||
            parseCompanies(p.companies).some(c => c.name.toLowerCase().includes(s))
        );
    });

    const currentListName = currentListId ? initialLists.find(l => l.id === currentListId)?.name || "Unknown List" : "My Bookmarks";

    return (
        <div className="min-h-screen pt-10 pb-20 bg-[#fafafa] dark:bg-[#1D1E23]">
            <div className="w-full px-6 lg:px-12">

                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                        {currentListName}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="relative group w-full md:flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search bookmarks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 bg-gray-50/50 hover:bg-gray-100/50 focus:bg-gray-50/50 dark:bg-[#111] dark:hover:bg-[#161616] dark:focus:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
                            />
                        </div>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar for Lists */}
                    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
                        <div className="flex flex-col gap-1 mt-2">
                            <h3 className="text-[12.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide transition-colors ml-1 mb-2 px-2">
                                FOLDERS
                            </h3>

                            <div className="space-y-1 px-1">
                                <Link href="/bookmarks">
                                    <div className={`relative flex items-center rounded-lg transition-colors duration-200 group px-3 py-2 gap-3 ${currentListId === null ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'}`}>
                                        <Bookmark className={`flex-shrink-0 w-[18px] h-[18px] transition-colors ${currentListId === null ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                                        <span className="text-[13.5px] whitespace-nowrap overflow-hidden font-medium">All Bookmarks</span>
                                    </div>
                                </Link>

                                {initialLists.map(list => (
                                    <Link key={list.id} href={`/bookmarks?list=${list.id}`}>
                                        <div className={`relative flex items-center justify-between rounded-lg transition-colors duration-200 group px-3 py-2 ${currentListId === list.id ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'}`}>
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <Folder className={`flex-shrink-0 w-[18px] h-[18px] transition-colors ${currentListId === list.id ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                                                <span className="text-[13.5px] whitespace-nowrap overflow-hidden font-medium truncate">{list.name}</span>
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteList(list.id, e)}
                                                disabled={isDeletingList === list.id}
                                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-all shrink-0"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 px-2">
                                {!isCreatingList ? (
                                    <button
                                        onClick={() => setIsCreatingList(true)}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg transition-colors group"
                                    >
                                        <FolderPlus className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
                                        New List
                                    </button>
                                ) : (
                                    <form onSubmit={handleCreateList} className="flex flex-col gap-2 mt-2">
                                        <input
                                            type="text"
                                            placeholder="List name..."
                                            className="w-full px-3 py-2 text-[13.5px] bg-transparent dark:bg-[#1D1E23] border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900 dark:text-white"
                                            value={newListName}
                                            onChange={e => setNewListName(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => setIsCreatingList(false)}
                                                className="flex-1 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!newListName.trim()}
                                                className="flex-1 py-1.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-colors"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main List Container */}
                    <div className="flex-1 bg-transparent dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden shadow-sm">
                        {/* List Header */}
                        <div className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-4 border-b border-gray-200 dark:border-[#1e1e1e] bg-transparent dark:bg-[#1D1E23]/50 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            <div className="col-span-6 md:col-span-4">Title</div>
                            <div className="col-span-2 md:col-span-2 md:text-center">Domain</div>
                            <div className="col-span-2 md:col-span-2 md:text-center">Difficulty</div>
                            <div className="col-span-2 md:col-span-2 md:text-center">Acceptance</div>
                            <div className="col-span-12 md:col-span-2 md:text-right hidden md:block">Actions</div>
                        </div>

                        {/* List Items */}
                        <div className="divide-y divide-gray-50 dark:divide-[#1D1E23] min-h-[400px]">
                            <AnimatePresence mode="popLayout">
                                {filteredProblems.length > 0 ? (
                                    filteredProblems.map((problem, idx) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            key={problem.id}
                                            className="relative group"
                                        >
                                            <div className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-4 items-center hover:bg-gray-100/50 dark:hover:bg-[#1D1E23]/50 transition-colors">
                                                <Link href={`/problems/${problem.slug}`} className="col-span-6 md:col-span-4 block">
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <div className="font-bold text-gray-900 dark:text-gray-100 text-[15px] group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                                {problem.title}
                                                            </div>
                                                            <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                                                                {problem.slug}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>

                                                <div className="col-span-2 md:col-span-2 md:text-center">
                                                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-[#262626] dark:text-gray-400">
                                                        {problem.domain}
                                                    </span>
                                                </div>

                                                <div className="col-span-2 md:col-span-2 flex justify-start md:justify-center">
                                                    <span className={`text-xs font-bold ${problem.difficulty === 'EASY' ? 'text-emerald-500' :
                                                            problem.difficulty === 'MEDIUM' ? 'text-amber-500' :
                                                                'text-rose-500'
                                                        }`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </div>

                                                <div className="col-span-2 md:col-span-2 md:text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                    {problem.acceptance.toFixed(1)}%
                                                </div>

                                                <div className="col-span-12 md:col-span-2 flex justify-end">
                                                    <button
                                                        onClick={(e) => handleRemoveBookmark(problem.id, e)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Remove from list"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-[400px] flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1D1E23] rounded-2xl flex items-center justify-center mb-4 border border-gray-100 dark:border-[#262626]">
                                            {currentListId ? <Folder className="w-6 h-6 text-gray-300 dark:text-gray-600" /> : <Bookmark className="w-6 h-6 text-gray-300 dark:text-gray-600" />}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            {currentListId ? "Folder is empty" : "No bookmarks found"}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                            {searchTerm
                                                ? "No bookmarks match your search criteria. Try adjusting your filters."
                                                : currentListId ? "This list doesn't contain any problems yet." : "You haven't bookmarked any problems yet. Star problems while practicing to access them here later."}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

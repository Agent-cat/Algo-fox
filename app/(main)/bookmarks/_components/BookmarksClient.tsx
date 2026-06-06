"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bookmark, Trash2 } from "lucide-react";
import { ProblemRow } from "@/app/(main)/problems/dsa/_components/shared/ProblemRow";
import { toast } from "sonner";
import { toggleBookmark } from "@/actions/bookmark.action";
import { parseCompanies } from "@/components/problems/CompanyAvatars";

interface BookmarksClientProps {
    initialProblems: any[];
    initialTotalPages: number;
    totalBookmarks: number;
    userRole: string;
}

export default function BookmarksClient({
    initialProblems,
    initialTotalPages,
    totalBookmarks,
    userRole
}: BookmarksClientProps) {
    const router = useRouter();
    const [problems, setProblems] = useState(initialProblems);
    const [searchTerm, setSearchTerm] = useState("");

    const handleRemoveBookmark = async (problemId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const res = await toggleBookmark(problemId);
        if (res.success) {
            setProblems(prev => prev.filter(p => p.id !== problemId));
            toast.success("Bookmark removed");
            router.refresh();
        } else {
            toast.error("Failed to remove bookmark");
        }
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

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fafafa] dark:bg-[#121212]">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 rounded-xl">
                                <Bookmark className="w-5 h-5 fill-current" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                My Bookmarks
                            </h1>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
                            Review your saved problems across all domains. You have {totalBookmarks} bookmarked {totalBookmarks === 1 ? 'problem' : 'problems'}.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-72 relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search bookmarks..."
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white font-medium placeholder:font-normal"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List Container */}
                <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden shadow-sm">
                    {/* List Header */}
                    <div className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-4 border-b border-gray-100 dark:border-[#1e1e1e] bg-gray-50/50 dark:bg-[#1a1a1a]/50 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        <div className="col-span-6 md:col-span-4">Title</div>
                        <div className="col-span-2 md:col-span-2 md:text-center">Domain</div>
                        <div className="col-span-2 md:col-span-2 md:text-center">Difficulty</div>
                        <div className="col-span-2 md:col-span-2 md:text-center">Acceptance</div>
                        <div className="col-span-12 md:col-span-2 md:text-right hidden md:block">Actions</div>
                    </div>

                    {/* List Items */}
                    <div className="divide-y divide-gray-50 dark:divide-[#111111] min-h-[400px]">
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
                                        <div className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-4 items-center hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50 transition-colors">
                                            <div className="col-span-6 md:col-span-4" onClick={() => router.push(`/problems/${problem.slug}`)}>
                                                <div className="flex items-center gap-3 cursor-pointer">
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-gray-100 text-[15px] group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                                                            {problem.title}
                                                        </div>
                                                        <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                                                            {problem.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2 md:col-span-2 md:text-center">
                                                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-[#262626] dark:text-gray-400">
                                                    {problem.domain}
                                                </span>
                                            </div>

                                            <div className="col-span-2 md:col-span-2 flex justify-start md:justify-center">
                                                <span className={`text-xs font-bold ${
                                                    problem.difficulty === 'EASY' ? 'text-emerald-500' :
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
                                                    title="Remove bookmark"
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
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4 border border-gray-100 dark:border-[#262626]">
                                        <Bookmark className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        No bookmarks found
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                        {searchTerm 
                                            ? "No bookmarks match your search criteria. Try adjusting your filters."
                                            : "You haven't bookmarked any problems yet. Star problems while practicing to access them here later."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

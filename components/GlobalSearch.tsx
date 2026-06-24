"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
    LdMagnifer,
    LdCode,
    LdDatabase,
    LdLightbulbBolt,
    LdHomeSmile,
    LdUserRounded,
    LdDiploma,
    LdFolder,
    LdCase,
    LdArrowRight
} from "solar-icon-react/ld";
import { cn } from "@/lib/utils";

type SearchResult = {
    id: string;
    title: string;
    url: string;
    icon: any;
    type: "page" | "problem";
    category?: string;
};

// Mock data for search
const allPages: SearchResult[] = [
    { id: "p1", title: "Home", url: "/", icon: LdHomeSmile, type: "page" },
    { id: "p2", title: "Basic Info Settings", url: "/dashboard/settings/basic-info", icon: LdUserRounded, type: "page" },
    { id: "p3", title: "Education Settings", url: "/dashboard/settings/education", icon: LdDiploma, type: "page" },
    { id: "p4", title: "Projects Settings", url: "/dashboard/settings/projects", icon: LdFolder, type: "page" },
    { id: "p5", title: "Experience Settings", url: "/dashboard/settings/experience", icon: LdCase, type: "page" },
];

const allProblems: SearchResult[] = [
    { id: "pr1", title: "Two Sum", url: "/problems/two-sum", category: "DSA", icon: LdCode, type: "problem" },
    { id: "pr2", title: "Reverse Linked List", url: "/problems/reverse-linked-list", category: "DSA", icon: LdCode, type: "problem" },
    { id: "pr3", title: "Employee Salary", url: "/problems/employee-salary", category: "SQL", icon: LdDatabase, type: "problem" },
    { id: "pr4", title: "Highest Earner", url: "/problems/highest-earner", category: "SQL", icon: LdDatabase, type: "problem" },
    { id: "pr5", title: "Time and Work", url: "/problems/time-and-work", category: "Aptitude", icon: LdLightbulbBolt, type: "problem" },
];

export function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle on Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Toggle via custom event
    useEffect(() => {
        const handleOpenEvent = () => setOpen(true);
        window.addEventListener("open-global-search", handleOpenEvent);
        return () => window.removeEventListener("open-global-search", handleOpenEvent);
    }, []);

    // Debounce query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
            setSelectedIndex(0); // reset selection on new search
        }, 200);
        return () => clearTimeout(handler);
    }, [query]);

    // Focus input when modal opens
    useEffect(() => {
        if (open) {
            setQuery("");
            setDebouncedQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    // Filter results
    const results = useCallback(() => {
        if (!debouncedQuery) return [];
        
        let q = debouncedQuery.toLowerCase().trim();
        let showPages = true;
        let showProblems = true;
        let problemFilter = "";

        // Check for specific command prefixes
        if (debouncedQuery.toLowerCase().startsWith("pages ") || debouncedQuery.toLowerCase() === "pages") {
            showProblems = false;
            q = q.replace(/^pages\s*/, "").trim();
        } else if (debouncedQuery.toLowerCase().startsWith("dsa ") || debouncedQuery.toLowerCase() === "dsa") {
            showPages = false;
            problemFilter = "dsa";
            q = q.replace(/^dsa\s*/, "").trim();
        } else if (debouncedQuery.toLowerCase().startsWith("sql ") || debouncedQuery.toLowerCase() === "sql") {
            showPages = false;
            problemFilter = "sql";
            q = q.replace(/^sql\s*/, "").trim();
        } else if (debouncedQuery.toLowerCase().startsWith("aptitude ") || debouncedQuery.toLowerCase() === "aptitude") {
            showPages = false;
            problemFilter = "aptitude";
            q = q.replace(/^aptitude\s*/, "").trim();
        }
        
        let matchedPages: SearchResult[] = [];
        if (showPages) {
            matchedPages = allPages.filter(p => !q || p.title.toLowerCase().includes(q));
        }
        
        let matchedProblems: SearchResult[] = [];
        if (showProblems) {
            matchedProblems = allProblems.filter(p => {
                const matchesFilter = problemFilter ? p.category?.toLowerCase() === problemFilter : true;
                const matchesQuery = !q || p.title.toLowerCase().includes(q) || (p.category?.toLowerCase().includes(q) && !problemFilter);
                return matchesFilter && matchesQuery;
            });
        }
        
        return [...matchedPages, ...matchedProblems];
    }, [debouncedQuery]);

    const currentResults = results();

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;
            
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % (currentResults.length || 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + (currentResults.length || 1)) % (currentResults.length || 1));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = currentResults[selectedIndex];
                if (selected) {
                    router.push(selected.url);
                    setOpen(false);
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, currentResults, selectedIndex, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[600px] p-0 overflow-hidden bg-[#fafafa] dark:bg-[#1D1E23] gap-0 border border-gray-200 dark:border-white/10 shadow-2xl !rounded-xl">
                {/* Search Input Header */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-white/10">
                    <LdMagnifer className="w-[18px] h-[18px] text-gray-500 mr-3 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products, pages, and features..."
                        className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-1 ml-3 shrink-0">
                        <span className="text-[11px] font-semibold px-2 py-1 bg-gray-200/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200/80 dark:border-white/10">Esc</span>
                    </div>
                </div>

                {/* Search Results Body */}
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-2">
                    {!debouncedQuery ? (
                        <div className="px-2 py-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Search tips</h4>
                            <div className="space-y-1">
                                {[
                                    { label: "pages:", desc: "Search through platform pages", icon: LdFolder },
                                    { label: "dsa:", desc: "Search Data Structures & Algorithms problems", icon: LdCode },
                                    { label: "sql:", desc: "Search Database problems", icon: LdDatabase },
                                    { label: "aptitude:", desc: "Search Aptitude challenges", icon: LdLightbulbBolt },
                                ].map((tip, i) => (
                                    <div 
                                        key={i} 
                                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                                        onClick={() => {
                                            setQuery(tip.label + " ");
                                            inputRef.current?.focus();
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tip.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">{tip.label}</span>
                                            <span className="text-gray-400">—</span>
                                            <span>{tip.desc}</span>
                                        </div>
                                        <LdArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : currentResults.length > 0 ? (
                        <div className="py-2">
                            {/* Grouping by type for better UI */}
                            {currentResults.some(r => r.type === "page") && (
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">Pages</h4>
                                    <div className="space-y-0.5">
                                        {currentResults.filter(r => r.type === "page").map((result) => {
                                            const globalIndex = currentResults.indexOf(result);
                                            const isSelected = selectedIndex === globalIndex;
                                            return (
                                                <div
                                                    key={result.id}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                    onClick={() => { router.push(result.url); setOpen(false); }}
                                                    className={cn(
                                                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] cursor-pointer transition-colors",
                                                        isSelected ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <result.icon className={cn("w-4 h-4", isSelected ? "text-gray-900 dark:text-white" : "text-gray-400")} />
                                                        <span className="font-medium">{result.title}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {currentResults.some(r => r.type === "problem") && (
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">Problems</h4>
                                    <div className="space-y-0.5">
                                        {currentResults.filter(r => r.type === "problem").map((result) => {
                                            const globalIndex = currentResults.indexOf(result);
                                            const isSelected = selectedIndex === globalIndex;
                                            return (
                                                <div
                                                    key={result.id}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                    onClick={() => { router.push(result.url); setOpen(false); }}
                                                    className={cn(
                                                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] cursor-pointer transition-colors",
                                                        isSelected ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <result.icon className={cn("w-4 h-4", isSelected ? "text-gray-900 dark:text-white" : "text-gray-400")} />
                                                        <span className="font-medium">{result.title}</span>
                                                    </div>
                                                    <span className={cn(
                                                        "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                                                        isSelected ? "bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 shadow-sm" : "bg-gray-100 dark:bg-[#222] text-gray-500 border-gray-200 dark:border-white/5"
                                                    )}>
                                                        {result.category}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-14 text-center text-gray-500 dark:text-gray-400 text-[14px]">
                            No results found for "{debouncedQuery}"
                        </div>
                    )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center px-4 py-3 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 text-[11px] text-gray-500 gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="flex items-center justify-center w-4 h-4 bg-gray-200 dark:bg-white/10 rounded font-serif">↑</span>
                        <span className="flex items-center justify-center w-4 h-4 bg-gray-200 dark:bg-white/10 rounded font-serif">↓</span>
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="flex items-center justify-center h-4 px-1.5 bg-gray-200 dark:bg-white/10 rounded font-serif">↵</span>
                        <span>to select</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

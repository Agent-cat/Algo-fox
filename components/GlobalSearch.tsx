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
    LdSettings,
    LdCup,
    LdChart,
    LdUserRounded,
    LdArrowRight,
    LdLaptop,
    LdCrownStar,
    LdBook,
    LdStar2,
    LdRanking
} from "solar-icon-react/ld";
import { cn } from "@/lib/utils";
import { searchProblems } from "@/actions/problems";
import type { ProblemDomain } from "@prisma/client";

type SearchResult = {
    id: string;
    title: string;
    url: string;
    icon: any;
    type: "page" | "problem";
    category?: string;
    domain?: string;
    difficulty?: string;
    tags?: { name: string; slug: string }[];
    isSolved?: boolean;
    acceptance?: number;
};

const allPages: SearchResult[] = [
    { id: "p1", title: "Home", url: "/", icon: LdHomeSmile, type: "page" },
    { id: "p2", title: "Problems - DSA", url: "/problems/dsa", icon: LdCode, type: "page", category: "DSA" },
    { id: "p3", title: "Problems - SQL", url: "/problems/sql", icon: LdDatabase, type: "page", category: "SQL" },
    { id: "p4", title: "Problems - Aptitude", url: "/problems/aptitude", icon: LdLightbulbBolt, type: "page", category: "Aptitude" },
    { id: "p5", title: "Problems - OOPS", url: "/problems/oops", icon: LdCrownStar, type: "page", category: "OOPS" },
    { id: "p6", title: "Contests", url: "/contests", icon: LdCup, type: "page" },
    { id: "p7", title: "Leaderboard", url: "/leaderboard", icon: LdRanking, type: "page" },
    { id: "p8", title: "Profile", url: "/profile", icon: LdUserRounded, type: "page" },
    { id: "p9", title: "Dashboard", url: "/dashboard", icon: LdChart, type: "page" },
    { id: "p10", title: "Learn", url: "/learn", icon: LdBook, type: "page" },
    { id: "p11", title: "Practice - DSA", url: "/problems/dsa/practice", icon: LdLaptop, type: "page", category: "DSA" },
    { id: "p12", title: "Practice - SQL", url: "/problems/sql/practice", icon: LdLaptop, type: "page", category: "SQL" },
];

const difficultyColors: Record<string, string> = {
    EASY: "text-emerald-600 dark:text-emerald-400",
    MEDIUM: "text-amber-600 dark:text-amber-400",
    HARD: "text-rose-600 dark:text-rose-400",
    CONCEPT: "text-blue-600 dark:text-blue-400",
};

const domainIcons: Record<string, any> = {
    DSA: LdCode,
    SQL: LdDatabase,
    APTITUDE: LdLightbulbBolt,
    OOPS: LdCrownStar,
    WEBDEV: LdLaptop,
    REACT: LdStar2,
};

const domainPrefixes: Record<string, string> = {
    "dsa:": "DSA",
    "dsa ": "DSA",
    "sql:": "SQL",
    "sql ": "SQL",
    "aptitude:": "APTITUDE",
    "aptitude ": "APTITUDE",
    "oops:": "OOPS",
    "oops ": "OOPS",
    "webdev:": "WEBDEV",
    "webdev ": "WEBDEV",
    "react:": "REACT",
    "react ": "REACT",
    "pages:": "__PAGES__",
    "pages ": "__PAGES__",
};

export function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [problemResults, setProblemResults] = useState<SearchResult[]>([]);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const abortRef = useRef<AbortController | null>(null);

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

    useEffect(() => {
        const handleOpenEvent = () => setOpen(true);
        window.addEventListener("open-global-search", handleOpenEvent);
        return () => window.removeEventListener("open-global-search", handleOpenEvent);
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
            setSelectedIndex(0);
        }, 200);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (open) {
            setQuery("");
            setDebouncedQuery("");
            setSelectedIndex(0);
            setProblemResults([]);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    useEffect(() => {
        if (!debouncedQuery) {
            setProblemResults([]);
            return;
        }

        let q = debouncedQuery.toLowerCase().trim();
        let domainFilter: ProblemDomain | undefined;

        for (const [prefix, domain] of Object.entries(domainPrefixes)) {
            if (q.startsWith(prefix)) {
                if (domain === "__PAGES__") {
                    setProblemResults([]);
                    return;
                }
                domainFilter = domain as ProblemDomain;
                q = q.slice(prefix.length).trim();
                break;
            }
        }

        if (!q) {
            setProblemResults([]);
            return;
        }

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        searchProblems(q, undefined, domainFilter)
            .then((data) => {
                if (controller.signal.aborted) return;
                const problems = (data?.problems ?? []).map((p: any): SearchResult => ({
                    id: p.id,
                    title: p.title,
                    url: `/problems/${p.slug}`,
                    icon: domainIcons[p.domain] ?? LdCode,
                    type: "problem" as const,
                    category: p.domain,
                    domain: p.domain,
                    difficulty: p.difficulty,
                    tags: p.tags,
                    isSolved: p.isSolved,
                    acceptance: p.acceptance,
                }));
                setProblemResults(problems);
            })
            .catch(() => {
                if (!controller.signal.aborted) setProblemResults([]);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [debouncedQuery]);

    const currentResults = useCallback((): SearchResult[] => {
        if (!debouncedQuery) return [];

        let q = debouncedQuery.toLowerCase().trim();
        let showPages = true;
        let pageFilter = "";

        for (const [prefix, domain] of Object.entries(domainPrefixes)) {
            if (q.startsWith(prefix)) {
                if (domain === "__PAGES__") {
                    q = q.slice(prefix.length).trim();
                    break;
                }
                showPages = false;
                break;
            }
        }

        let pages: SearchResult[] = [];
        if (showPages) {
            pages = allPages.filter((p) => {
                const matchesTitle = !q || p.title.toLowerCase().includes(q);
                const matchesCat = !pageFilter || p.category?.toLowerCase() === pageFilter;
                return matchesTitle && matchesCat;
            });
        }

        return [...pages, ...problemResults];
    }, [debouncedQuery, problemResults]);

    const results = currentResults();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + (results.length || 1)) % (results.length || 1));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = results[selectedIndex];
                if (selected) {
                    router.push(selected.url);
                    setOpen(false);
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, results, selectedIndex, router]);

    const pages = results.filter((r) => r.type === "page");
    const problems = results.filter((r) => r.type === "problem");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[640px] p-0 overflow-hidden bg-[#fafafa] dark:bg-[#1D1E23] gap-0 border border-gray-200 dark:border-white/10 shadow-2xl !rounded-xl">
                {/* Search Input Header */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-white/10">
                    <LdMagnifer className="w-[18px] h-[18px] text-gray-500 mr-3 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search problems, pages, and more..."
                        className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-1 ml-3 shrink-0">
                        {loading && (
                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mr-2" />
                        )}
                        <span className="text-[11px] font-semibold px-2 py-1 bg-gray-200/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200/80 dark:border-white/10">Esc</span>
                    </div>
                </div>

                {/* Search Results Body */}
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                    {!debouncedQuery ? (
                        <div className="px-2 py-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Search tips</h4>
                            <div className="space-y-1">
                                {[
                                    { label: "dsa:", desc: "Search Data Structures & Algorithms", icon: LdCode },
                                    { label: "sql:", desc: "Search Database problems", icon: LdDatabase },
                                    { label: "aptitude:", desc: "Search Aptitude challenges", icon: LdLightbulbBolt },
                                    { label: "oops:", desc: "Search OOPS problems", icon: LdCrownStar },
                                    { label: "pages:", desc: "Search platform pages only", icon: LdLaptop },
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
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            {pages.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">Pages</h4>
                                    <div className="space-y-0.5">
                                        {pages.map((result) => {
                                            const globalIndex = results.indexOf(result);
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
                                                    {result.category && (
                                                        <span className={cn(
                                                            "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                                                            isSelected ? "bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 shadow-sm" : "bg-gray-100 dark:bg-[#222] text-gray-500 border-gray-200 dark:border-white/5"
                                                        )}>
                                                            {result.category}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {problems.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">Problems</h4>
                                    <div className="space-y-0.5">
                                        {problems.map((result) => {
                                            const globalIndex = results.indexOf(result);
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
                                                        <div className="flex flex-col">
                                                            <span className="font-medium leading-tight">{result.title}</span>
                                                            {result.tags && result.tags.length > 0 && (
                                                                <div className="flex gap-1 mt-0.5">
                                                                    {result.tags.slice(0, 3).map((tag) => (
                                                                        <span key={tag.slug} className="text-[10px] text-gray-400 dark:text-gray-500">
                                                                            {tag.name}
                                                                        </span>
                                                                    ))}
                                                                    {result.tags.length > 3 && (
                                                                        <span className="text-[10px] text-gray-400 dark:text-gray-500">+{result.tags.length - 3}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        {result.isSolved && (
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        )}
                                                        {result.difficulty && (
                                                            <span className={cn("text-[10px] font-semibold", difficultyColors[result.difficulty] ?? "text-gray-500")}>
                                                                {result.difficulty}
                                                            </span>
                                                        )}
                                                        {result.category && (
                                                            <span className={cn(
                                                                "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                                                                isSelected ? "bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 shadow-sm" : "bg-gray-100 dark:bg-[#222] text-gray-500 border-gray-200 dark:border-white/5"
                                                            )}>
                                                                {result.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : !loading ? (
                        <div className="py-14 text-center text-gray-500 dark:text-gray-400 text-[14px]">
                            No results found for &ldquo;{debouncedQuery}&rdquo;
                        </div>
                    ) : null}
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

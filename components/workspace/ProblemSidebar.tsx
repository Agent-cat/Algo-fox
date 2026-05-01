"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, List } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { getProblems, searchProblems } from "@/actions/problems";
import { getCategories, getCategoryProblems } from "@/actions/category.action";
import { ProblemDomain, ProblemType } from "@prisma/client";
import { cn } from "@/lib/utils";
import { SearchBar } from "./sidebar/SearchBar";
import { ProblemsList } from "./sidebar/ProblemsList";
import { CategoriesList } from "./sidebar/CategoriesList";

interface ProblemSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentProblemId: string;
  domain?: ProblemDomain;
  problemType?: ProblemType;
  solvedProblemIds: string[];
  courseId?: string | null;
  courseName?: string | null;
}

interface ProblemSimple {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
}

interface CategorySimple {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: CategorySimple[];
}

export default function ProblemSidebar({
  isOpen,
  onClose,
  currentProblemId,
  domain = "DSA",
  problemType,
  solvedProblemIds,
  courseId,
  courseName
}: ProblemSidebarProps) {
  // PERFORMANCE: Use a Set for O(1) lookups of solved problem IDs
  const solvedSet = useMemo(() => new Set(solvedProblemIds), [solvedProblemIds]);

  const [activeTab, setActiveTab] = useState<"problems" | "learn">(
    problemType === "LEARN" ? "learn" : "problems"
  );

  // Problems Tab State
  const [problems, setProblems] = useState<ProblemSimple[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingProblems, setIsLoadingProblems] = useState(false);

  // Learn Tab State
  const [categories, setCategories] = useState<CategorySimple[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categoryProblems, setCategoryProblems] = useState<Record<string, ProblemSimple[]>>({});
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [loadingCategoryProblems, setLoadingCategoryProblems] = useState<string | null>(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ProblemSimple[]>([]);

  // Search Handler
  useEffect(() => {
    const search = async () => {
      if (debouncedSearchTerm.trim().length > 0) {
        setIsSearching(true);
        try {
          const type = activeTab === "learn" ? "LEARN" : "PRACTICE";
          const res = await searchProblems(debouncedSearchTerm, type, domain);
          if (res && res.problems) {
             setSearchResults(res.problems.map((p: any) => ({
                 id: p.id,
                 title: p.title,
                 slug: p.slug,
                 difficulty: p.difficulty
             })));
          }
        } catch (error) {
           console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    search();
  }, [debouncedSearchTerm, activeTab, domain]);

  // PREFETCH: Load both problems and categories on mount and when domain changes
  useEffect(() => {
    setProblems([]);
    setPage(1);
    setHasMore(true);
    setCategories([]);
    setExpandedCategories([]);
    setCategoryProblems({});

    loadProblems(1);
    loadCategories();
  }, [domain, courseId]); // Re-run when domain or courseId changes

  // Sync active tab if problem type or courseId changes
  useEffect(() => {
    if (courseId) {
        setActiveTab("learn");
    } else if (problemType) {
        setActiveTab(problemType === "LEARN" ? "learn" : "problems");
    }
  }, [problemType, courseId]);

  const loadProblems = async (pageNum: number) => {
    if (isLoadingProblems) return;
    setIsLoadingProblems(true);
    try {
      const res = await getProblems(pageNum, 20, "PRACTICE", domain);
      if (res && res.problems) {
        if (pageNum === 1) {
          setProblems(res.problems);
        } else {
          setProblems((prev) => [...prev, ...res.problems]);
        }
        // If we got fewer than requested, no more pages
        if (res.problems.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPage(pageNum);
      }
    } catch (error) {
       console.error("Failed to load problems", error);
    } finally {
      setIsLoadingProblems(false);
    }
  };

  const loadCategories = async () => {
    if (loadingCategories) return;
    setLoadingCategories(true);
    try {
      const res = await getCategories(domain, courseId || undefined);
      if (res && res.categories) {
        const cats = res.categories as CategorySimple[];

        // Build Tree
        const map = new Map<string, CategorySimple>();
        cats.forEach(cat => map.set(cat.id, { ...cat, children: [] }));

        const roots: CategorySimple[] = [];
        cats.forEach(cat => {
            const node = map.get(cat.id)!;
            if (cat.parentId && map.has(cat.parentId)) {
                map.get(cat.parentId)!.children!.push(node);
            } else {
                roots.push(node);
            }
        });

        // Ensure orders are preserved if needed (getCategories should already be sorted)
        setCategories(roots);
      }
    } catch (error) {
       console.error("Failed to load categories", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const toggleCategory = async (categoryId: string) => {
    const isExpanded = expandedCategories.includes(categoryId);

    if (isExpanded) {
      setExpandedCategories(prev => prev.filter(id => id !== categoryId));
      return;
    }

    setExpandedCategories(prev => [...prev, categoryId]);

    if (!categoryProblems[categoryId]) {
      setLoadingCategoryProblems(categoryId);
      try {
        const res = await getCategoryProblems(categoryId, 1, 50); // Fetch first 50 for now
        if (res && res.problems) {
          setCategoryProblems((prev) => ({
            ...prev,
            [categoryId]: res.problems
          }));
        }
      } catch (error) {
         console.error("Failed to load category problems", error);
      } finally {
        setLoadingCategoryProblems(null);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 bottom-0 w-[420px] max-w-[90vw] z-50 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)] bg-[#fafafa] dark:bg-[#121212] backdrop-blur-md border-r border-white/20 dark:border-white/5"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/5 blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] -z-10 pointer-events-none" />

            <div className="flex flex-col h-full overflow-hidden">
              {/* Header section with Title and Close button */}
              <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-gray-100/10 dark:border-white/5 bg-transparent sticky top-0 z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_-5px_rgba(249,115,22,0.3)]">
                    <List className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none pt-0.5">
                    Problem Navigator
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 shrink-0 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#222] rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-all shadow-sm group active:scale-95"
                  title="Close Sidebar"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </div>

              {/* Navigation & Search Container */}
              <div className="px-6 py-4 space-y-4 bg-transparent border-b border-gray-100/10 dark:border-white/5">
                {courseName && (
                  <div className="px-3 py-2 rounded-lg bg-orange-500/5 border border-orange-500/10 mb-2">
                    <p className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-0.5">Course</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{courseName}</p>
                  </div>
                )}
                {/* Tabs with sliding indicator - HIDDEN IF IN COURSE CONTEXT */}
                {!courseId && (
                  <div className="relative flex p-1.5 gap-1 bg-gray-100/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-[#262626] overflow-hidden">
                    {/* Sliding Background */}
                    <motion.div
                      className="absolute inset-y-1.5 bg-white dark:bg-[#2c2c2c] rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/5 z-0"
                      initial={false}
                      animate={{
                        x: activeTab === "problems" ? 0 : "100%",
                        width: "calc(50% - 6px)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ left: activeTab === "problems" ? "4px" : "2px" }}
                    />

                    <button
                      onClick={() => { setActiveTab("problems"); setSearchTerm(""); }}
                      className={cn(
                        "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors duration-200",
                        activeTab === "problems"
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      )}
                    >
                      <List className="w-4 h-4" />
                      Practice
                    </button>
                    <button
                      onClick={() => { setActiveTab("learn"); setSearchTerm(""); }}
                      className={cn(
                        "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors duration-200",
                        activeTab === "learn"
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      )}
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn
                    </button>
                  </div>
                )}

                {/* Search Bar section */}
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              </div>

              {/* Content area with improved scrolling */}
              <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-[#262626] scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={searchTerm ? "search" : activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {searchTerm ? (
                       <ProblemsList
                            problems={searchResults}
                            solvedSet={solvedSet}
                            currentProblemId={currentProblemId}
                            isLoading={false}
                            hasMore={false}
                            onLoadMore={() => {}}
                            isSearchMode={true}
                            searchTerm={searchTerm}
                            isSearching={isSearching}
                            courseId={courseId}
                       />
                    ) : activeTab === "problems" ? (
                       <ProblemsList
                            problems={problems}
                            solvedSet={solvedSet}
                            currentProblemId={currentProblemId}
                            isLoading={isLoadingProblems}
                            hasMore={hasMore}
                            onLoadMore={() => loadProblems(page + 1)}
                            courseId={courseId}
                       />
                    ) : (
                       <CategoriesList
                            categories={categories}
                            loadingCategories={loadingCategories}
                            expandedCategories={expandedCategories}
                            categoryProblems={categoryProblems}
                            loadingCategoryProblems={loadingCategoryProblems}
                            solvedSet={solvedSet}
                            currentProblemId={currentProblemId}
                            onToggleCategory={toggleCategory}
                            courseId={courseId}
                       />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

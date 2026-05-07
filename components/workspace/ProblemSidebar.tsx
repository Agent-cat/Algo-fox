"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, List, ChevronDown } from "lucide-react";
import { getNextProblem, getRandomProblem } from "@/actions/problems";
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

  // Filter State
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("newest");

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
  }, [debouncedSearchTerm, domain, activeTab]);

  // PREFETCH: Load problems on mount and when domain/filters change
  useEffect(() => {
    setProblems([]);
    setPage(1);
    setHasMore(true);
    
    loadProblems(1, difficulty, sortBy);
  }, [domain, courseId, difficulty, sortBy]);

  // Handle Intelligence: Switch tab based on problemType
  useEffect(() => {
    if (problemType === "LEARN") {
      setActiveTab("learn");
    } else {
      setActiveTab("problems");
    }
  }, [problemType]);

  // Load Categories when Learn tab is active
  useEffect(() => {
    if (activeTab === "learn" && categories.length === 0) {
      loadCategories();
    }
  }, [activeTab, domain, courseId]);

  const loadProblems = async (pageNum: number, diff?: string, sort?: string) => {
    if (isLoadingProblems) return;
    setIsLoadingProblems(true);
    try {
      const res = await getProblems(pageNum, 20, "PRACTICE", domain, diff as any, [], undefined, sort);
      if (res && res.problems) {
        if (pageNum === 1) {
          setProblems(res.problems);
        } else {
          setProblems((prev) => [...prev, ...res.problems]);
        }
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
        const res = await getCategoryProblems(categoryId, 1, 50); 
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
            className="absolute inset-0 z-40 bg-black/20 dark:bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="absolute top-0 left-0 bottom-0 w-[550px] max-w-[95vw] z-50 shadow-2xl bg-white dark:bg-[#0d0d0d] border-r border-gray-200 dark:border-white/5"
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header section with Title and Close button */}
              <div className="px-6 py-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {activeTab === "problems" ? "Practice Problems" : "Learning Modules"}
                  </h2>
                <button
                  onClick={onClose}
                  className="p-2 shrink-0 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-white transition-all group active:scale-95"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Toggle Switcher */}
              <div className="px-6 pb-2">
                <div className="p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl flex gap-1 items-center relative">
                    <button
                        onClick={() => setActiveTab("problems")}
                        className={cn(
                            "flex-1 relative z-10 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2",
                            activeTab === "problems" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        )}
                    >
                        <List className="w-4 h-4" />
                        Practice
                        {activeTab === "problems" && (
                            <motion.div 
                                layoutId="activeTabSwitcher"
                                className="absolute inset-0 bg-orange-500 rounded-xl -z-10 shadow-lg shadow-orange-500/20"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("learn")}
                        className={cn(
                            "flex-1 relative z-10 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2",
                            activeTab === "learn" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        )}
                    >
                        <BookOpen className="w-4 h-4" />
                        Learn
                        {activeTab === "learn" && (
                            <motion.div 
                                layoutId="activeTabSwitcher"
                                className="absolute inset-0 bg-orange-500 rounded-xl -z-10 shadow-lg shadow-orange-500/20"
                            />
                        )}
                    </button>
                </div>
              </div>

              {/* Navigation & Search Container */}
              <div className="px-6 py-4 space-y-4">
                {/* Search and Filters row */}
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex-1 min-w-[120px]">
                        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    </div>
                    
                    <div className="relative group">
                        <select 
                            value={difficulty || ""} 
                            onChange={(e) => setDifficulty(e.target.value || undefined)}
                            className="appearance-none flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-orange-500/30 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 transition-all focus:outline-none cursor-pointer pr-8"
                        >
                            <option value="" className="bg-white dark:bg-[#0d0d0d]">Difficulty</option>
                            <option value="EASY" className="bg-white dark:bg-[#0d0d0d]">Easy</option>
                            <option value="MEDIUM" className="bg-white dark:bg-[#0d0d0d]">Medium</option>
                            <option value="HARD" className="bg-white dark:bg-[#0d0d0d]">Hard</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
                    </div>

                    <div className="relative group">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-orange-500/30 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 transition-all focus:outline-none cursor-pointer pr-8"
                        >
                            <option value="newest" className="bg-white dark:bg-[#0d0d0d]">Newest</option>
                            <option value="oldest" className="bg-white dark:bg-[#0d0d0d]">Oldest</option>
                            <option value="title" className="bg-white dark:bg-[#0d0d0d]">Title</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
                    </div>

                    <button 
                        onClick={() => {
                            const res = getRandomProblem(domain, "PRACTICE");
                            res.then(p => {
                                if (p && (p as any).slug) window.location.href = `/problems/${(p as any).slug}${courseId ? `?courseId=${courseId}` : ""}`;
                            });
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 transition-all active:scale-95 shadow-sm hover:shadow-orange-500/20"
                    >
                         Random
                    </button>
                </div>

                {courseName && (
                  <div className="px-4 py-3 rounded-2xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 dark:border-orange-500/20 shadow-sm">
                    <p className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-0.5">Assigned Course</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{courseName}</p>
                  </div>
                )}
              </div>

                {/* Content area */}
              <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-hide">
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

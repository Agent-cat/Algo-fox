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
  solvedProblemIds
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
  }, [domain]); // Re-run when domain changes

  // Sync active tab if problem type changes
  useEffect(() => {
    if (problemType) {
        setActiveTab(problemType === "LEARN" ? "learn" : "problems");
    }
  }, [problemType]);

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
      const res = await getCategories(domain);
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
            className="absolute top-0 left-0 bottom-0 w-[420px] max-w-[90vw] z-50 shadow-2xl bg-[#fafafa] dark:bg-[#121212] border-r border-gray-200 dark:border-[#262626]"
          >
            <div className="flex flex-col h-full">
              {/* Tabs & Controls */}
              <div className="px-5 pt-5 pb-4 flex items-center gap-3">
                <div className="flex-1 flex p-1.5 gap-1.5 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200/50 dark:border-[#262626]">
                  <button
                    onClick={() => { setActiveTab("problems"); setSearchTerm(""); }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                      activeTab === "problems"
                        ? "bg-white dark:bg-[#2c2c2c] text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-[#2c2c2c]/50"
                    )}
                  >
                    <List className="w-4 h-4" />
                    Practice
                  </button>
                  <button
                    onClick={() => { setActiveTab("learn"); setSearchTerm(""); }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                      activeTab === "learn"
                        ? "bg-white dark:bg-[#2c2c2c] text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-[#2c2c2c]/50"
                    )}
                  >
                    <BookOpen className="w-4 h-4" />
                    Learn
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 shrink-0 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-all shadow-sm"
                  title="Close Sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-5 pb-4 border-b border-gray-100 dark:border-[#262626] sticky top-0 bg-[#fafafa] dark:bg-[#121212] z-10">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              </div>


              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
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
                   />
                ) : activeTab === "problems" ? (
                   <ProblemsList
                        problems={problems}
                        solvedSet={solvedSet}
                        currentProblemId={currentProblemId}
                        isLoading={isLoadingProblems}
                        hasMore={hasMore}
                        onLoadMore={() => loadProblems(page + 1)}
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
                   />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

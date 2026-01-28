"use client";

import { useState, useEffect, useCallback } from "react";
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
}

export default function ProblemSidebar({
  isOpen,
  onClose,
  currentProblemId,
  domain = "DSA",
  problemType,
  solvedProblemIds
}: ProblemSidebarProps) {
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
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

  // PREFETCH: Load both problems and categories on mount
  useEffect(() => {
    loadProblems(1);
    loadCategories();
  }, []); // Run once on mount

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
        setCategories(res.categories);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const toggleCategory = async (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      return;
    }

    setExpandedCategory(categoryId);

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
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 w-80 z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a]">
              {/* Header */}
              <div className="p-4 border-b border-dashed border-gray-200 dark:border-[#262626] flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex p-2 gap-2 border-b border-dashed border-gray-200 dark:border-[#262626]">
                <button
                  onClick={() => { setActiveTab("problems"); setSearchTerm(""); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "problems"
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-500/20"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                  )}
                >
                  <List className="w-4 h-4" />
                  Problems
                </button>
                <button
                  onClick={() => { setActiveTab("learn"); setSearchTerm(""); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === "learn"
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-500/20"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                  )}
                >
                  <BookOpen className="w-4 h-4" />
                  Learn
                </button>
              </div>

              {/* Search Bar */}
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />


              {/* Content */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                {searchTerm ? (
                   <ProblemsList
                        problems={searchResults}
                        solvedProblemIds={solvedProblemIds}
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
                        solvedProblemIds={solvedProblemIds}
                        currentProblemId={currentProblemId}
                        isLoading={isLoadingProblems}
                        hasMore={hasMore}
                        onLoadMore={() => loadProblems(page + 1)}
                   />
                ) : (
                   <CategoriesList
                        categories={categories}
                        loadingCategories={loadingCategories}
                        expandedCategory={expandedCategory}
                        categoryProblems={categoryProblems}
                        loadingCategoryProblems={loadingCategoryProblems}
                        solvedProblemIds={solvedProblemIds}
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

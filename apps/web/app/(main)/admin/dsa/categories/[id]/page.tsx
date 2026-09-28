"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCategoryById,
  getCategoryProblems,
  removeProblemFromCategory,
  createProblemAndAddToCategory,
} from "@/actions/category.action";
import { Plus, Trash2, ArrowLeft, BookText, ChevronLeft, Search, Loader2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { Difficulty } from "@prisma/client";
import ProblemForm from "@/components/admin/ProblemForm";
import ConceptForm from "@/components/admin/ConceptForm";

type ProblemWithStats = {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  type: any;
  acceptance: number;
  solved?: number | null;
  isSolved?: boolean;
};

import { Suspense } from "react";

type FormMode = "list" | "add-problem" | "add-concept";

function DsaCategoryProblemsContent() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string;

  const [category, setCategory] = useState<any>(null);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<FormMode>("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
      fetchProblems();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const res = await getCategoryById(categoryId);
      if (res.success) {
        setCategory(res.category);
      } else {
        toast.error(res.error || "Failed to load category");
      }
    } catch (error) {
       console.error("Failed to fetch category:", error);
      toast.error("Failed to load category");
    }
  };

  const fetchProblems = async () => {
    setIsLoading(true);
    try {
      const res = await getCategoryProblems(categoryId, 1, 100);
      setProblems(res.problems);
    } catch (error) {
       console.error("Failed to fetch problems:", error);
      toast.error("Failed to load problems");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProblem = async (data: any) => {
    const res = await createProblemAndAddToCategory(categoryId, data);
    if (res.success) {
      toast.success("Problem created and added to category");
      setMode("list");
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to create problem");
      throw new Error(res.error || "Failed to create problem");
    }
    return res;
  };

  const handleCreateConcept = async (data: any) => {
    const res = await createProblemAndAddToCategory(categoryId, data);
    if (res.success) {
      toast.success("Concept created and added to category");
      setMode("list");
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to create concept");
      throw new Error(res.error || "Failed to create concept");
    }
    return res;
  };

  const handleRemove = async (problemId: string) => {
    if (!confirm("Are you sure you want to remove this problem from the category?")) {
      return;
    }

    const res = await removeProblemFromCategory(categoryId, problemId);
    if (res.success) {
      toast.success("Problem removed from category");
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to remove problem");
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "MEDIUM":
        return "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
      case "HARD":
        return "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
      case "CONCEPT":
        return "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20";
      default:
        return "text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20";
    }
  };


  if (isLoading && !category) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // --- INLINE FORM VIEWS ---
  if (mode === "add-problem") {
    return (
      <div className="min-h-screen pt-16 pb-32">
        <div className="max-w-6xl mx-auto px-8 pt-10 pb-6 flex items-center gap-4">
          <button
            onClick={() => setMode("list")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {category?.name || "Category"}
          </button>
          <span className="text-gray-200 dark:text-gray-700">/</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Create Problem</span>
        </div>
        <div className="max-w-6xl mx-auto px-8 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Problem</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Adding to <span className="font-semibold text-orange-500">{category?.name}</span>
          </p>
        </div>
        <ProblemForm
          onSubmit={handleCreateProblem}
          submitLabel="Create & Add to Category"
          domain="DSA"
          redirectPath={undefined}
        />
      </div>
    );
  }

  if (mode === "add-concept") {
    return (
      <div className="min-h-screen pt-16 pb-32">
        <div className="max-w-6xl mx-auto px-8 pt-10 pb-6 flex items-center gap-4">
          <button
            onClick={() => setMode("list")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {category?.name || "Category"}
          </button>
          <span className="text-gray-200 dark:text-gray-700">/</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Create Concept</span>
        </div>
        <div className="max-w-6xl mx-auto px-8 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">New Concept</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Adding to <span className="font-semibold text-orange-500">{category?.name}</span>
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-8">
          <ConceptForm onSubmit={handleCreateConcept} />
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link
          href="/admin/dsa/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSA Categories
        </Link>

        <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                {category?.name || "Category Problems"}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative group w-full md:flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-10 bg-gray-50/50 hover:bg-gray-100/50 focus:bg-gray-50/50 dark:bg-[#111] dark:hover:bg-[#161616] dark:focus:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setMode("add-concept")}
                        className="flex items-center gap-2 h-10 px-5 bg-gray-100 dark:bg-[#1D1E23] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-900 dark:text-white font-semibold rounded-lg transition-all whitespace-nowrap text-[13px]"
                    >
                        <BookText className="w-4 h-4" />
                        Add Concept
                    </button>
                    <button
                        onClick={() => setMode("add-problem")}
                        className="flex items-center gap-2 h-10 px-5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg transition-all hover:opacity-90 active:scale-95 shadow-md whitespace-nowrap text-[13px]"
                    >
                        <Plus className="w-4 h-4" />
                        Add Problem
                    </button>
                </div>
            </div>
        </header>

        <div className="flex-1 bg-transparent dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#1e1e1e] bg-transparent dark:bg-[#1D1E23]/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    <Filter className="w-3 h-3" />
                    <span>Filter Results</span>
                </div>
                {searchQuery && (
                    <div className="text-xs font-medium text-orange-600 dark:text-orange-500">
                        Found {filteredProblems.length} matches
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4 min-h-[400px]">
                    <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-full">
                        <Loader2 className="w-6 h-6 text-orange-600 dark:text-orange-500 animate-spin" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading problems...</p>
                </div>
            ) : filteredProblems.length === 0 ? (
                <div className="p-20 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#1D1E23] rounded-2xl flex items-center justify-center mb-4 border border-gray-100 dark:border-[#262626]">
                        {searchQuery ? <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" /> : <Plus className="w-6 h-6 text-gray-300 dark:text-gray-600" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {searchQuery ? "No problems found" : "No problems yet"}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
                        {searchQuery ? `No results for "${searchQuery}"` : "Get started by adding a problem to this category."}
                    </p>
                    {searchQuery ? (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-sm text-orange-600 hover:text-orange-700 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    ) : (
                        <button
                            onClick={() => setMode("add-problem")}
                            className="inline-flex items-center gap-2 h-10 px-5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[13px] rounded-lg transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add First Problem
                        </button>
                    )}
                </div>
            ) : (
                <div className="w-full">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-[#1e1e1e] bg-transparent dark:bg-[#1D1E23]/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    Difficulty
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-[#1D1E23]">
                            <AnimatePresence mode="popLayout">
                                {filteredProblems.map((problem) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        key={problem.id}
                                        className="hover:bg-gray-100/50 dark:hover:bg-[#1D1E23]/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900 dark:text-white">{problem.title}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                                                {problem.slug}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getDifficultyColor(
                                                    problem.difficulty
                                                )}`}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/problems/${problem.id}/edit`}
                                                    className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#262626] hover:bg-gray-200 dark:hover:bg-[#333] hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleRemove(problem.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Remove from Category"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        {!isLoading && problems.length > 0 && (
            <div className="text-[11px] font-medium tracking-wide text-gray-400 dark:text-gray-500 text-right pr-4">
                Displaying {filteredProblems.length} / {problems.length} records
            </div>
        )}
      </div>
    </div>
  );
}

export default function DsaCategoryProblemsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <DsaCategoryProblemsContent />
    </Suspense>
  );
}


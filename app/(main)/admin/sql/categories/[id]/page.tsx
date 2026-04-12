"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCategoryById,
  getCategoryProblems,
  removeProblemFromCategory,
  createProblemAndAddToCategory,
} from "@/actions/category.action";
import { Plus, Trash2, ArrowLeft, BookText, ChevronLeft } from "lucide-react";
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

function SqlCategoryProblemsContent() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string;

  const [category, setCategory] = useState<any>(null);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<FormMode>("list");

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
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // --- INLINE FORM VIEWS ---
  if (mode === "add-problem") {
    return (
      <div className="min-h-screen pt-16 pb-32 bg-white dark:bg-[#121212]">
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
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">New SQL Problem</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Adding to <span className="font-semibold text-blue-500">{category?.name}</span>
          </p>
        </div>
        <ProblemForm
          onSubmit={handleCreateProblem}
          submitLabel="Create & Add to Category"
          domain="SQL"
          redirectPath={undefined}
        />
      </div>
    );
  }

  if (mode === "add-concept") {
    return (
      <div className="min-h-screen pt-16 pb-32 bg-white dark:bg-[#121212]">
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
            Adding to <span className="font-semibold text-blue-500">{category?.name}</span>
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
    <div className="min-h-screen pt-24 pb-12 px-6 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/sql/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to SQL Categories
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              {category?.name || "Category Problems"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {category?.description || "Manage problems in this category"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setMode("add-concept")}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-semibold rounded-xl transition-all border border-indigo-200 dark:border-indigo-500/20"
            >
              <BookText className="w-4 h-4" />
              Add Concept
            </button>
            <button
              onClick={() => setMode("add-problem")}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              <Plus className="w-4 h-4" />
              Add Problem
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-500"></div>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading problems...</p>
            </div>
          ) : problems.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-100 dark:border-[#262626]">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">No problems yet</h3>
              <p className="mb-6 text-gray-500 dark:text-gray-400 text-sm">Get started by adding a problem to this category.</p>
              <button
                onClick={() => setMode("add-problem")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add First Problem
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#262626]">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Title
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#262626]">
                  {problems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a] transition-colors group"
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
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SqlCategoryProblemsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <SqlCategoryProblemsContent />
    </Suspense>
  );
}


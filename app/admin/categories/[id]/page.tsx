"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCategory,
  getCategoryProblems,
  removeProblemFromCategory,
} from "@/actions/category.action";
import { getProblems } from "@/actions/problems";
import { Plus, Trash2, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Difficulty, Problem } from "@prisma/client";

type ProblemWithStats = Problem & { acceptance: number; isSolved?: boolean };

export default function CategoryProblemsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<any>(null);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [availableProblems, setAvailableProblems] = useState<ProblemWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAvailable, setIsLoadingAvailable] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategory();
    fetchProblems();
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const { getCategoryById } = await import("@/actions/category.action");
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

  const fetchAvailableProblems = async () => {
    setIsLoadingAvailable(true);
    try {
      const res = await getProblems(1, 100, "LEARN");
      // Filter out problems already in category
      const inCategory = new Set(problems.map((p) => p.id));
      const available = res.problems.filter((p) => !inCategory.has(p.id));
      setAvailableProblems(available);
    } catch (error) {
      console.error("Failed to fetch available problems:", error);
      toast.error("Failed to load available problems");
    } finally {
      setIsLoadingAvailable(false);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
    fetchAvailableProblems();
  };

  const handleAddProblem = async (problemId: string) => {
    const { addProblemToCategory } = await import("@/actions/category.action");
    const res = await addProblemToCategory(categoryId, problemId);
    if (res.success) {
      toast.success("Problem added to category");
      fetchProblems();
      fetchAvailableProblems();
    } else {
      toast.error(res.error || "Failed to add problem");
    }
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
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "MEDIUM":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "HARD":
        return "text-rose-700 bg-rose-50 border-rose-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const filteredAvailable = availableProblems.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && !category) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto ml-0">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category?.name || "Category Problems"}
            </h1>
            <p className="text-gray-500">
              {category?.description || "Manage problems in this category"}
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-200"
          >
            <Plus className="w-5 h-5" />
            Add Problem
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : problems.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="mb-4">No problems in this category yet.</p>
              <button
                onClick={handleAddClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                Add First Problem
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {problems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{problem.title}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">
                          {problem.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(
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
                            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit Problem"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleRemove(problem.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Add Problem Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add Problem to Category</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {isLoadingAvailable ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              ) : filteredAvailable.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? "No problems found matching your search."
                    : "No available problems. Create new problems first."}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailable.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{problem.title}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">
                          {problem.slug}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddProblem(problem.id)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import {
  getCourseAllocations,
  updateYearAllocations,
} from "@/actions/courseAllocation.action";
import { ProblemDomain } from "@prisma/client";
import { toast } from "sonner";

interface Allocation {
  id: string;
  year: number;
  domain: ProblemDomain;
}

export default function CourseAllocationPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State for year selections
  const [yearAllocations, setYearAllocations] = useState<{
    [year: number]: ProblemDomain[];
  }>({});

  const availableDomains: ProblemDomain[] = ["DSA", "SQL"];
  const years = [1, 2, 3, 4, 5];

  useEffect(() => {
    loadAllocations();
  }, []);

  async function loadAllocations() {
    setLoading(true);
    const result = await getCourseAllocations();
    if (result.success && result.allocations) {
      setAllocations(result.allocations);

      // Build year allocations map
      const yearMap: { [year: number]: ProblemDomain[] } = {};
      years.forEach((year) => {
        yearMap[year] = result.allocations!
          .filter((a) => a.year === year)
          .map((a) => a.domain);
      });
      setYearAllocations(yearMap);
    }
    setLoading(false);
  }

  const toggleDomain = (year: number, domain: ProblemDomain) => {
    setYearAllocations((prev) => {
      const current = prev[year] || [];
      const updated = current.includes(domain)
        ? current.filter((d) => d !== domain)
        : [...current, domain];
      return { ...prev, [year]: updated };
    });
  };

  const saveAllocations = async (year: number) => {
    setSaving(true);
    const domains = yearAllocations[year] || [];
    const result = await updateYearAllocations(year, domains);
    if (result.success) {
      toast.success(`Year ${year} allocations updated successfully`);
      await loadAllocations(); // Reload to sync
    } else {
      toast.error(result.error || "Failed to update allocations");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading allocations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Allocation Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Allocate courses to different academic years. Students will only see courses allocated to their year.
          </p>
        </div>

        <div className="space-y-6">
          {years.map((year) => (
            <div
              key={year}
              className="bg-white dark:bg-[#141414] rounded-lg shadow-sm border border-gray-200 dark:border-[#262626] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Year {year}
                </h2>
                <button
                  onClick={() => saveAllocations(year)}
                  disabled={saving}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableDomains.map((domain) => {
                  const isSelected = (yearAllocations[year] || []).includes(
                    domain
                  );
                  return (
                    <button
                      key={domain}
                      onClick={() => toggleDomain(year, domain)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                          : "border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#444]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {domain}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4">
          <div className="flex">
            <svg
              className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Note:</strong> Students will only see courses allocated to their academic year.
                Admins, teachers, institution managers, and contest managers can view all courses regardless of allocations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

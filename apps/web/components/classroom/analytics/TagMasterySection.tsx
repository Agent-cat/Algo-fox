"use client";

import React from 'react';
import { TagMasteryItem } from '@algofox/types';
import { EmptyState } from "@algofox/ui";

interface TagMasterySectionProps {
  data: { tags: TagMasteryItem[] } | null;
  isLoading: boolean;
}

export function TagMasterySection({ data, isLoading }: TagMasterySectionProps) {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 w-full bg-gray-100 dark:bg-[#1D1E23] rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || !data.tags || data.tags.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Tag Mastery Breakdown
        </h3>
        <EmptyState title="No Tag Data" description="No tag submissions have been recorded for problems assigned to this classroom." />
      </div>
    );
  }

  const badgeStyles = {
    Struggling: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
    Developing: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
    Proficient: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
  };

  const progressColors = {
    Struggling: 'bg-rose-500',
    Developing: 'bg-amber-500',
    Proficient: 'bg-emerald-500',
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Tag Mastery Breakdown
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Classroom average score per problem tag (weakest tags prioritized)
          </p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {data.tags.length} Tags Evaluated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.tags.map((tag) => (
          <div
            key={tag.tagId}
            className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/40 dark:bg-[#191A1F]/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {tag.tagName}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {tag.averageMastery}%
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[tag.label]}`}
                >
                  {tag.label}
                </span>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${progressColors[tag.label]}`}
                style={{ width: `${Math.min(100, Math.max(0, tag.averageMastery))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { DifficultyData } from '@algofox/types';
import { EmptyState } from "@algofox/ui";

interface DifficultyAnalysisProps {
  data: DifficultyData | null;
  isLoading: boolean;
}

export function DifficultyAnalysis({ data, isLoading }: DifficultyAnalysisProps) {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-48 bg-gray-100 dark:bg-[#1D1E23] rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Accuracy by Problem Difficulty
        </h3>
        <EmptyState
          title="No Difficulty Data"
          description="No difficulty statistics available for the assigned problems."
        />
      </div>
    );
  }

  const formatAccuracy = (val: number | null) => {
    if (val === null) return 'N/A';
    return `${val}%`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Accuracy by Problem Difficulty
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Classroom submit-mode accuracy across Easy, Medium, and Hard problems
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1A1B20] border-b border-gray-200 dark:border-gray-800">
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Tag Name</th>
              <th className="p-3 font-semibold text-emerald-600 dark:text-emerald-400 text-center">
                Easy Accuracy
              </th>
              <th className="p-3 font-semibold text-amber-600 dark:text-amber-400 text-center">
                Medium Accuracy
              </th>
              <th className="p-3 font-semibold text-rose-600 dark:text-rose-400 text-center">
                Hard Accuracy
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {data.items.map((item) => (
              <tr key={item.tagId} className="hover:bg-gray-50/50 dark:hover:bg-[#18191E]/50">
                <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                  {item.tagName}
                </td>
                <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">
                  {formatAccuracy(item.easy)}
                </td>
                <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">
                  {formatAccuracy(item.medium)}
                </td>
                <td className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">
                  {formatAccuracy(item.hard)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

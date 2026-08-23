"use client";

import React from 'react';
import { HeatmapData } from '@/lib/analytics/types';
import { EmptyState } from './shared/EmptyState';

interface StudentHeatmapProps {
  data: HeatmapData | null;
  isLoading: boolean;
}

export function getHeatmapCellColor(
  score: number,
  attempts: number
): 'red' | 'amber' | 'green' | 'gray' {
  if (attempts === 0) return 'gray';
  if (score < 40) return 'red';
  if (score < 70) return 'amber';
  return 'green';
}

export function StudentHeatmap({ data, isLoading }: StudentHeatmapProps) {
  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 dark:bg-[#1D1E23] rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!data || !data.students || data.students.length === 0 || !data.tags || data.tags.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Student × Tag Performance Matrix
        </h3>
        <EmptyState
          title="No Heatmap Data"
          description="Insufficient student or tag data available to render the performance matrix."
        />
      </div>
    );
  }

  const colorClasses = {
    gray: 'bg-gray-100 dark:bg-gray-800/60 text-gray-400',
    red: 'bg-rose-500 text-white font-semibold',
    amber: 'bg-amber-400 text-gray-900 font-semibold',
    green: 'bg-emerald-500 text-white font-semibold',
  };

  // Build cell lookup map for O(1) cell retrieval
  const cellMap = new Map<string, { score: number; attempts: number; accepted: number; color: string }>();
  data.cells.forEach((cell) => {
    cellMap.set(`${cell.studentId}:${cell.tagId}`, cell);
  });

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Student × Tag Performance Matrix
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Individual student mastery scores per tag
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-gray-600 dark:text-gray-400">≥70%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-400" />
            <span className="text-gray-600 dark:text-gray-400">40–69%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-rose-500" />
            <span className="text-gray-600 dark:text-gray-400">&lt;40%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700" />
            <span className="text-gray-600 dark:text-gray-400">No Attempts</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1A1B20] border-b border-gray-200 dark:border-gray-800">
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-[#1A1B20] z-10 min-w-[140px] shadow-xs">
                Student Name
              </th>
              {data.tags.map((tag) => (
                <th
                  key={tag.id}
                  className="p-3 font-semibold text-gray-700 dark:text-gray-300 text-center min-w-[100px]"
                >
                  {tag.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {data.students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-[#18191E]/50">
                <td className="p-3 font-medium text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-[#15161A] z-10 border-r border-gray-100 dark:border-gray-800/60 shadow-xs">
                  {student.name}
                </td>
                {data.tags.map((tag) => {
                  const cell = cellMap.get(`${student.id}:${tag.id}`);
                  const score = cell ? cell.score : 0;
                  const attempts = cell ? cell.attempts : 0;
                  const accepted = cell ? cell.accepted : 0;
                  const color = getHeatmapCellColor(score, attempts);

                  const tooltipText = `${student.name} | ${tag.name} | Score: ${score}% | Attempts: ${attempts} | Accepted: ${accepted}`;

                  return (
                    <td key={tag.id} className="p-1.5 text-center">
                      <div
                        title={tooltipText}
                        className={`w-full py-1.5 px-2 rounded-lg flex items-center justify-center text-[11px] cursor-default transition-transform hover:scale-105 ${colorClasses[color]}`}
                      >
                        {attempts > 0 ? `${score}%` : '–'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

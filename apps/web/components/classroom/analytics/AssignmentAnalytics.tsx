"use client";

import React, { useState } from 'react';
import { AssignmentAnalyticsData, AssignmentTagData } from '@algofox/types';
import { getAssignmentTagBreakdown } from '@/actions/classroom-analytics';
import { EmptyState } from "@algofox/ui";

interface AssignmentAnalyticsProps {
  data: AssignmentAnalyticsData | null;
  classroomId: string;
  isLoading: boolean;
}

export function AssignmentAnalytics({ data, classroomId, isLoading }: AssignmentAnalyticsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tagBreakdown, setTagBreakdown] = useState<Record<string, AssignmentTagData | null>>({});
  const [loadingBreakdown, setLoadingBreakdown] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-100 dark:bg-[#1D1E23] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || !data.assignments || data.assignments.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Assignment Completion & Tag Breakdown
        </h3>
        <EmptyState
          title="No Assignments Found"
          description="There are currently no assignments created in this classroom."
        />
      </div>
    );
  }

  const toggleExpand = async (assignmentId: string) => {
    if (expandedId === assignmentId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(assignmentId);

    if (!tagBreakdown[assignmentId] && !loadingBreakdown[assignmentId]) {
      setLoadingBreakdown((prev) => ({ ...prev, [assignmentId]: true }));
      const res = await getAssignmentTagBreakdown(classroomId, assignmentId);
      if ('success' in res && res.success) {
        setTagBreakdown((prev) => ({ ...prev, [assignmentId]: res }));
      }
      setLoadingBreakdown((prev) => ({ ...prev, [assignmentId]: false }));
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Assignment Completion & Tag Breakdown
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Track submission status counts and view tag-wise performance on expansion
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {data.assignments.map((assignment) => {
          const isExpanded = expandedId === assignment.assignmentId;
          const breakdown = tagBreakdown[assignment.assignmentId];
          const isTagLoading = loadingBreakdown[assignment.assignmentId];

          return (
            <div
              key={assignment.assignmentId}
              className="rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/30 dark:bg-[#18191E]/30 overflow-hidden"
            >
              <div
                onClick={() => toggleExpand(assignment.assignmentId)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-[#1A1B22]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {assignment.title}
                    </h4>
                    {assignment.dueDate && (
                      <span className="text-[11px] text-gray-400">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium">
                      Completed: {assignment.completed}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-medium">
                      In Progress: {assignment.inProgress}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                      Not Started: {assignment.notStarted}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-medium">
                      Overdue: {assignment.overdue}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-32">
                    <div className="flex justify-between text-[11px] font-medium text-gray-500 mb-1">
                      <span>Completion</span>
                      <span>{assignment.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${assignment.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-bold">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 bg-white dark:bg-[#15161A] border-t border-gray-200 dark:border-gray-800">
                  <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Per-Tag Accuracy Breakdown
                  </h5>
                  {isTagLoading ? (
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
                  ) : breakdown && breakdown.tagAccuracy && breakdown.tagAccuracy.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {breakdown.tagAccuracy.map((t, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#18191E]/50"
                        >
                          <span className="text-xs text-gray-500 block truncate">{t.tagName}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-1 block">
                            {t.accuracy}%
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No problem tags assigned to this assignment.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

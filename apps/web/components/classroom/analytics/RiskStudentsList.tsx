"use client";

import React from 'react';
import { RiskData, AtRiskStudent } from '@algofox/types';
import { EmptyState } from "@algofox/ui";

interface RiskStudentsListProps {
  data: RiskData | null;
  isLoading: boolean;
}

export function filterAndSortAtRisk(students: AtRiskStudent[]): AtRiskStudent[] {
  return students
    .filter((s) => s.riskScore >= 60)
    .sort((a, b) => b.riskScore - a.riskScore);
}

export function RiskStudentsList({ data, isLoading }: RiskStudentsListProps) {
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

  if (!data || data.allClear || !data.atRiskStudents || data.atRiskStudents.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          At-Risk Students
        </h3>
        <EmptyState
          title="All Students Performing Well 🎉"
          description="No students currently exceed the risk threshold (Risk Score ≥ 60)."
        />
      </div>
    );
  }

  const sortedAtRisk = filterAndSortAtRisk(data.atRiskStudents);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            At-Risk Students ({sortedAtRisk.length})
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Students requiring attention based on mastery, activity, assignments, and accuracy trends
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedAtRisk.map((student) => (
          <div
            key={student.studentId}
            className="p-4 rounded-xl border border-rose-100 dark:border-rose-950/50 bg-rose-50/30 dark:bg-rose-950/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm shrink-0">
                {student.image ? (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  student.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {student.name}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {student.topFactors.map((factor, idx) => {
                    let badgeStyle = 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
                    if (factor.contribution >= 10) {
                      badgeStyle = 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300';
                    } else if (factor.contribution >= 5) {
                      badgeStyle = 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300';
                    }
                    return (
                      <span
                        key={idx}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${badgeStyle}`}
                      >
                        {factor.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Risk Score:</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400 px-3 py-1 bg-rose-100 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800/60">
                {student.riskScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { ContestAnalyticsData } from '@algofox/types';
import { EmptyState } from "@algofox/ui";

interface ContestAnalyticsProps {
  data: ContestAnalyticsData | null;
  isLoading: boolean;
}

export function ContestAnalytics({ data, isLoading }: ContestAnalyticsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-100 dark:bg-[#1D1E23] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || !data.contests || data.contests.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Contest Performance & Leaderboards
        </h3>
        <EmptyState
          title="No Contests Found"
          description="There are currently no contests associated with this classroom."
        />
      </div>
    );
  }

  const toggleExpand = (contestId: string) => {
    setExpandedId((prev) => (prev === contestId ? null : contestId));
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Contest Performance & Leaderboards
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Participation status, contest scores, and practice accuracy comparisons
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {data.contests.map((contest) => {
          const isExpanded = expandedId === contest.contestId;

          return (
            <div
              key={contest.contestId}
              className="rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/30 dark:bg-[#18191E]/30 overflow-hidden"
            >
              <div
                onClick={() => toggleExpand(contest.contestId)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-[#1A1B22]/50 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {contest.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>Participants: {contest.totalParticipants}</span>
                    <span>Classroom Avg Score: {contest.averageScore} pts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                    {contest.totalParticipants} Joined
                  </span>
                  <span className="text-xs text-gray-400 font-bold">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 bg-white dark:bg-[#15161A] border-t border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-[#1A1B20] border-b border-gray-200 dark:border-gray-800">
                        <th className="p-2.5 font-semibold text-gray-700 dark:text-gray-300">
                          Student Name
                        </th>
                        <th className="p-2.5 font-semibold text-gray-700 dark:text-gray-300 text-center">
                          Status
                        </th>
                        <th className="p-2.5 font-semibold text-gray-700 dark:text-gray-300 text-center">
                          Score
                        </th>
                        <th className="p-2.5 font-semibold text-gray-700 dark:text-gray-300 text-center">
                          Rank
                        </th>
                        <th className="p-2.5 font-semibold text-gray-700 dark:text-gray-300 text-center">
                          Practice Accuracy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                      {contest.students.map((student) => (
                        <tr key={student.studentId} className="hover:bg-gray-50/50 dark:hover:bg-[#18191E]/50">
                          <td className="p-2.5 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {student.image ? (
                              <img src={student.image} alt={student.name} className="w-5 h-5 rounded-full" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-[10px] flex items-center justify-center font-bold">
                                {student.name.charAt(0)}
                              </div>
                            )}
                            {student.name}
                          </td>
                          <td className="p-2.5 text-center">
                            {student.participated ? (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                Participated
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                Not Participated
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-center font-semibold text-gray-900 dark:text-gray-100">
                            {student.participated ? student.score : '–'}
                          </td>
                          <td className="p-2.5 text-center font-semibold text-gray-700 dark:text-gray-300">
                            {student.rank !== null ? `#${student.rank}` : '–'}
                          </td>
                          <td className="p-2.5 text-center text-gray-600 dark:text-gray-400">
                            {student.practiceAccuracy}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

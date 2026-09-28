"use client";

import React from 'react';

interface OverviewPanelProps {
  data: {
    studentCount: number;
    totalProblemsSolved: number;
    overallAccuracy: number;
    averageMasteryScore: number;
    atRiskCount: number;
  } | null;
  isLoading: boolean;
}

export function OverviewPanel({ data, isLoading }: OverviewPanelProps) {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-gray-100 dark:bg-[#1D1E23] animate-pulse p-4 flex flex-col justify-between border border-gray-200/50 dark:border-gray-800/50"
          >
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Students',
      value: data.studentCount,
      subtext: 'Enrolled in classroom',
      color: 'text-blue-500',
    },
    {
      label: 'Problems Solved',
      value: data.totalProblemsSolved,
      subtext: 'Distinct solved problems',
      color: 'text-emerald-500',
    },
    {
      label: 'Overall Accuracy',
      value: `${data.overallAccuracy}%`,
      subtext: 'Submit-mode accuracy',
      color: 'text-purple-500',
    },
    {
      label: 'Avg Tag Mastery',
      value: `${data.averageMasteryScore}%`,
      subtext: 'Across all tags',
      color: 'text-amber-500',
    },
    {
      label: 'At-Risk Students',
      value: data.atRiskCount,
      subtext: 'Risk score ≥ 60',
      color: data.atRiskCount > 0 ? 'text-rose-500' : 'text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl bg-white dark:bg-[#15161A] border border-gray-200/60 dark:border-gray-800/60 shadow-xs flex flex-col justify-between"
        >
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {card.label}
          </span>
          <div className="my-2">
            <span className={`text-2xl font-bold tracking-tight ${card.color}`}>
              {card.value}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {card.subtext}
          </span>
        </div>
      ))}
    </div>
  );
}

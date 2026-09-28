"use client";

import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'overview' | 'section' | 'table';
}

export function SkeletonLoader({ variant = 'section' }: SkeletonLoaderProps) {
  if (variant === 'overview') {
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

  if (variant === 'table') {
    return (
      <div className="w-full space-y-3 p-4 border border-gray-200/50 dark:border-gray-800/50 rounded-xl bg-gray-50/50 dark:bg-[#15161A]/50">
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-full bg-gray-100 dark:bg-[#1D1E23] rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-2xl bg-gray-100 dark:bg-[#1D1E23] animate-pulse border border-gray-200/50 dark:border-gray-800/50 p-6 flex flex-col justify-between">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    </div>
  );
}

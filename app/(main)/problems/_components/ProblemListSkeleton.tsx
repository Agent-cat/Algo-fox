"use client";

import React from "react";

export default function ProblemListSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-8">
      <div className="w-full px-6 lg:px-12">

        {/* Page Header Skeleton — matches DsaProblemsClient h1 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-40 bg-gray-200 dark:bg-[#2a2a2a] rounded-md animate-pulse" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#2a2a2a] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Header Tools Skeleton — matches SearchBar + ModeToggle row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="h-10 w-full md:flex-1 bg-gray-200 dark:bg-[#2a2a2a] rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 dark:bg-[#2a2a2a] rounded-xl animate-pulse flex-shrink-0" />
        </div>

        {/* Content Card Skeleton */}
        <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden">

          {/* Filter Bar + Solved Counter row */}
          <div className="px-5 pt-4 pb-2 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2">
              {[80, 96, 72, 88, 64].map((w, i) => (
                <div
                  key={i}
                  className="h-8 rounded-full bg-gray-200 dark:bg-[#2a2a2a] animate-pulse"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
            {/* Solved progress pill */}
            <div className="flex items-center gap-2 pl-1 pr-2 flex-shrink-0 self-start xl:self-auto">
              <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-[#2a2a2a] animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-[#2a2a2a] rounded-md animate-pulse" />
            </div>
          </div>

          {/* Table Header — matches grid-cols-12 of ProblemRow */}
          <div className="bg-[#FDFDFD] dark:bg-[#222328] border border-gray-200 dark:border-white/10 rounded-xl mx-[3.5px] mb-3">
            <div className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-3.5">
              <div className="col-span-6 md:col-span-5 h-3 w-8 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse" />
              <div className="col-span-2 md:col-span-2 h-3 w-14 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse" />
              <div className="col-span-2 md:col-span-2 h-3 w-16 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse ml-auto" />
              <div className="col-span-2 md:col-span-3 h-3 w-14 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse mx-auto" />
            </div>
          </div>

          {/* Problem Rows Skeleton — 10 rows matching PROBLEMS_PAGE_SIZE */}
          <div className="mt-1 divide-y divide-gray-50 dark:divide-[#1D1E23]">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 gap-4 md:gap-8 px-6 py-[13px] w-[calc(100%-7px)] mx-auto rounded-xl items-center border border-transparent ${
                  i % 2 !== 0 ? "bg-gray-100/60 dark:bg-[#282a30]" : "bg-transparent"
                }`}
              >
                {/* Title col */}
                <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-[#333] flex-shrink-0" />
                  <div
                    className="h-4 bg-gray-200 dark:bg-[#2a2a2a] rounded-md animate-pulse"
                    style={{ width: `${55 + ((i * 37) % 45)}%` }}
                  />
                </div>
                {/* Difficulty col */}
                <div className="col-span-2 md:col-span-2 flex justify-start md:justify-center">
                  <div className="h-3.5 w-10 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse" />
                </div>
                {/* Acceptance col */}
                <div className="col-span-2 md:col-span-2 flex justify-start md:justify-end">
                  <div className="h-3.5 w-12 bg-gray-200 dark:bg-[#2a2a2a] rounded animate-pulse" />
                </div>
                {/* Company col */}
                <div className="col-span-2 md:col-span-3 flex justify-start md:justify-center gap-1">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#2a2a2a] animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="flex items-center justify-center gap-2 py-8">
            <div className="h-9 w-16 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg animate-pulse" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-9 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg animate-pulse" />
            ))}
            <div className="h-9 w-16 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function ProblemListSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 dark:bg-[#262626] rounded-md animate-pulse mb-1" />
        </div>

        {/* HEADER TOOLS Skeleton */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="h-10 w-full md:flex-1 bg-gray-200 dark:bg-[#262626] rounded-xl animate-pulse" />
          <div className="h-10 w-48 bg-gray-200 dark:bg-[#262626] rounded-xl animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden">
          <div className="px-5 pt-4 pb-2">
            <div className="flex gap-3 mb-4">
               {/* Filter Pills Skeleton */}
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-[#262626] rounded-full animate-pulse" />
               ))}
            </div>
          </div>
          
          <div className="px-5 pb-6 space-y-3">
             {/* Problem Rows Skeleton */}
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-16 w-full bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-xl flex items-center justify-between px-4 animate-pulse">
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-md bg-gray-200 dark:bg-[#333]" />
                      <div className="h-5 w-48 bg-gray-200 dark:bg-[#333] rounded-md" />
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="h-5 w-16 bg-gray-200 dark:bg-[#333] rounded-md" />
                      <div className="h-5 w-16 bg-gray-200 dark:bg-[#333] rounded-md hidden sm:block" />
                      <div className="h-5 w-16 bg-gray-200 dark:bg-[#333] rounded-md hidden md:block" />
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

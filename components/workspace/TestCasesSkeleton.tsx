"use client";

import React from "react";

export default function TestCasesSkeleton() {
  return (
    <div className="w-full h-full bg-[#fafafa] dark:bg-[#1e1e1e] rounded-sm border border-gray-200 dark:border-[#262626] flex flex-col animate-pulse">
      {/* Header */}
      <div className="h-10 border-b border-gray-200 dark:border-[#262626] flex items-center px-4 gap-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-20 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-24 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden p-4 flex gap-6">
        {/* Test Case Pills */}
        <div className="w-28 flex flex-col gap-2 shrink-0">
          <div className="w-full h-8 bg-gray-200 dark:bg-[#333333] rounded-md"></div>
          <div className="w-full h-8 bg-gray-200 dark:bg-[#333333] rounded-md"></div>
          <div className="w-full h-8 bg-gray-200 dark:bg-[#333333] rounded-md"></div>
        </div>
        {/* Test Case Details */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="w-20 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
            <div className="w-full h-12 bg-white dark:bg-[#262626] rounded-md border border-gray-200 dark:border-transparent"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-20 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
            <div className="w-full h-12 bg-white dark:bg-[#262626] rounded-md border border-gray-200 dark:border-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

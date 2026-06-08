"use client";

import React from "react";

export default function ProblemSkeleton() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1e1e1e] rounded-sm border border-gray-200 dark:border-[#262626] flex flex-col animate-pulse">
      {/* Tabs */}
      <div className="h-10 border-b border-gray-200 dark:border-[#262626] flex items-center px-4 gap-6 shrink-0">
        <div className="w-20 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        <div className="w-20 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        <div className="w-24 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-3/4 h-8 bg-gray-200 dark:bg-[#333333] rounded-md"></div>
        </div>
        {/* Meta Tags */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-16 h-6 bg-gray-200 dark:bg-[#333333] rounded-full"></div>
          <div className="w-16 h-6 bg-gray-200 dark:bg-[#333333] rounded-full"></div>
        </div>
        
        {/* Paragraphs */}
        <div className="space-y-3">
          <div className="w-full h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-full h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-5/6 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="w-full h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-4/5 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>

        {/* Code Block Example */}
        <div className="w-full h-32 bg-gray-100 dark:bg-[#262626] rounded-md mt-4"></div>
      </div>
    </div>
  );
}

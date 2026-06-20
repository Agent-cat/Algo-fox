"use client";

import React from "react";

export default function EditorSkeleton() {
  return (
    <div className="w-full h-full bg-[#fafafa] dark:bg-[#1D1E23] rounded-sm border border-gray-200 dark:border-[#262626] flex flex-col animate-pulse">
      {/* Header */}
      <div className="h-10 border-b border-gray-200 dark:border-[#262626] flex items-center px-4 justify-between bg-[#fafafa] dark:bg-[#1D1E23] shrink-0">
        <div className="w-24 h-6 bg-gray-200 dark:bg-[#3d3d3d] rounded-md"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-[#3d3d3d] rounded-md"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-[#3d3d3d] rounded-md"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-[#3d3d3d] rounded-md"></div>
        </div>
      </div>
      {/* Editor Area */}
      <div className="flex-1 p-4 flex gap-4 bg-[#fafafa] dark:bg-[#1D1E23] overflow-hidden">
        {/* Line Numbers */}
        <div className="w-6 flex flex-col items-end gap-3 border-r border-transparent pr-2 opacity-50 shrink-0">
          <div className="w-3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>
        {/* Code Blocks */}
        <div className="flex-1 flex flex-col gap-3 pt-1">
          <div className="w-1/3 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
          <div className="w-1/2 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm ml-8"></div>
          <div className="w-1/4 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm ml-16"></div>
          <div className="w-1/4 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm ml-8"></div>
          <div className="w-1/5 h-4 bg-gray-200 dark:bg-[#333333] rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

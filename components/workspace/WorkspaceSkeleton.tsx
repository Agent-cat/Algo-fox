"use client";

import React from "react";


export default function WorkspaceSkeleton() {
  return (
    <div className="h-screen w-full bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col overflow-hidden animate-fadeIn">
      {/* Header Skeleton */}
      <div className="h-14 border-b border-gray-300 dark:border-[#262626] flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#1e1e1e]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 dark:bg-[#333333] rounded-md animate-pulse"></div>
          <div className="w-32 h-6 bg-gray-200 dark:bg-[#333333] rounded-md animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-8 bg-gray-200 dark:bg-[#333333] rounded-md animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-200 dark:bg-[#333333] rounded-md animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-[#333333] rounded-full ml-4 animate-pulse"></div>
        </div>
      </div>

      {/* 3-Pane Layout Skeleton */}
      <div className="flex-1 flex flex-row min-h-0 bg-[#f0f0f0] dark:bg-[#1D1E23] overflow-hidden p-1 gap-1">
        
        {/* Left Pane: Problem Description */}
        <div className="w-[40%] h-full flex flex-col">
          {/* Will be replaced by panel skeleton */}
        </div>

        {/* Right Pane: Split Vertical */}
        <div className="w-[60%] h-full flex flex-col gap-1">
          {/* Top Right: Code Editor */}
          <div className="h-[60%] flex flex-col">
            {/* Will be replaced by panel skeleton */}
          </div>

          {/* Bottom Right: Test Cases */}
          <div className="h-[40%] flex flex-col">
            {/* Will be replaced by panel skeleton */}
          </div>
        </div>

      </div>
    </div>
  );
}

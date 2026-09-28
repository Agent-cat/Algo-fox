"use client";

import React from "react";


export default function WorkspaceSkeleton() {
  return (
    <div className="h-screen w-full bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col overflow-hidden animate-fadeIn">
      {/* Header Skeleton */}
      <div className="h-14 bg-[#fafafa] dark:bg-[#1D1E23] border-b border-dashed border-gray-300/80 dark:border-white/10 flex items-center justify-between px-4 shrink-0 z-50 relative">
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
      <div className="flex-1 flex flex-row min-h-0 bg-[#f0f0f0] dark:bg-[#1D1E23] overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-[40%] h-full flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] border-r border-dashed border-gray-300 dark:border-white/10">
          <div className="h-12 border-b border-dashed border-gray-300 dark:border-white/10 flex items-center px-4">
            <div className="w-24 h-6 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="w-3/4 h-8 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
            <div className="space-y-2 mt-4">
              <div className="w-full h-4 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
              <div className="w-4/6 h-4 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Pane: Split Vertical */}
        <div className="w-[60%] h-full flex flex-col border-l border-dashed border-gray-400 dark:border-white/10 ml-2">
          {/* Top Right: Code Editor */}
          <div className="h-[60%] flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] border-b border-dashed border-gray-300 dark:border-white/10">
            <div className="h-10 border-b border-dashed border-gray-300 dark:border-white/10 flex items-center px-4">
               <div className="w-20 h-6 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
            </div>
            <div className="p-6 space-y-3">
              <div className="w-1/3 h-4 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-200 dark:bg-[#333333] rounded ml-4 animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-200 dark:bg-[#333333] rounded ml-4 animate-pulse"></div>
            </div>
          </div>

          {/* Bottom Right: Test Cases */}
          <div className="h-[40%] flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] mt-2">
            <div className="h-10 border-b border-dashed border-gray-300 dark:border-white/10 flex items-center px-4">
               <div className="w-24 h-6 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
            </div>
            <div className="p-4 flex gap-2">
               <div className="w-16 h-8 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
               <div className="w-16 h-8 bg-gray-200 dark:bg-[#333333] rounded animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

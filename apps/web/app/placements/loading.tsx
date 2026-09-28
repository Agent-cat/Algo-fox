import React from "react";

export default function PlacementsLoading() {
    return (
        <div className="flex flex-col w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)] h-[calc(100vh-4rem)] -m-8 lg:-m-12 bg-[#fafafa] dark:bg-[#1D1E23]">
            {/* Top Toolbar Skeleton */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:px-6 border-b border-gray-200 dark:border-[#262626] shrink-0 bg-[#fafafa] dark:bg-[#1D1E23]">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Search Bar Skeleton */}
                    <div className="w-full sm:w-64 h-9 bg-gray-200 dark:bg-[#2c2d33] rounded-lg animate-pulse" />
                    {/* Position Type Filter Skeleton */}
                    <div className="w-32 h-9 bg-gray-200 dark:bg-[#2c2d33] rounded-lg animate-pulse" />
                    {/* Status Filter Skeleton */}
                    <div className="w-32 h-9 bg-gray-200 dark:bg-[#2c2d33] rounded-lg animate-pulse" />
                </div>
                {/* Slider Toggle Skeleton */}
                <div className="w-48 h-9 bg-gray-200 dark:bg-[#2c2d33] rounded-full animate-pulse" />
            </div>

            {/* Content Area - Split Pane Skeleton */}
            <div className="flex-1 flex min-h-0 w-full">
                {/* Left Panel - Job List Skeleton */}
                <div className="w-[35%] h-full border-r border-gray-200 dark:border-[#262626] flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] overflow-hidden">
                    {/* Tabs Skeleton */}
                    <div className="flex border-b border-gray-200 dark:border-[#262626]">
                        <div className="flex-1 py-4 flex justify-center"><div className="w-20 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded animate-pulse" /></div>
                        <div className="flex-1 py-4 flex justify-center"><div className="w-24 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded animate-pulse" /></div>
                    </div>
                    {/* List Items Skeletons */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-200/60 dark:border-[#262626] bg-[#fafafa] dark:bg-[#1D1E23] animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2c2d33] shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="w-2/3 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Job Details Skeleton */}
                <div className="flex-1 h-full flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] overflow-hidden p-8 space-y-6">
                    {/* Header Details */}
                    <div className="flex items-start gap-4 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#2c2d33] shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="w-1/3 h-6 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                            <div className="w-1/4 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-[#262626] pb-3 animate-pulse">
                        <div className="w-24 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded mr-8" />
                        <div className="w-28 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded mr-8" />
                        <div className="w-28 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded mr-8" />
                    </div>
                    {/* Description Body */}
                    <div className="space-y-4 animate-pulse">
                        <div className="w-1/4 h-5 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                        <div className="space-y-2">
                            <div className="w-full h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                            <div className="w-5/6 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                            <div className="w-11/12 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                            <div className="w-3/4 h-4 bg-gray-200 dark:bg-[#2c2d33] rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

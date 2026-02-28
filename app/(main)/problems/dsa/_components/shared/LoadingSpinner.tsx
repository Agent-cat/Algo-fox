"use client";

import { memo } from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
}

const sizeClasses = {
    sm: "w-4 h-4 border-[1.5px]",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-[2.5px]",
};

function LoadingSpinnerComponent({
    size = "md",
    message,
    className = ""
}: LoadingSpinnerProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div className="relative">
                <div
                    className={`${sizeClasses[size]} border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin`}
                    aria-label="Loading"
                />
            </div>
            {message && (
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">{message}</span>
            )}
        </div>
    );
}

export const LoadingSpinner = memo(LoadingSpinnerComponent);
LoadingSpinner.displayName = "LoadingSpinner";

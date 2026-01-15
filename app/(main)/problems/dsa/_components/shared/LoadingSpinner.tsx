"use client";

import { memo } from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
}

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
};

function LoadingSpinnerComponent({
    size = "md",
    message,
    className = ""
}: LoadingSpinnerProps) {
    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <div
                className={`${sizeClasses[size]} border-2 border-orange-500 border-t-transparent rounded-full animate-spin`}
                aria-label="Loading"
            />
            {message && <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>}
        </div>
    );
}

export const LoadingSpinner = memo(LoadingSpinnerComponent);
LoadingSpinner.displayName = "LoadingSpinner";

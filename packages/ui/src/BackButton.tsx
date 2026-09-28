"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";

interface BackButtonProps {
    /** If provided, navigates to href instead of router.back() */
    href?: string;
    /** Fallback label when no children are given (pill variant) */
    label?: string;
    children?: React.ReactNode;
    className?: string;
    /**
     * "pill" — bordered button (dashboard/contest surfaces).
     * "minimal" — uppercase link with slide animation (profile surfaces).
     */
    variant?: "pill" | "minimal";
}

export function BackButton({
    href,
    label = "Back",
    children,
    className = "",
    variant = "pill",
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    if (variant === "minimal") {
        return (
            <button
                onClick={handleClick}
                className={`group flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors text-xs uppercase tracking-wider ${className}`}
            >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#1D1E23] ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            {children || label}
        </button>
    );
}

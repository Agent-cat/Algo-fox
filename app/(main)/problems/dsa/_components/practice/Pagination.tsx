"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isPending?: boolean;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push("...");
    pages.push(total);

    return pages;
}

function PaginationComponent({ currentPage, totalPages, onPageChange, isPending = false }: PaginationProps) {
    const pages = getPageNumbers(currentPage, totalPages);
    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const btnBase = "flex items-center gap-1 px-2 py-1.5 text-[13px] font-medium transition-colors duration-150 disabled:cursor-not-allowed";

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            aria-label="Pagination"
            className="flex items-center justify-center gap-0.5 py-7"
        >
            {/* Prev */}
            <button
                onClick={() => canPrev && !isPending && onPageChange(currentPage - 1)}
                disabled={!canPrev || isPending}
                aria-label="Previous page"
                className={`${btnBase} rounded-md gap-1 pr-3 ${
                    canPrev && !isPending
                        ? "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        : "text-gray-300 dark:text-gray-700"
                }`}
            >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />

            {/* Pages */}
            {pages.map((page, idx) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${idx}`}
                        className="w-8 text-center text-[13px] text-gray-400 dark:text-gray-600"
                    >
                        ·····
                    </span>
                ) : (
                    <PageBtn
                        key={page}
                        page={page}
                        isActive={page === currentPage}
                        isPending={isPending}
                        onClick={() => page !== currentPage && !isPending && onPageChange(page)}
                    />
                )
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />

            {/* Next */}
            <button
                onClick={() => canNext && !isPending && onPageChange(currentPage + 1)}
                disabled={!canNext || isPending}
                aria-label="Next page"
                className={`${btnBase} rounded-md gap-1 pl-3 ${
                    canNext && !isPending
                        ? "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        : "text-gray-300 dark:text-gray-700"
                }`}
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
            </button>
        </motion.nav>
    );
}

interface PageBtnProps {
    page: number;
    isActive: boolean;
    isPending: boolean;
    onClick: () => void;
}

function PageBtn({ page, isActive, isPending, onClick }: PageBtnProps) {
    return (
        <button
            onClick={onClick}
            disabled={isPending && !isActive}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`
                relative w-8 h-8 flex items-center justify-center text-[13px] font-semibold
                rounded-md transition-colors duration-150 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-orange-500/50
                ${isActive
                    ? "text-orange-500 dark:text-orange-400 cursor-default"
                    : isPending
                        ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                }
            `}
        >
            <span className="relative z-10">{page}</span>

            {/* Active underline — slides between pages */}
            {isActive && (
                <motion.span
                    layoutId="page-underline"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-orange-500"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
            )}
        </button>
    );
}

export default memo(PaginationComponent);

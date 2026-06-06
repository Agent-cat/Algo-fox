"use client";

import React from "react";
import CustomTooltip from "@/components/ui/CustomTooltip";
import { cn } from "@/lib/utils";

export interface Company {
    name: string;
    logo?: string;
}

interface CompanyAvatarsProps {
    companies?: any;
    limit?: number;
    className?: string;
    avatarSize?: string;
}

export function parseCompanies(companiesValue: any): Company[] {
    if (!companiesValue) return [];
    if (Array.isArray(companiesValue)) {
        return companiesValue.filter(c => c && typeof c === "object" && typeof c.name === "string");
    }
    if (typeof companiesValue === "object" && Array.isArray(companiesValue.companies)) {
        return companiesValue.companies.filter((c: any) => c && typeof c === "object" && typeof c.name === "string");
    }
    if (typeof companiesValue === "string") {
        try {
            const parsed = JSON.parse(companiesValue);
            return parseCompanies(parsed);
        } catch {
            return [];
        }
    }
    return [];
}

export default function CompanyAvatars({
    companies,
    limit = 3,
    className,
    avatarSize = "h-8 w-8"
}: CompanyAvatarsProps) {
    const list = parseCompanies(companies);

    if (list.length === 0) {
        return <span className="text-gray-300 dark:text-zinc-700 font-bold tracking-widest cursor-default select-none">—</span>;
    }

    const visibleCompanies = list.slice(0, limit);
    const hasOverflow = list.length > limit;
    const overflowCount = list.length - limit;
    const remainingCompanies = list.slice(limit).map(c => c.name).join(", ");

    return (
        <div className={cn("flex items-center -space-x-2.5", className)}>
            {visibleCompanies.map((company, index) => {
                const logoSrc = company.logo?.trim();
                const displayName = company.name;

                return (
                    <CustomTooltip key={`${displayName}-${index}`} content={displayName}>
                        <div
                            className={cn(
                                "rounded-full border-2 border-white dark:border-[#121212] overflow-hidden bg-white flex items-center justify-center shadow-sm shrink-0 select-none",
                                avatarSize
                            )}
                        >
                            {logoSrc ? (
                                <img
                                    src={logoSrc}
                                    alt={displayName}
                                    className="h-full w-full object-contain p-1"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLElement).style.display = "none";
                                        const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                                        if (fallback) fallback.style.display = "flex";
                                    }}
                                />
                            ) : null}
                            <div
                                className={cn(
                                    "h-full w-full items-center justify-center bg-gray-100 text-[10px] font-bold text-gray-500 capitalize",
                                    logoSrc ? "hidden" : "flex"
                                )}
                            >
                                {displayName.charAt(0)}
                            </div>
                        </div>
                    </CustomTooltip>
                );
            })}

            {hasOverflow && (
                <CustomTooltip content={remainingCompanies}>
                    <div
                        className={cn(
                            "rounded-full border-2 border-white dark:border-[#121212] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shadow-xs shrink-0 font-bold text-[10px] text-gray-500 dark:text-gray-400 select-none cursor-default",
                            avatarSize
                        )}
                    >
                        +{overflowCount}
                    </div>
                </CustomTooltip>
            )}
        </div>
    );
}

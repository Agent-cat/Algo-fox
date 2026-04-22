"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export function CourseSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSearching, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        const q = searchParams.get("q");
        if (q !== query) setQuery(q || "");
    }, [searchParams]);

    const handleSearch = (value: string) => {
        setQuery(value);
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set("q", value);
            } else {
                params.delete("q");
            }
            router.replace(`/courses?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="max-w-2xl mx-auto relative group">
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${isSearching ? 'text-orange-500' : 'text-gray-400 group-focus-within:text-orange-500'}`}>
                {isSearching ? (
                    <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Search className="w-6 h-6" />
                )}
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for courses, technologies, or topics..."
                className="w-full pl-14 pr-12 py-5 rounded-3xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] shadow-sm focus:outline-hidden focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-xl placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-hidden"
            />
            {query && (
                <button
                    onClick={() => handleSearch("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

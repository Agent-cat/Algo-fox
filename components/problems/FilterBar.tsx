"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X, Check, ChevronDown, RotateCcw, ArrowUpDown, Search, Building2 } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { getAllTags } from "@/actions/tag.action";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ProblemDomain } from "@prisma/client";

const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 25,
            opacity: { duration: 0.2 }
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.15 }
    }
};

interface CompanyOption {
    name: string;
    logo?: string;
}

export function FilterBar({ domain, companies = [] }: { domain?: ProblemDomain; companies?: CompanyOption[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [allTags, setAllTags] = useState<{ name: string; slug: string }[]>([]);
    const [openDropdown, setOpenDropdown] = useState<"difficulty" | "topics" | "sort" | "company" | null>(null);
    const [companySearch, setCompanySearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const difficulty = searchParams.get("difficulty");
    const selectedTags = searchParams.getAll("tags");
    const sortBy = searchParams.get("sortBy") || "oldest";
    const selectedCompany = searchParams.get("company");

    useEffect(() => {
        const fetchTags = async () => {
            const res = await getAllTags(domain);
            if (res.success && res.tags) {
                setAllTags(res.tags);
            }
        };
        fetchTags();
    }, [domain]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
                setCompanySearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCompanies = useMemo(() => {
        const q = companySearch.toLowerCase();
        return companies.filter(c => c.name.toLowerCase().includes(q));
    }, [companies, companySearch]);

    const updateFilters = (key: string, value: string | null | string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || (Array.isArray(value) && value.length === 0)) {
            params.delete(key);
        } else if (Array.isArray(value)) {
            params.delete(key);
            value.forEach(v => params.append(key, v));
        } else {
            params.set(key, value);
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setOpenDropdown(null);
        setCompanySearch("");
    };

    const hasFilters = difficulty || selectedTags.length > 0 || sortBy !== "oldest" || selectedCompany;

    return (
        <div className="flex flex-wrap items-center gap-3 mb-4" ref={containerRef}>

            {/* ── Difficulty ── */}
            <div className="relative">
                <button
                    onClick={() => setOpenDropdown(prev => prev === "difficulty" ? null : "difficulty")}
                    className={`flex items-center gap-2.5 px-4 py-2 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#1e1e1e] rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333] tracking-tight ${difficulty ? 'ring-2 ring-orange-500/10 border-orange-400/50 text-orange-600' : ''}`}
                >
                    <span>{difficulty ? difficulty.charAt(0) + difficulty.slice(1).toLowerCase() : "Difficulty"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${openDropdown === "difficulty" ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {openDropdown === "difficulty" && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full left-0 mt-2 w-48 bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-2xl shadow-2xl shadow-black/10 z-[101] py-2"
                        >
                            <button onClick={() => updateFilters("difficulty", null)} className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-[#1D1E23] text-gray-700 dark:text-gray-300 font-bold tracking-tight transition-colors">All Difficulties</button>
                            <button onClick={() => updateFilters("difficulty", "EASY")} className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-emerald-50 dark:hover:bg-emerald-500/5 text-emerald-600 dark:text-emerald-500 font-bold tracking-tight transition-colors flex items-center justify-between">
                                Easy {difficulty === "EASY" && <Check className="w-3 h-3 stroke-4" />}
                            </button>
                            <button onClick={() => updateFilters("difficulty", "MEDIUM")} className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-amber-50 dark:hover:bg-amber-500/5 text-amber-500 font-bold tracking-tight transition-colors flex items-center justify-between">
                                Medium {difficulty === "MEDIUM" && <Check className="w-3 h-3 stroke-4" />}
                            </button>
                            <button onClick={() => updateFilters("difficulty", "HARD")} className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-rose-50 dark:hover:bg-rose-500/5 text-rose-600 dark:text-rose-500 font-bold tracking-tight transition-colors flex items-center justify-between">
                                Hard {difficulty === "HARD" && <Check className="w-3 h-3 stroke-4" />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Topics ── */}
            <div className="relative">
                <button
                    onClick={() => setOpenDropdown(prev => prev === "topics" ? null : "topics")}
                    className={`flex items-center gap-2.5 px-4 py-2 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#1e1e1e] rounded-xl text-[13px] font-bold text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333] tracking-tight ${selectedTags.length > 0 ? 'ring-2 ring-orange-500/10 border-orange-400/50 text-orange-600' : ''}`}
                >
                    <span>Topics</span>
                    {selectedTags.length > 0 && (
                        <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-in fade-in zoom-in duration-300">
                            {selectedTags.length}
                        </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${openDropdown === "topics" ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {openDropdown === "topics" && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full left-0 mt-2 w-64 bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-2xl shadow-2xl shadow-black/10 z-[100] max-h-[320px] overflow-y-auto py-2 custom-scrollbar"
                        >
                            {allTags.length > 0 ? allTags.map(tag => {
                                const isSelected = selectedTags.includes(tag.slug);
                                return (
                                    <button
                                        key={tag.slug}
                                        onClick={() => {
                                            const newTags = isSelected
                                                ? selectedTags.filter(t => t !== tag.slug)
                                                : [...selectedTags, tag.slug];
                                            updateFilters("tags", newTags);
                                        }}
                                        className={`w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-[#1D1E23] flex items-center justify-between transition-all duration-200 font-bold tracking-tight ${isSelected ? 'text-orange-600 dark:text-orange-500 bg-orange-50/30 dark:bg-orange-500/5' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {tag.name}
                                        {isSelected && (
                                            <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                                <Check className="w-2.5 h-2.5 text-white stroke-4" />
                                            </div>
                                        )}
                                    </button>
                                );
                            }) : (
                                <div className="px-4 py-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">Scanning Topics...</div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Company ── */}
            {companies.length > 0 && (
                <div className="relative">
                    <button
                        onClick={() => setOpenDropdown(prev => prev === "company" ? null : "company")}
                        className={`flex items-center gap-2.5 px-4 py-2 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#1e1e1e] rounded-xl text-[13px] font-bold text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333] tracking-tight ${selectedCompany ? 'ring-2 ring-orange-500/10 border-orange-400/50 text-orange-600' : ''}`}
                    >
                        {selectedCompany ? (
                            <>
                                {(() => {
                                    const c = companies.find(co => co.name === selectedCompany);
                                    return c?.logo
                                        ? <img src={c.logo} alt={c.name} className="w-4 h-4 object-contain" />
                                        : <Building2 className="w-3.5 h-3.5 text-orange-500" />;
                                })()}
                                <span className="max-w-[100px] truncate">{selectedCompany}</span>
                            </>
                        ) : (
                            <>
                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                <span>Company</span>
                            </>
                        )}
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${openDropdown === "company" ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {openDropdown === "company" && (
                            <motion.div
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute top-full left-0 mt-2 w-64 bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-2xl shadow-2xl shadow-black/10 z-[100] flex flex-col overflow-hidden"
                            >
                                {/* Search */}
                                <div className="px-3 pt-3 pb-2 border-b border-gray-100 dark:border-[#1e1e1e]">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-xl">
                                        <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <input
                                            autoFocus
                                            type="text"
                                            value={companySearch}
                                            onChange={e => setCompanySearch(e.target.value)}
                                            placeholder="Search company..."
                                            className="flex-1 text-[12px] bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                                        />
                                        {companySearch && (
                                            <button onClick={() => setCompanySearch("")} className="text-gray-400 hover:text-gray-600">
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* List */}
                                <div className="max-h-[240px] overflow-y-auto py-2 custom-scrollbar">
                                    <button
                                        onClick={() => updateFilters("company", null)}
                                        className="w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-[#1D1E23] text-gray-700 dark:text-gray-300 font-bold tracking-tight transition-colors flex items-center justify-between"
                                    >
                                        All Companies
                                        {!selectedCompany && <Check className="w-3 h-3 stroke-4 text-orange-500" />}
                                    </button>

                                    {filteredCompanies.length > 0 ? filteredCompanies.map(company => {
                                        const isSelected = selectedCompany === company.name;
                                        return (
                                            <button
                                                key={company.name}
                                                onClick={() => updateFilters("company", company.name)}
                                                className={`w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-[#1D1E23] flex items-center gap-3 transition-all duration-150 font-bold tracking-tight ${isSelected ? 'text-orange-600 dark:text-orange-500 bg-orange-50/30 dark:bg-orange-500/5' : 'text-gray-700 dark:text-gray-300'}`}
                                            >
                                                {company.logo ? (
                                                    <div className="w-5 h-5 rounded-full bg-white border border-gray-200 dark:border-[#333] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                                                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-0.5" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-[9px] font-black text-gray-500 uppercase">
                                                        {company.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="flex-1 truncate">{company.name}</span>
                                                {isSelected && (
                                                    <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                                                        <Check className="w-2.5 h-2.5 text-white stroke-4" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    }) : (
                                        <div className="px-5 py-6 text-center text-xs text-gray-400 font-medium">No companies match</div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* ── Sort ── */}
            <div className="relative">
                <button
                    onClick={() => setOpenDropdown(prev => prev === "sort" ? null : "sort")}
                    className={`flex items-center gap-2.5 px-4 py-2 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#1e1e1e] rounded-xl text-[13px] font-bold text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333] tracking-tight ${sortBy !== "oldest" ? 'ring-2 ring-orange-500/10 border-orange-400/50 text-orange-600' : ''}`}
                >
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    <span className="capitalize">{sortBy}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${openDropdown === "sort" ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {openDropdown === "sort" && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full left-0 mt-2 w-48 bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-2xl shadow-2xl shadow-black/10 z-[101] py-2"
                        >
                            {[
                                { id: "newest", label: "Newest" },
                                { id: "oldest", label: "Oldest" },
                                { id: "acceptance", label: "Acceptance" }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => updateFilters("sortBy", item.id)}
                                    className={`w-full text-left px-5 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-[#1D1E23] flex items-center justify-between transition-colors font-bold tracking-tight ${sortBy === item.id ? 'text-orange-600 dark:text-orange-500' : 'text-gray-700 dark:text-gray-300'}`}
                                >
                                    {item.label}
                                    {sortBy === item.id && <Check className="w-3 h-3 stroke-4" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Active filter chips ── */}
            <div className="hidden lg:flex flex-wrap gap-2 ml-2">
                <AnimatePresence>
                    {selectedTags.map(slug => {
                        const tagName = allTags.find(t => t.slug === slug)?.name || slug;
                        return (
                            <motion.span
                                key={slug}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-[#fafafa] dark:bg-[#24262C] text-orange-600 dark:text-orange-500 rounded-lg text-[10px] font-black border border-gray-100 dark:border-white/5 uppercase tracking-wider shadow-sm"
                            >
                                {tagName}
                                <button onClick={() => updateFilters("tags", selectedTags.filter(t => t !== slug))} className="hover:text-red-500 rounded p-0.5 transition-colors">
                                    <X className="w-2.5 h-2.5 stroke-4" />
                                </button>
                            </motion.span>
                        );
                    })}
                    {selectedCompany && (
                        <motion.span
                            key="company-chip"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-center gap-1.5 px-3 py-1 bg-[#fafafa] dark:bg-[#24262C] text-orange-600 dark:text-orange-500 rounded-lg text-[10px] font-black border border-gray-100 dark:border-white/5 uppercase tracking-wider shadow-sm"
                        >
                            {(() => {
                                const c = companies.find(co => co.name === selectedCompany);
                                return c?.logo ? <img src={c.logo} alt={c.name} className="w-3 h-3 object-contain" /> : null;
                            })()}
                            {selectedCompany}
                            <button onClick={() => updateFilters("company", null)} className="hover:text-red-500 rounded p-0.5 transition-colors">
                                <X className="w-2.5 h-2.5 stroke-4" />
                            </button>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Reset ── */}
            {hasFilters && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("difficulty");
                        params.delete("tags");
                        params.delete("sortBy");
                        params.delete("company");
                        params.set("page", "1");
                        router.push(`${pathname}?${params.toString()}`, { scroll: false });
                        setOpenDropdown(null);
                    }}
                    className="ml-auto flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 font-black transition-all px-3 py-1.5 rounded-xl hover:bg-[#fafafa] dark:hover:bg-white/5 uppercase tracking-[0.2em] shadow-sm md:shadow-none"
                >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                </motion.button>
            )}
        </div>
    );
}

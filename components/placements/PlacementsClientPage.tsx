"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobList } from "@/components/placements/job-profiles/JobList";
import { JobDetails } from "@/components/placements/job-profiles/JobDetails";
import { Job } from "@/components/placements/job-profiles/types";
import Split from "react-split";

type TabType = "on-campus" | "off-campus";

interface PlacementsClientPageProps {
    initialJobs: Job[];
}

export default function PlacementsClientPage({ initialJobs }: PlacementsClientPageProps) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [activeTab, setActiveTab] = useState<TabType>("on-campus");
    const [selectedJobId, setSelectedJobId] = useState<string | null>(
        initialJobs.length > 0 ? initialJobs[0].id : null
    );
    
    // Filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [positionType, setPositionType] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              job.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = positionType === "All" || job.type === positionType;
        const matchesStatus = statusFilter === "All" || job.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const selectedJob = jobs.find(job => job.id === selectedJobId) || null;

    return (
        <div className="flex flex-col w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)] h-[calc(100vh-4rem)] -m-8 lg:-m-12 bg-[#fafafa] dark:bg-[#1D1E23]">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:px-6 border-b border-gray-200 dark:border-[#262626] shrink-0 bg-[#fafafa] dark:bg-[#1D1E23]">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search jobs..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-[#262626] border-none rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                        />
                    </div>
                    
                    {/* Position Type Filter */}
                    <select 
                        value={positionType}
                        onChange={(e) => setPositionType(e.target.value)}
                        className="py-2 pl-3 pr-8 bg-gray-100 dark:bg-[#262626] border-none rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500/50 outline-none appearance-none cursor-pointer"
                    >
                        <option value="All">Position: All</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Apprenticeship">Apprenticeship</option>
                    </select>

                    {/* Status Filter */}
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="py-2 pl-3 pr-8 bg-gray-100 dark:bg-[#262626] border-none rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500/50 outline-none appearance-none cursor-pointer"
                    >
                        <option value="All">Status: All</option>
                        <option value="Applied">Applied</option>
                        <option value="Not Applied">Not Applied</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Slider Toggle */}
                <div className="relative flex items-center bg-gray-100 dark:bg-[#262626] rounded-full p-1 shrink-0">
                    <button
                        onClick={() => setActiveTab("on-campus")}
                        className={cn(
                            "relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                            activeTab === "on-campus" 
                                ? "text-orange-600 dark:text-white" 
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                    >
                        {activeTab === "on-campus" && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute inset-0 bg-white dark:bg-[#404040] rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-20">On-Campus</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("off-campus")}
                        className={cn(
                            "relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                            activeTab === "off-campus" 
                                ? "text-orange-600 dark:text-white" 
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                    >
                        {activeTab === "off-campus" && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute inset-0 bg-white dark:bg-[#404040] rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-20">Off-Campus</span>
                    </button>
                </div>
            </div>

            {/* Content Area - Two Panes */}
            <div className="flex-1 min-h-0 relative">
                <Split 
                    sizes={[35, 65]}
                    minSize={0}
                    gutterSize={6}
                    className="flex w-full h-full split-container"
                >
                    <div className="h-full border-r border-gray-200 dark:border-[#262626] overflow-hidden" style={{ minWidth: "35%" }}>
                        <JobList 
                            jobs={filteredJobs} 
                            selectedJobId={selectedJobId} 
                            onSelectJob={setSelectedJobId} 
                        />
                    </div>
                    
                    <div className="h-full flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] overflow-hidden" style={{ minWidth: "55%" }}>
                        <JobDetails job={selectedJob} />
                    </div>
                </Split>
            </div>

            <style jsx global>{`
                .split-container .gutter {
                    background-color: #f3f4f6;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    cursor: col-resize;
                    transition: background-color 0.2s;
                }
                .dark .split-container .gutter {
                    background-color: #262626;
                }
                .split-container .gutter:hover {
                    background-color: #e5e7eb;
                }
                .dark .split-container .gutter:hover {
                    background-color: #404040;
                }
                .split-container .gutter.gutter-horizontal {
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none" stroke="currentColor"><path d="M1 1L1 19M3 1L3 19" stroke="%239ca3af" stroke-width="2" stroke-linecap="round"/></svg>');
                }
            `}</style>
        </div>
    );
}

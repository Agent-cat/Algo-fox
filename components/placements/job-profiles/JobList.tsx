import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Job, JobCategory } from "./types";
import { JobCard } from "./JobCard";

interface JobListProps {
    jobs: Job[];
    selectedJobId: string | null;
    onSelectJob: (id: string) => void;
}

export function JobList({ jobs, selectedJobId, onSelectJob }: JobListProps) {
    const [activeTab, setActiveTab] = useState<JobCategory>("All Jobs");

    // We assume "Applied Jobs" filter means status is "Applied"
    const filteredJobs = jobs.filter(job => 
        activeTab === "All Jobs" || job.status === "Applied"
    );

    return (
        <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#1D1E23] border-r border-gray-200 dark:border-[#262626]">
            {/* Tabs */}
            <div className="flex items-center border-b border-gray-200 dark:border-[#262626] relative">
                {(["All Jobs", "Applied Jobs"] as JobCategory[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-4 text-[13px] font-bold text-center relative transition-colors",
                            activeTab === tab 
                                ? "text-orange-600 dark:text-orange-400" 
                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="jobListTab"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-600 dark:bg-orange-400"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            isSelected={job.id === selectedJobId} 
                            onClick={() => onSelectJob(job.id)} 
                        />
                    ))
                ) : (
                    <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No jobs found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}

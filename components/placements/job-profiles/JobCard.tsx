import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "./types";

interface JobCardProps {
    job: Job;
    isSelected: boolean;
    onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
    return (
        <div 
            onClick={onClick}
            className={cn(
                "flex items-start gap-4 p-4 cursor-pointer transition-colors border-b border-gray-100 dark:border-[#262626]",
                isSelected 
                    ? "bg-gray-50 dark:bg-[#2c2d33]" 
                    : "hover:bg-gray-50/50 dark:hover:bg-[#262626]"
            )}
        >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] flex items-center justify-center flex-shrink-0 overflow-hidden">
                {job.logoUrl ? (
                    <img src={job.logoUrl} alt={job.company} className="w-6 h-6 object-contain" />
                ) : (
                    <span className="text-xs font-bold text-gray-500">{job.company.charAt(0)}</span>
                )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug truncate">
                        {job.title}
                    </h3>
                    {job.status === "Applications closed" && (
                        <div className="flex-shrink-0 px-2 py-1 bg-gray-100 dark:bg-[#333] text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-md whitespace-nowrap">
                            {job.status}
                        </div>
                    )}
                    {job.status === "Applied" && (
                        <div className="flex flex-shrink-0 items-center gap-1 text-orange-600 dark:text-orange-400 px-2 py-1 border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 rounded-full text-[10px] font-medium whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{job.status}</span>
                        </div>
                    )}
                </div>

                <div className="text-[12px] mt-0.5 text-gray-900 dark:text-gray-200 font-medium truncate">
                    {job.company} <span className="text-gray-400 font-normal">· {job.location}</span>
                </div>

                <div className="text-[11px] text-gray-400 mt-1">
                    {job.timeAgo}
                </div>
            </div>
        </div>
    );
}

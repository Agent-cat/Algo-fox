import { useState } from "react";
import { motion } from "framer-motion";
import { Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "./types";

interface JobDetailsProps {
    job: Job | null;
}

type TabType = "Job Description" | "Hiring Workflow" | "Eligibility Criteria";

export function JobDetails({ job }: JobDetailsProps) {
    const [activeTab, setActiveTab] = useState<TabType>("Job Description");

    if (!job) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#1D1E23]">
                <p className="text-gray-500 dark:text-gray-400">Select a job to view details</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-[#1D1E23] overflow-y-auto scrollbar-hide">
            <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] flex items-center justify-center flex-shrink-0 overflow-hidden mt-1">
                            {job.logoUrl ? (
                                <img src={job.logoUrl} alt={job.company} className="w-8 h-8 object-contain" />
                            ) : (
                                <span className="text-sm font-bold text-gray-500">{job.company.charAt(0)}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {job.title}
                            </h2>
                            <div className="text-[13px] text-gray-700 dark:text-gray-300 mt-1 font-medium">
                                {job.company} <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> {job.type} <span className="text-gray-300 dark:text-gray-600 mx-1">|</span> <span className="text-gray-500 font-normal">{job.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    {!job.isEligible && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-[13px] font-medium border border-red-100 dark:border-red-900/50 flex-shrink-0">
                            <XCircle className="w-4 h-4" />
                            <span>Not eligible</span>
                        </div>
                    )}
                </div>

                {/* Banner */}
                {job.status === "Applications closed" && (
                    <div className="mt-6 flex items-center gap-2 bg-gray-100/80 dark:bg-[#262626] text-gray-500 dark:text-gray-400 px-4 py-3 rounded-lg text-[13px]">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>Applications are now closed. You were not eligible to apply for this Job Profile</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex items-center border-b border-gray-200 dark:border-[#262626] mt-8 relative overflow-x-auto scrollbar-hide">
                    {(["Job Description", "Hiring Workflow", "Eligibility Criteria"] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 mr-8 text-[13px] font-bold relative transition-colors whitespace-nowrap",
                                activeTab === tab 
                                    ? "text-orange-600 dark:text-orange-400" 
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="jobDetailsTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-600 dark:bg-orange-400"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="py-8">
                    {activeTab === "Job Description" && (
                        <div className="space-y-8">
                            {/* Opening Overview */}
                            <div>
                                <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Opening Overview</h3>
                                <div className="grid grid-cols-[140px_1fr] gap-y-3 text-[13px]">
                                    <div className="text-gray-500">Category:</div>
                                    <div className="text-gray-700 dark:text-gray-300">{job.category}</div>
                                    
                                    <div className="text-gray-500">Job Functions:</div>
                                    <div className="text-gray-700 dark:text-gray-300">{job.functions}</div>
                                    
                                    <div className="text-gray-500">Job Profile CTC:</div>
                                    <div className="text-gray-700 dark:text-gray-300">{job.ctc}</div>
                                    
                                    <div className="text-gray-500">Other Info :</div>
                                    <div className="text-gray-700 dark:text-gray-300">-</div>
                                </div>
                            </div>

                            {/* Job Description Text */}
                            <div>
                                <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Job Description</h3>
                                <p className="text-[13px] text-gray-500 mb-4">Job description:</p>
                                <ul className="space-y-3">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-[13px] text-gray-500 dark:text-gray-400 flex items-start gap-2">
                                            <span className="text-gray-300 mt-1.5">•</span>
                                            <span className="flex-1 leading-relaxed">{desc}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-orange-600 dark:text-orange-400 text-[13px] font-bold mt-4 hover:underline">
                                    Show More
                                </button>
                            </div>

                            {/* Required Skills */}
                            <div>
                                <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, i) => (
                                        <div key={i} className="px-4 py-1.5 rounded-full border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 text-[12px] font-medium bg-white dark:bg-[#1D1E23]">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Information */}
                            {job.additionalInfo && (
                                <div>
                                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Additional Information</h3>
                                    <p className="text-[13px] text-gray-500 whitespace-pre-wrap">{job.additionalInfo}</p>
                                </div>
                            )}

                            {/* About Company */}
                            {(job.companyAbout || job.companyWebsite) && (
                                <div>
                                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">About {job.company}</h3>
                                    {job.companyWebsite && (
                                        <div className="mb-2">
                                            <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-[13px] text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                                {job.companyWebsite}
                                            </a>
                                        </div>
                                    )}
                                    {job.companyAbout && (
                                        <p className="text-[13px] text-gray-500 whitespace-pre-wrap leading-relaxed">{job.companyAbout}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "Hiring Workflow" && (
                        <div className="space-y-6">
                            {job.workflow && job.workflow.length > 0 ? (
                                <div className="relative border-l-2 border-gray-200 dark:border-[#333] ml-3 pl-8 py-2 space-y-8">
                                    {job.workflow.map((step, i) => (
                                        <div key={i} className="relative">
                                            {/* Circle Indicator */}
                                            <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#333] border-4 border-white dark:border-[#1D1E23] flex items-center justify-center shadow-sm">
                                                {i === job.workflow!.length - 1 ? (
                                                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
                                                ) : (
                                                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                                )}
                                            </div>
                                            
                                            {/* Content */}
                                            <div>
                                                <h4 className="text-[15px] font-bold text-gray-700 dark:text-gray-300">
                                                    {step.title}
                                                </h4>
                                                {step.venue && (
                                                    <p className="text-[13px] text-gray-500 mt-1">
                                                        Venue: {step.venue}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-[13px] text-gray-500">Hiring workflow details are not available.</div>
                            )}
                        </div>
                    )}

                    {activeTab === "Eligibility Criteria" && (
                        <div className="space-y-6">
                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Minimum Requirements</h3>
                            {job.minGpa || job.min10thMarks || job.min12thMarks ? (
                                <div className="grid grid-cols-[140px_1fr] gap-y-3 text-[13px]">
                                    {job.minGpa && (
                                        <>
                                            <div className="text-gray-500">Minimum GPA:</div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">{job.minGpa}</div>
                                        </>
                                    )}
                                    {job.min10thMarks && (
                                        <>
                                            <div className="text-gray-500">10th Marks:</div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">{job.min10thMarks}%</div>
                                        </>
                                    )}
                                    {job.min12thMarks && (
                                        <>
                                            <div className="text-gray-500">12th / Inter Marks:</div>
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">{job.min12thMarks}%</div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-[13px] text-gray-500">No specific marks criteria required for this drive.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

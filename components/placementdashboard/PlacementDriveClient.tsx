"use client";

import { Building2, MapPin, Briefcase, IndianRupee, Clock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export interface PlacementJob {
    id: string;
    title: string;
    company: { name: string; logoUrl?: string | null };
    ctc: string;
    location: string;
    type: string;
    requiredSkills?: string[];
    status?: string;
}

export function PlacementDriveClient({ initialJobs }: { initialJobs: PlacementJob[] }) {
    const router = useRouter();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                        Placement Drives
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Manage all active, upcoming, and past placement drives.
                    </p>
                </div>
                <button
                    onClick={() => router.push("/placementdashboard/placement-drive/create")}
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
                >
                    + Create Drive
                </button>
            </div>

            {initialJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialJobs.map((job) => (
                        <div key={job.id} className="bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#333] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        {job.company?.logoUrl ? (
                                            <img src={job.company.logoUrl} alt={job.company.name} className="w-12 h-12 rounded-xl object-contain bg-gray-50 dark:bg-white p-1 border border-gray-100" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/10 text-orange-600 flex items-center justify-center font-black text-xl border border-orange-200 dark:border-orange-500/30">
                                                {job.company?.name?.charAt(0)?.toUpperCase() || "C"}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1 text-lg group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors" title={job.title}>
                                                {job.title}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                                                <Building2 className="w-3.5 h-3.5" />
                                                <span className="line-clamp-1">{job.company?.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-6">
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#24262C] p-2 rounded-lg">
                                        <IndianRupee className="w-4 h-4 text-green-600 dark:text-green-500" />
                                        <span>{job.ctc}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="line-clamp-1">{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="line-clamp-1">{job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {job.requiredSkills && job.requiredSkills.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {job.requiredSkills.slice(0, 3).map((skill: string, i: number) => (
                                            <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-[#2A2D35] text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.requiredSkills.length > 3 && (
                                            <span className="px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                +{job.requiredSkills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="px-6 py-4 border-t border-gray-100 dark:border-[#333] bg-gray-50 dark:bg-[#24262C] flex items-center justify-between group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${job.status === 'Open' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{job.status || 'Active'}</span>
                                </div>
                                <span className="text-sm font-bold text-orange-600 dark:text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                    View Details &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-2xl flex flex-col items-center justify-center min-h-[300px] bg-white dark:bg-[#1D1E23]">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#24262C] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-[#333]">
                        <Briefcase className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Drives Found</h3>
                    <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
                        You haven't created any placement drives yet. Create your first drive to start inviting candidates.
                    </p>
                    <button
                        onClick={() => router.push("/placementdashboard/placement-drive/create")}
                        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Create First Drive
                    </button>
                </div>
            )}
        </div>
    );
}

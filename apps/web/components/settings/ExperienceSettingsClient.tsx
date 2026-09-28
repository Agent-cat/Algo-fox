"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase, Pencil, Trash2, Upload, Star, Calendar, MapPin } from "lucide-react";
import { ExperienceModal } from "./ExperienceModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface ExperienceSettingsClientProps {
    user: any;
    readonly?: boolean;
}

export function ExperienceSettingsClient({ user, readonly = false }: ExperienceSettingsClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const details = user.experienceDetails || {};
    const experiences = details.experiences || [];

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;
        
        setIsDeleting(true);
        try {
            const updatedExperiences = [...experiences];
            updatedExperiences.splice(index, 1);
            
            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    experiences: updatedExperiences
                }
            });

            if (res.success) {
                toast.success("Experience deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete experience");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#2A2B3D] dark:text-gray-100">Internship and Work Experience</h1>
                {!readonly && (
                    <div className="flex items-center gap-4">
                        {experiences.length === 0 && (
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!details.experiencesNone}
                                    onChange={async (e) => {
                                        const checked = e.target.checked;
                                        try {
                                            const res = await updateUserInfo({
                                                experienceDetails: {
                                                    ...details,
                                                    experiencesNone: checked
                                                }
                                            });
                                            if (res.success) {
                                                toast.success("Settings updated");
                                                router.refresh();
                                            } else {
                                                toast.error(res.error || "Failed to update settings");
                                            }
                                        } catch (_) {
                                            toast.error("Something went wrong");
                                        }
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span>None</span>
                            </label>
                        )}
                        <button
                            onClick={() => {
                                setEditingIndex(null);
                                setIsModalOpen(true);
                            }}
                            className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                        >
                            + Add new
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {experiences.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-xl bg-gray-50 dark:bg-[#1D1E23]">
                        <Briefcase className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 text-center">No internships or work experience added yet.</p>
                        {!readonly && (
                            <button
                                onClick={() => {
                                    setEditingIndex(null);
                                    setIsModalOpen(true);
                                }}
                                className="mt-4 px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm"
                            >
                                + Add new
                            </button>
                        )}
                    </div>
                ) : (
                    experiences.map((exp: any, index: number) => {
                        const descriptionItems = exp.description 
                            ? exp.description.split('\n').filter((item: string) => item.trim() !== '')
                            : [];

                        return (
                            <div key={index} className="flex gap-4 py-6 border-b border-gray-100 dark:border-[#333] last:border-0 relative group">
                                {/* Left Logo */}
                                {exp.companyLogo && (
                                    <div className="w-14 h-14 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden shadow-sm">
                                        <img src={exp.companyLogo} alt={exp.companyName} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {/* Right Content */}
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-snug">
                                                    {exp.jobTitle || "Not Provided"}
                                                </h3>
                                                {exp.currentlyWorkHere && (
                                                    <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-500 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                                                        <Star className="w-2.5 h-2.5 fill-current" />
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {exp.companyName || "Unknown Company"}
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        {!readonly && (
                                            <div className="flex items-center gap-2 text-gray-400 shrink-0">
                                                <button 
                                                    onClick={() => {
                                                        setEditingIndex(index);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-1.5 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" strokeWidth={2} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(index)}
                                                    disabled={isDeleting}
                                                    className="p-1.5 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date & Location metadata */}
                                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5" title="Duration">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                                {exp.startDate || "N/A"} – {exp.currentlyWorkHere ? "Present" : (exp.endDate || "N/A")}
                                            </span>
                                        </div>
                                        <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
                                        <div className="flex items-center gap-1.5" title="Location">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-600 dark:text-gray-300">{exp.jobLocation || "N/A"}</span>
                                        </div>
                                        {exp.tag && (
                                            <>
                                                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
                                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-[10px] font-semibold">
                                                    {exp.tag}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Category tags / badges */}
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {exp.positionType && (
                                            <span className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/5 rounded-full text-xs font-medium">
                                                {exp.positionType}
                                            </span>
                                        )}
                                        {exp.jobFunction && (
                                            <span className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/5 rounded-full text-xs font-medium">
                                                {exp.jobFunction}
                                            </span>
                                        )}
                                        {exp.companySector && (
                                            <span className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/5 rounded-full text-xs font-medium">
                                                {exp.companySector}
                                            </span>
                                        )}
                                        {exp.salary && (
                                            <span className="px-2.5 py-0.5 bg-green-50/50 dark:bg-green-950/10 text-green-700 dark:text-green-500 border border-green-200/40 dark:border-green-900/10 rounded-full text-xs font-medium">
                                                {exp.salary}
                                            </span>
                                        )}
                                    </div>

                                    {descriptionItems.length > 0 && (
                                        <div className="border-t border-dashed border-gray-200 dark:border-gray-800 mt-3 pt-3">
                                            <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-500 dark:text-gray-400 marker:text-gray-300 dark:marker:text-gray-700">
                                                {descriptionItems.map((item: string, i: number) => (
                                                    <li key={i} className="pl-1 leading-relaxed">{item.replace(/^[-*]\s*/, '')}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <ExperienceModal 
                open={isModalOpen} 
                onOpenChange={setIsModalOpen} 
                user={user} 
                onSuccess={() => { router.refresh(); }} 
                editIndex={editingIndex} 
            />
        </div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase, Pencil, Trash2, Upload, Star } from "lucide-react";
import { ExperienceModal } from "./ExperienceModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface ExperienceSettingsClientProps {
    user: any;
}

export function ExperienceSettingsClient({ user }: ExperienceSettingsClientProps) {
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
                {experiences.length > 0 && (
                    <button
                        onClick={() => {
                            setEditingIndex(null);
                            setIsModalOpen(true);
                        }}
                        className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                    >
                        + Add new
                    </button>
                )}
            </div>

            <div className="space-y-8">
                {experiences.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-xl bg-gray-50 dark:bg-[#1D1E23]">
                        <Briefcase className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 mb-4 text-center">No internships or work experience added yet.</p>
                        <button
                            onClick={() => {
                                setEditingIndex(null);
                                setIsModalOpen(true);
                            }}
                            className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm"
                        >
                            + Add new
                        </button>
                    </div>
                ) : (
                    experiences.map((exp: any, index: number) => {
                        const descriptionItems = exp.description 
                            ? exp.description.split('\n').filter((item: string) => item.trim() !== '')
                            : [];

                        return (
                            <div key={index} className="flex gap-4 py-6 border-b border-gray-100 dark:border-[#333] last:border-0 relative">
                                <div className="w-12 h-12 rounded-full bg-[#B8B8B8] dark:bg-gray-700 flex items-center justify-center text-white font-medium text-xl flex-shrink-0 mt-1">
                                    {(exp.companyName || "C").charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                            {exp.jobTitle || "Not Provided"}
                                        </h3>
                                        {exp.currentlyWorkHere && (
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        )}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {exp.companyName || "Unknown Company"} <span className="mx-1">|</span> {exp.startDate || "N/A"} - {exp.currentlyWorkHere ? "Present" : (exp.endDate || "N/A")} <span className="mx-1">|</span> {exp.jobLocation || "N/A"}
                                    </p>

                                    <div className="flex justify-between items-center pt-2 pb-1">
                                        <div className="flex flex-wrap gap-2">
                                            {exp.positionType && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                    {exp.positionType}
                                                </span>
                                            )}
                                            {exp.jobFunction && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                    {exp.jobFunction}
                                                </span>
                                            )}
                                            {exp.companySector && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                    {exp.companySector}
                                                </span>
                                            )}
                                            {exp.salary && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                    {exp.salary}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-400">
                                            <button 
                                                onClick={() => {
                                                    setEditingIndex(index);
                                                    setIsModalOpen(true);
                                                }}
                                                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(index)}
                                                disabled={isDeleting}
                                                className="hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                            </button>
                                            <button 
                                                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                                title="Upload/Link Document"
                                            >
                                                <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>

                                    {descriptionItems.length > 0 && (
                                        <div className="border-t-2 border-dotted border-gray-300 dark:border-gray-600 mt-4 pt-4">
                                            <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-500 dark:text-gray-400 marker:text-gray-300 dark:marker:text-gray-600">
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

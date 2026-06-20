"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Upload, AlertCircle } from "lucide-react";
import { SkillModal } from "./SkillModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface SkillsSettingsClientProps {
    user: any;
}

export function SkillsSettingsClient({ user }: SkillsSettingsClientProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const [skillModalOpen, setSkillModalOpen] = useState(false);
    const [skillModalType, setSkillModalType] = useState<"technical" | "language" | "subject">("technical");
    const [skillEditIndex, setSkillEditIndex] = useState<number | null>(null);

    const details = user.experienceDetails || {};
    const technicalSkills = details.technicalSkills || [];
    const languages = details.languages || [];
    const subjects = details.subjects || [];

    const handleSkillDelete = async (type: "technical" | "language" | "subject", index: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        
        setIsDeleting(true);
        try {
            const dataKey = type === "technical" ? "technicalSkills" : (type === "language" ? "languages" : "subjects");
            const updatedItems = [...(details[dataKey] || [])];
            updatedItems.splice(index, 1);
            
            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    [dataKey]: updatedItems
                }
            });

            if (res.success) {
                toast.success("Deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Skills & Languages</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your technical skills, spoken languages, and core subjects.
                </p>
            </div>

            {/* Technical Skills Section */}
            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Technical Skills</h2>
                    <button
                        onClick={() => {
                            setSkillModalType("technical");
                            setSkillEditIndex(null);
                            setSkillModalOpen(true);
                        }}
                        className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                    >
                        + Add new
                    </button>
                </div>
                
                {technicalSkills.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any Technical Skills yet.
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-[#1D1E23] rounded-lg border border-gray-100 dark:border-[#333] divide-y divide-gray-200 dark:divide-[#333]">
                        {technicalSkills.map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{skill.name}</span>
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                </div>
                                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                                    {skill.proficiency}
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button 
                                        onClick={() => {
                                            setSkillModalType("technical");
                                            setSkillEditIndex(index);
                                            setSkillModalOpen(true);
                                        }}
                                        className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleSkillDelete("technical", index)}
                                        disabled={isDeleting}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                        <Upload className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Languages Section */}
            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Languages</h2>
                    <button
                        onClick={() => {
                            setSkillModalType("language");
                            setSkillEditIndex(null);
                            setSkillModalOpen(true);
                        }}
                        className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                    >
                        + Add new
                    </button>
                </div>
                
                {languages.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any Languages yet.
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-[#1D1E23] rounded-lg border border-gray-100 dark:border-[#333] divide-y divide-gray-200 dark:divide-[#333]">
                        {languages.map((lang: any, index: number) => (
                            <div key={index} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{lang.name}</span>
                                </div>
                                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                                    {lang.proficiency}
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button 
                                        onClick={() => {
                                            setSkillModalType("language");
                                            setSkillEditIndex(index);
                                            setSkillModalOpen(true);
                                        }}
                                        className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleSkillDelete("language", index)}
                                        disabled={isDeleting}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Subjects Section */}
            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Subjects</h2>
                    <button
                        onClick={() => {
                            setSkillModalType("subject");
                            setSkillEditIndex(null);
                            setSkillModalOpen(true);
                        }}
                        className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                    >
                        + Add new
                    </button>
                </div>
                
                {subjects.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any Subjects yet.
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-[#1D1E23] rounded-lg border border-gray-100 dark:border-[#333] divide-y divide-gray-200 dark:divide-[#333]">
                        {subjects.map((sub: any, index: number) => (
                            <div key={index} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{sub.name}</span>
                                </div>
                                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                                    {sub.proficiency}
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button 
                                        onClick={() => {
                                            setSkillModalType("subject");
                                            setSkillEditIndex(index);
                                            setSkillModalOpen(true);
                                        }}
                                        className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleSkillDelete("subject", index)}
                                        disabled={isDeleting}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <SkillModal
                open={skillModalOpen}
                onOpenChange={setSkillModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
                editIndex={skillEditIndex}
                type={skillModalType}
            />
        </div>
    );
}

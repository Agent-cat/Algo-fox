"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Upload, AlertCircle } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface ProjectsSettingsClientProps {
    user: any;
}

export function ProjectsSettingsClient({ user }: ProjectsSettingsClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const details = user.experienceDetails || {};
    const projects = details.projects || [];

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        
        setIsDeleting(true);
        try {
            const updatedProjects = [...projects];
            updatedProjects.splice(index, 1);
            
            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    projects: updatedProjects
                }
            });

            if (res.success) {
                toast.success("Project deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete project");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDateRange = (start: string, end: string, currentlyWorking: boolean) => {
        const formatMonthYear = (dateString: string) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        };

        const startStr = formatMonthYear(start);
        const endStr = currentlyWorking ? "Present" : formatMonthYear(end);
        return `${startStr} - ${endStr}`;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Projects</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your personal, academic, and work-related projects.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Projects List</h2>
                    <div className="flex items-center gap-4">
                        {projects.length === 0 && (
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!details.projectsNone}
                                    onChange={async (e) => {
                                        const checked = e.target.checked;
                                        try {
                                            const res = await updateUserInfo({
                                                experienceDetails: {
                                                    ...details,
                                                    projectsNone: checked
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
                </div>
                
                {projects.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any projects yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((project: any, index: number) => (
                            <div key={index} className="p-6 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg tracking-tight">{project.title}</h3>
                                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-500/25">
                                                {project.domain}
                                            </span>
                                            {project.associatedWith && project.associatedWith !== "None" && (
                                                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 dark:bg-[#262626] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                                                    {project.associatedWith} Project
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                            {formatDateRange(project.startDate, project.endDate, project.currentlyWorking)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 shrink-0">
                                        <button 
                                            onClick={() => {
                                                setEditingIndex(index);
                                                setIsModalOpen(true);
                                            }}
                                            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-1"
                                            title="Edit"
                                        >
                                            <Pencil className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            disabled={isDeleting}
                                            className="hover:text-red-500 transition-colors p-1"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                        <button 
                                            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-1"
                                            title="Upload Document"
                                        >
                                            <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                                
                                {project.description && (
                                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap pl-1">
                                        {project.description}
                                    </div>
                                )}

                                {(project.githubLink || project.liveDemoLink) && (
                                    <div className="flex flex-wrap items-center gap-4 pt-2 pl-1 text-sm font-semibold">
                                        {project.githubLink && (
                                            <a 
                                                href={project.githubLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 transition-colors"
                                            >
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                GitHub Repository
                                            </a>
                                        )}
                                        {project.liveDemoLink && (
                                            <a 
                                                href={project.liveDemoLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
                editIndex={editingIndex}
            />
        </div>
    );
}

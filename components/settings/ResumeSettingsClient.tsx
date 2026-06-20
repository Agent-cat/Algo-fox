"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Trash2, Download, Pencil, MoreHorizontal, Star, FileText, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";
import { EditResumeModal } from "./EditResumeModal";
import Image from "next/image";

interface ResumeSettingsClientProps {
    user: any;
}

export function ResumeSettingsClient({ user }: ResumeSettingsClientProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const details = user.experienceDetails || {};
    const resumes = details.resumes || [];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload-resume", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();
            if (!uploadRes.ok || !data.success) {
                throw new Error(data.error || "Failed to upload resume");
            }

            const newResume = {
                title: file.name,
                url: data.url,
                tag: "General",
                isPrimary: resumes.length === 0, // make primary if first
                createdAt: new Date().toISOString()
            };

            const updatedResumes = [...resumes, newResume];
            
            const dbRes = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    resumes: updatedResumes
                }
            });

            if (dbRes.success) {
                toast.success("Resume uploaded successfully");
                router.refresh();
            } else {
                throw new Error(dbRes.error || "Failed to save resume metadata");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred during upload");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to delete this resume?")) return;
        
        try {
            const updatedResumes = [...resumes];
            updatedResumes.splice(index, 1);
            
            // if we deleted the primary, make the first remaining one primary
            if (resumes[index].isPrimary && updatedResumes.length > 0) {
                updatedResumes[0].isPrimary = true;
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    resumes: updatedResumes
                }
            });

            if (res.success) {
                toast.success("Resume deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete resume");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const toggleMenu = (index: number) => {
        if (openMenuIndex === index) {
            setOpenMenuIndex(null);
        } else {
            setOpenMenuIndex(index);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10" onClick={() => setOpenMenuIndex(null)}>
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    My Resume 
                    <span title="Upload and manage your resumes" className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-gray-400 cursor-help" />
                    </span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your resumes. Upload PDF format only (max 5MB).
                </p>
            </div>

            <div className="pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex justify-end mb-6">
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-2.5 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-xl font-bold transition-colors text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>+ Add new</span>}
                    </button>
                </div>
                
                {resumes.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-12 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-2xl">
                        You have not uploaded any resumes yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume: any, index: number) => (
                            <div key={index} className="border border-gray-200 dark:border-[#333] rounded-2xl p-5 flex items-start gap-4 bg-white dark:bg-[#1D1E23] hover:shadow-md transition-shadow relative">
                                
                                <div className="flex-shrink-0 relative">
                                    <div className="w-12 h-14 bg-gray-200 dark:bg-gray-800 rounded flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-4 h-4 bg-white dark:bg-[#1D1E23] transform translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-b border-gray-200 dark:border-gray-800"></div>
                                        <div className="mt-auto bg-red-500 text-white text-[10px] font-bold text-center py-0.5 uppercase tracking-wider rounded-b">
                                            PDF
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-0 pr-6">
                                    <div className="text-xs font-bold text-emerald-500 mb-1">{resume.tag}</div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate" title={resume.title}>
                                            {resume.title.length > 20 ? resume.title.substring(0, 8) + "..." + resume.title.slice(-8) : resume.title}
                                        </h3>
                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        {resume.isPrimary && (
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Created at {formatDate(resume.createdAt)}
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMenu(index);
                                        }}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-500"
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>

                                    {openMenuIndex === index && (
                                        <div 
                                            className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#262626] rounded-xl shadow-lg border border-gray-100 dark:border-[#333] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-100"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button 
                                                onClick={() => {
                                                    setEditingIndex(index);
                                                    setEditModalOpen(true);
                                                    setOpenMenuIndex(null);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#333] flex items-center gap-2 transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </button>
                                            <a 
                                                href={resume.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#333] flex items-center gap-2 transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> Download
                                            </a>
                                            <button 
                                                onClick={() => handleDelete(index)}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <EditResumeModal
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
                editIndex={editingIndex}
            />
        </div>
    );
}

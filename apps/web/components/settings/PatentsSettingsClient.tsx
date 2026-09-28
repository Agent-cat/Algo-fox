"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Upload, AlertCircle } from "lucide-react";
import { PatentModal } from "./PatentModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface PatentsSettingsClientProps {
    user: any;
    readonly?: boolean;
}

export function PatentsSettingsClient({ user, readonly = false }: PatentsSettingsClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const details = user.experienceDetails || {};
    const patents = details.patents || [];

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to delete this patent?")) return;
        
        setIsDeleting(true);
        try {
            const updatedPatents = [...patents];
            updatedPatents.splice(index, 1);
            
            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    patents: updatedPatents
                }
            });

            if (res.success) {
                toast.success("Patent deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete patent");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Patents</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your patents and intellectual property.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Patents List</h2>
                    {!readonly && (
                        <div className="flex items-center gap-4">
                            {patents.length === 0 && (
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!!details.patentsNone}
                                        onChange={async (e) => {
                                            const checked = e.target.checked;
                                            try {
                                                const res = await updateUserInfo({
                                                    experienceDetails: {
                                                        ...details,
                                                        patentsNone: checked
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
                
                {patents.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any patents yet.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {patents.map((patent: any, index: number) => (
                            <div key={index} className="pb-8 pt-2 first:pt-0 border-b border-gray-200 dark:border-[#333] last:border-0 last:pb-0">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{patent.title}</h3>
                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {patent.patentOffice} | {patent.patentStatus}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            App No: {patent.applicationNumber} | Filed: {formatDate(patent.filingDate)}
                                            {patent.issueDate && ` | Issued: ${formatDate(patent.issueDate)}`}
                                        </div>
                                    </div>
                                    {!readonly && (
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
                                                title="Upload Document"
                                            >
                                                <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                {patent.description && (
                                    <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                                        {patent.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <PatentModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
                editIndex={editingIndex}
            />
        </div>
    );
}

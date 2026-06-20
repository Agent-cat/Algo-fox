"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface EditResumeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex: number | null;
}

export function EditResumeModal({ open, onOpenChange, user, onSuccess, editIndex }: EditResumeModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const details = user.experienceDetails || {};
    const resumes = details.resumes || [];
    
    const isEditing = editIndex !== undefined && editIndex !== null;
    const editingResume = isEditing ? resumes[editIndex] : null;

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            tag: "",
            isPrimary: false,
        }
    });

    useEffect(() => {
        if (open) {
            if (isEditing && editingResume) {
                reset({
                    title: editingResume.title || "",
                    tag: editingResume.tag || "",
                    isPrimary: editingResume.isPrimary || false,
                });
            } else {
                reset({
                    title: "",
                    tag: "",
                    isPrimary: false,
                });
            }
        }
    }, [open, isEditing, editingResume, reset]);

    const onSubmit = async (data: any) => {
        if (!isEditing || editIndex === null) return;
        
        setIsLoading(true);
        try {
            const updatedResumes = [...resumes];
            
            // If marking this as primary, unmark others
            if (data.isPrimary) {
                updatedResumes.forEach(r => r.isPrimary = false);
            }
            
            updatedResumes[editIndex] = {
                ...updatedResumes[editIndex],
                title: data.title,
                tag: data.tag,
                isPrimary: data.isPrimary
            };

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    resumes: updatedResumes
                }
            });

            if (res?.success) {
                toast.success("Resume updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res?.error || "Failed to update resume");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl  overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <SheetTitle className="text-center text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                            Edit Resume Details
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume Name *</label>
                            <input {...register("title")} required className={inputClasses} placeholder="E.g., Vishn...sume_new" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tag</label>
                            <input {...register("tag")} className={inputClasses} placeholder="E.g., IT Product, Core" />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" {...register("isPrimary")} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-600 dark:text-gray-300">Mark as Primary Resume</span>
                            </label>
                            <p className="text-xs text-gray-400 mt-1 pl-8">Your primary resume is shown by default to recruiters.</p>
                        </div>
                    </div>

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-colors flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

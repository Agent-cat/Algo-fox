"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";

interface AcademicEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
}

export function AcademicEditModal({ open, onOpenChange, user, onSuccess }: AcademicEditModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            collegeName: user.collegeName || user.institutionName || "",
            collegeId: user.collegeId || "",
            branch: user.branch || ""
        }
    });

    useEffect(() => {
        if (open) {
            reset({
                collegeName: user.collegeName || user.institutionName || "",
                collegeId: user.collegeId || "",
                branch: user.branch || ""
            });
        }
    }, [open, reset, user]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await updateUserInfo({
                collegeName: data.collegeName || undefined,
                collegeId: data.collegeId || undefined,
                branch: data.branch || undefined
            });

            if (res.success) {
                toast.success("Academic details updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res.error || "Failed to update academic details");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <DialogTitle className="text-center text-lg font-bold text-gray-800 dark:text-gray-100">Edit Academic Details</DialogTitle>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                College Name
                            </label>
                            <input 
                                {...register("collegeName")} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                            />
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                College ID / Roll No
                            </label>
                            <input 
                                {...register("collegeId")} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                            />
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Branch / Specialization
                            </label>
                            <input 
                                {...register("branch")} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                            />
                        </div>
                    </div>

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-2.5 border border-orange-600 text-orange-600 dark:text-orange-500 font-medium rounded-full flex items-center transition-colors shadow-sm hover:bg-orange-50 dark:hover:bg-orange-900/10"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Save
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

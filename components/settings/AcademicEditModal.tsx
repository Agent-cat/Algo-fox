"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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

    const labelClasses = "absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400";
    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        "Academic Details"
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 space-y-6">
                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                College Name
                            </label>
                            <input 
                                {...register("collegeName")} 
                                className={inputClasses} 
                            />
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                College ID / Roll No
                            </label>
                            <input 
                                {...register("collegeId")} 
                                className={inputClasses} 
                            />
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Branch / Specialization
                            </label>
                            <input 
                                {...register("branch")} 
                                className={inputClasses} 
                            />
                        </div>
                    </div>

                    <div className="p-8 pt-4 flex justify-end gap-3 mt-auto">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="px-8 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 rounded-full text-[15px] font-medium transition-colors"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-2.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-[15px] font-medium transition-colors flex items-center justify-center min-w-[120px]"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                        </button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

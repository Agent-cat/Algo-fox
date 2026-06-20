"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface SkillModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
    type: "technical" | "language" | "subject";
}

const config = {
    technical: {
        title: "Add New Skills",
        inputLabel: "Select a Skillset *",
        proficiencies: ["Beginner", "Intermediate", "Advance"],
        dataKey: "technicalSkills"
    },
    language: {
        title: "Add New Language",
        inputLabel: "Add a Language *",
        proficiencies: ["Basic", "Intermediate", "Proficient", "Fluent", "Native"],
        dataKey: "languages"
    },
    subject: {
        title: "Add New Subject",
        inputLabel: "Select a Subject *",
        proficiencies: ["Beginner", "Intermediate", "Advance"],
        dataKey: "subjects"
    }
};

export function SkillModal({ open, onOpenChange, user, onSuccess, editIndex, type }: SkillModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    
    const details = user?.experienceDetails || {};
    const { dataKey, title, inputLabel, proficiencies } = config[type];
    
    const itemsList = details[dataKey] || [];
    const editingData = editIndex !== undefined && editIndex !== null ? itemsList[editIndex] : {};

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: editingData?.name || "",
            proficiency: editingData?.proficiency || ""
        }
    });

    // We use JSON.stringify(editingData) to avoid object reference changing causing infinite loop
    useEffect(() => {
        if (open) {
            reset({
                name: editingData?.name || "",
                proficiency: editingData?.proficiency || ""
            });
        } else {
            reset({ name: "", proficiency: "" });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, editIndex, reset, JSON.stringify(editingData)]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            let updatedItems = [...itemsList];
            
            if (editIndex !== undefined && editIndex !== null) {
                updatedItems[editIndex] = data;
            } else {
                updatedItems.push(data);
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    [dataKey]: updatedItems
                }
            });

            if (res.success) {
                toast.success("Saved successfully");
                onOpenChange(false);
                onSuccess();
            } else {
                toast.error(res.error || "Failed to save");
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
                <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        {title}
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className={labelClasses}>{inputLabel}</label>
                            <input
                                {...register("name", { required: true })}
                                placeholder={`e.g. Enter ${title.split(" ")[2]}`}
                                className={inputClasses}
                            />
                        </div>
                        <div className="relative">
                            <label className={labelClasses}>Select Proficiency *</label>
                            <select
                                {...register("proficiency", { required: true })}
                                className={`${inputClasses} appearance-none`}
                                defaultValue=""
                            >
                                <option value="" disabled hidden>Select Proficiency</option>
                                {proficiencies.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
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

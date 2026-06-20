"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";

interface AboutEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
}

export function AboutEditModal({ open, onOpenChange, user, onSuccess }: AboutEditModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Naive split for name just for initial value
    const nameParts = user.name ? user.name.split(" ") : [];
    const initialFirstName = nameParts[0] || "";
    const initialLastName = nameParts.slice(1).join(" ") || "";

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: initialFirstName,
            lastName: initialLastName,
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
            gender: user.gender || "",
            collegeName: user.collegeName || user.institutionName || ""
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const fullName = `${data.firstName} ${data.lastName}`.trim();
            const res = await updateUserInfo({
                name: fullName,
                dateOfBirth: data.dateOfBirth || undefined,
                gender: data.gender || undefined,
                collegeName: data.collegeName || undefined
            });

            if (res.success) {
                toast.success("About info updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res.error || "Failed to update about info");
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
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        "About Info"
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    First Name *
                                </label>
                                <input 
                                    {...register("firstName", { required: "First name is required" })} 
                                    className={inputClasses} 
                                />
                                {errors.firstName && <span className="absolute -bottom-5 left-1 text-red-500 text-[10px]">{(errors.firstName as any).message}</span>}
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Last Name
                                </label>
                                <input 
                                    {...register("lastName")} 
                                    className={inputClasses} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Date of Birth
                                </label>
                                <input 
                                    type="date"
                                    {...register("dateOfBirth")} 
                                    className={inputClasses} 
                                />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Gender
                                </label>
                                <select 
                                    {...register("gender")} 
                                    className={inputClasses}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Current/Latest College
                            </label>
                            <input 
                                {...register("collegeName")} 
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

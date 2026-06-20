"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <DialogTitle className="text-center text-lg font-bold text-gray-800 dark:text-gray-100">Edit About Info</DialogTitle>
                    </DialogHeader>

                    <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    First Name *
                                </label>
                                <input 
                                    {...register("firstName", { required: "First name is required" })} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                                />
                                {errors.firstName && <span className="absolute -bottom-5 left-1 text-red-500 text-[10px]">{(errors.firstName as any).message}</span>}
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Last Name
                                </label>
                                <input 
                                    {...register("lastName")} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                                />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Gender
                                </label>
                                <select 
                                    {...register("gender")} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200"
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" 
                            />
                        </div>
                    </div>

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full flex items-center transition-colors shadow-sm"
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

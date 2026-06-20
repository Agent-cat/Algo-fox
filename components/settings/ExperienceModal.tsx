"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface ExperienceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
}

export function ExperienceModal({ open, onOpenChange, user, onSuccess, editIndex }: ExperienceModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const details = user?.experienceDetails || {};
    const experiences = details.experiences || [];
    const editingData = editIndex !== undefined && editIndex !== null ? experiences[editIndex] : {};

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            companyName: editingData?.companyName || "",
            companySector: editingData?.companySector || "",
            jobTitle: editingData?.jobTitle || "",
            jobLocation: editingData?.jobLocation || "",
            positionType: editingData?.positionType || "",
            jobFunction: editingData?.jobFunction || "",
            tag: editingData?.tag || "",
            startDate: editingData?.startDate || "",
            endDate: editingData?.endDate || "",
            salary: editingData?.salary || "",
            currentlyWorkHere: editingData?.currentlyWorkHere || false,
            mandatoryInternship: editingData?.mandatoryInternship || false,
            description: editingData?.description || ""
        }
    });

    useEffect(() => {
        if (open) {
            reset({
                companyName: editingData?.companyName || "",
                companySector: editingData?.companySector || "",
                jobTitle: editingData?.jobTitle || "",
                jobLocation: editingData?.jobLocation || "",
                positionType: editingData?.positionType || "",
                jobFunction: editingData?.jobFunction || "",
                tag: editingData?.tag || "",
                startDate: editingData?.startDate || "",
                endDate: editingData?.endDate || "",
                salary: editingData?.salary || "",
                currentlyWorkHere: editingData?.currentlyWorkHere || false,
                mandatoryInternship: editingData?.mandatoryInternship || false,
                description: editingData?.description || ""
            });
        } else if (!open) {
            // Optional: clear form on close so it doesn't flash old data next time
            reset({
                companyName: "",
                companySector: "",
                jobTitle: "",
                jobLocation: "",
                positionType: "",
                jobFunction: "",
                tag: "",
                startDate: "",
                endDate: "",
                salary: "",
                currentlyWorkHere: false,
                mandatoryInternship: false,
                description: ""
            });
        }
    }, [open, editIndex, reset]); // Removed experiences from dependency to avoid loop/unnecessary resets

    const isCurrentlyWorking = watch("currentlyWorkHere");

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            let updatedExperiences = [...experiences];
            
            const newData = { ...data };

            if (editIndex !== undefined && editIndex !== null) {
                // Edit existing
                updatedExperiences[editIndex] = newData;
            } else {
                // Add new
                updatedExperiences.push(newData);
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    experiences: updatedExperiences
                }
            });

            if (res?.success) {
                toast.success("Experience details saved successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res?.error || "Failed to save");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";    const labelClasses = "absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        "Experience"
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={labelClasses}>Search Company Name *</label>                                <input {...register("companyName")} required className={inputClasses} placeholder="Company Name" />
                            </div>
                            <div className="relative">
                                <label className={labelClasses}>Select Company Sector *</label>
                                <select {...register("companySector")} required className={inputClasses}>
                                    <option value="">Select Sector</option>
                                    <option value="Computer Science - Software - IT">Computer Science - Software - IT</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={labelClasses}>Enter Job Title *</label>                                <input {...register("jobTitle")} required className={inputClasses} placeholder="e.g. Technical Expert" />
                            </div>
                            <div className="relative">
                                <label className={labelClasses}>Enter Job Location *</label>                                <input {...register("jobLocation")} required className={inputClasses} placeholder="e.g. India" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={labelClasses}>Select Position Type *</label>
                                <select {...register("positionType")} required className={inputClasses}>
                                    <option value="">Select Type</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                            <div className="relative">
                                <label className={labelClasses}>Select Job Function *</label>
                                <select {...register("jobFunction")} required className={inputClasses}>
                                    <option value="">Select Function</option>
                                    <option value="Engineering - Web / Software">Engineering - Web / Software</option>
                                    <option value="Data Science / AI">Data Science / AI</option>
                                    <option value="Design">Design</option>
                                    <option value="Product Management">Product Management</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="relative w-1/2 pr-3">
                                <label className={labelClasses}>Select a tag</label>
                                <select {...register("tag")} className={inputClasses}>
                                    <option value="">Select tag</option>
                                    <option value="Remote">Remote</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={labelClasses}>Select Start Date *</label>
                                <input {...register("startDate")} type="date" required className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className={labelClasses}>Select End Date {!isCurrentlyWorking && "*"}</label>
                                <input {...register("endDate")} type="date" required={!isCurrentlyWorking} disabled={isCurrentlyWorking} className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className={labelClasses}>Select Salary/Stipend Range *</label>
                                <select {...register("salary")} required className={inputClasses}>
                                    <option value="">Select Range</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Below ₹10,000">Below ₹10,000</option>
                                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" {...register("currentlyWorkHere")} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-700 dark:text-gray-300">I currently work here</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" {...register("mandatoryInternship")} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-700 dark:text-gray-300">Mandatory internship for college curriculum</span>
                            </label>
                        </div>

                        <div className="relative pt-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description (Enter each point on a new line)
                            </label>
                            <textarea 
                                {...register("description")} 
                                rows={6}
                                className={inputClasses}
                                placeholder="• Developed Midland, a full real-estate platform...&#10;• Built and maintained RESTful APIs..."
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

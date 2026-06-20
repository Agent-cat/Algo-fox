"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

interface PreviousEducationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
}

export function PreviousEducationModal({ open, onOpenChange, user, onSuccess, editIndex }: PreviousEducationModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const currentDetails = user?.educationDetails || {};
    const previousEducations = currentDetails.previousEducations || [];
    const editingData = editIndex !== undefined && editIndex !== null ? previousEducations[editIndex] : {};

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            schoolName: editingData?.schoolName || "",
            program: editingData?.program || "",
            board: editingData?.board || "",
            branch: editingData?.branch || "",
            startYear: editingData?.startYear || "",
            endYear: editingData?.endYear || "",
            educationType: editingData?.educationType || "Full Time",
            score: editingData?.score || "",
            scoreType: editingData?.scoreType || "%",
            notes: editingData?.notes || "",
            totalSemesters: editingData?.totalSemesters || "0",
            semesters: editingData?.semesters || [
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" }
            ]
        }
    });

    useEffect(() => {
        if (open) {
            reset({
                schoolName: editingData?.schoolName || "",
                program: editingData?.program || "",
                board: editingData?.board || "",
                branch: editingData?.branch || "",
                startYear: editingData?.startYear || "",
                endYear: editingData?.endYear || "",
                educationType: editingData?.educationType || "Full Time",
                score: editingData?.score || "",
                scoreType: editingData?.scoreType || "%",
                notes: editingData?.notes || "",
                totalSemesters: editingData?.totalSemesters || "0",
                semesters: editingData?.semesters || [
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" }
                ]
            });
        } else if (!open) {
            reset({
                schoolName: "",
                program: "",
                board: "",
                branch: "",
                startYear: "",
                endYear: "",
                educationType: "Full Time",
                score: "",
                scoreType: "%",
                notes: "",
                totalSemesters: "0",
                semesters: [
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" },
                    { cgpa: "", sgpa: "", totalBacklogs: "0", ongoingBacklogs: "0" }
                ]
            });
        }
    }, [open, editIndex, reset]);

    const totalSemStr = watch("totalSemesters");
    const totalSemNum = Math.max(0, Math.min(8, parseInt(String(totalSemStr).replace(/\D/g, '') || "0", 10)));

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            let updatedPreviousEducations = [...previousEducations];
            
            const newData = {
                schoolName: data.schoolName,
                program: data.program,
                board: data.board,
                branch: data.branch,
                startYear: data.startYear,
                endYear: data.endYear,
                educationType: data.educationType,
                score: data.score,
                scoreType: data.scoreType,
                notes: data.notes,
                totalSemesters: data.totalSemesters,
                semesters: data.semesters
            };

            if (editIndex !== undefined && editIndex !== null) {
                // Edit existing
                updatedPreviousEducations[editIndex] = newData;
            } else {
                // Add new
                updatedPreviousEducations.push(newData);
            }

            const { updateUserInfo } = await import("@/actions/user.action");

            const res = await updateUserInfo({
                educationDetails: {
                    ...currentDetails,
                    previousEducations: updatedPreviousEducations
                }
            });

            if (res?.success) {
                toast.success("Education details saved successfully");
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

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        "Education Details"
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    School/Institution Name *
                                </label>
                                <input {...register("schoolName")} className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Select Program/Degree/certificate *
                                </label>
                                <select {...register("program")} className={inputClasses}>
                                    <option value="">Select Program</option>
                                    <option value="CLASS X">CLASS X</option>
                                    <option value="CLASS XII">CLASS XII</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="UG">UG (Undergraduate)</option>
                                    <option value="PG">PG (Postgraduate)</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="M.Tech">M.Tech</option>
                                    <option value="Ph.D">Ph.D</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Board/University *
                                </label>                                <input {...register("board")} placeholder="e.g. CBSE, State Board, University Name" className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Branch/Specialization
                                </label>                                <input {...register("branch")} placeholder="e.g. Science, Computer Science" className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Start Year *
                                </label>                                <input {...register("startYear")} type="number" placeholder="YYYY" min="1990" max="2030" className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    End Year *
                                </label>                                <input {...register("endYear")} type="number" placeholder="YYYY" min="1990" max="2030" className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Select Education Type *
                                </label>
                                <select {...register("educationType")} className={inputClasses}>
                                    <option value="Full Time">Full Time</option>
                                </select>
                            </div>
                            <div className="relative flex">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400 z-10">
                                    Score in Percentage *
                                </label>
                                <input {...register("score")} className="w-2/3 px-4 py-3 border border-r-0 border-gray-200 rounded-l-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
                                <select {...register("scoreType")} className="w-1/3 px-4 py-3 border border-l-0 border-gray-200 rounded-r-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50 dark:bg-gray-800 text-sm transition-colors text-gray-800 dark:text-gray-200 font-medium">
                                    <option value="%">%</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative pt-2">
                            <label className="absolute top-0 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Notes/Highlights
                            </label>
                            <input {...register("notes")} className={inputClasses} />
                            <p className="text-xs text-gray-400 mt-1 ml-1">You can mention your class/department/university ranks or other highlights, if any</p>
                        </div>

                        <div className="pt-2">
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                                Semester-wise Details (Optional)
                            </label>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Total Semesters
                                </label>
                                <select {...register("totalSemesters")} className={inputClasses}>
                                    <option value="0">None (I don't have semester-wise data)</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                        <option key={num} value={num}>{num} Semesters</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {totalSemNum > 0 && (
                            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-[#333]">
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 text-xs font-bold text-gray-500 text-center">
                                    <div className="text-left">Performance</div>
                                    <div>CGPA</div>
                                    <div>SGPA</div>
                                    <div className="col-span-2">Backlog Details</div>
                                </div>
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 text-[10px] text-gray-400 text-center -mt-2">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div>Total</div>
                                    <div>Ongoing</div>
                                </div>

                                {Array.from({ length: totalSemNum }).map((_, idx) => {
                                    const sem = idx + 1;
                                    return (
                                        <div key={sem} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Semester {sem}</div>
                                            <div className="relative">
                                                <input {...register(`semesters.${sem - 1}.cgpa` as any)} className="w-full px-3 py-2 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm text-center" />
                                            </div>
                                            <div className="relative">
                                                <input {...register(`semesters.${sem - 1}.sgpa` as any)} className="w-full px-3 py-2 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm text-center" />
                                            </div>
                                            <div className="relative">
                                                <input {...register(`semesters.${sem - 1}.totalBacklogs` as any)} className="w-full px-3 py-2 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm text-center" />
                                            </div>
                                            <div className="relative">
                                                <input {...register(`semesters.${sem - 1}.ongoingBacklogs` as any)} className="w-full px-3 py-2 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm text-center" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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

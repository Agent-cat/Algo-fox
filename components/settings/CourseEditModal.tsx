"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, X, Pencil } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";

interface CourseEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
}

export function CourseEditModal({ open, onOpenChange, user, onSuccess }: CourseEditModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const details = user?.educationDetails || {};
    const currentCourse = details.currentCourse || {};

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            courseName: currentCourse.courseName || "",
            degree: currentCourse.degree || "",
            institution: currentCourse.institution || "",
            department: currentCourse.department || "",
            branch: currentCourse.branch || "",
            passoutBatch: currentCourse.passoutBatch || "",
            currentSemester: currentCourse.currentSemester || "1",
            rollNo: currentCourse.rollNo || "",
            startDate: currentCourse.startDate || "",
            endDate: currentCourse.endDate || "",
            score: currentCourse.cgpa || "",
            scoreType: "CGPA",
            percentage: currentCourse.percentage || "",
            percentageType: "Percentage",
            notes: currentCourse.notes || "",
            isLateral: currentCourse.isLateral || false,
            hasBacklogs: currentCourse.hasBacklogs || false,
            ongoingBacklogs: currentCourse.ongoingBacklogs || "0",
            totalBacklogs: currentCourse.totalBacklogs || "0",
            semesters: currentCourse.semesters || [
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

    const currentSemStr = watch("currentSemester");
    const currentSemNum = Math.max(1, Math.min(8, parseInt(String(currentSemStr).replace(/\D/g, '') || "1", 10)));

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const currentDetails = user?.educationDetails || {};
            const updatedCurrentCourse = {
                ...currentDetails.currentCourse,
                courseName: data.courseName,
                degree: data.degree,
                institution: data.institution,
                department: data.department,
                branch: data.branch,
                passoutBatch: data.passoutBatch,
                currentSemester: data.currentSemester,
                rollNo: data.rollNo,
                startDate: data.startDate,
                endDate: data.endDate,
                cgpa: data.scoreType === "CGPA" ? data.score : undefined,
                percentage: data.percentage,
                notes: data.notes,
                isLateral: data.isLateral,
                hasBacklogs: data.hasBacklogs,
                ongoingBacklogs: data.ongoingBacklogs,
                totalBacklogs: data.totalBacklogs,
                semesters: data.semesters
            };
            
            const res = await updateUserInfo({
                educationDetails: {
                    ...currentDetails,
                    currentCourse: updatedCurrentCourse
                }
            });

            if (res?.success) {
                toast.success("Course details updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res?.error || "Something went wrong");
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
                        Update Course Details
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Institution Name *
                                </label>
                                <input {...register("institution")} className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Course Name *
                                </label>                                <input {...register("courseName")} placeholder="e.g. Computer Science and IT" className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Degree *
                                </label>
                                <select {...register("degree")} className={inputClasses}>
                                    <option value="">Select Degree</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="M.Tech">M.Tech</option>
                                    <option value="B.Sc">B.Sc</option>
                                    <option value="M.Sc">M.Sc</option>
                                    <option value="B.Com">B.Com</option>
                                    <option value="B.A">B.A</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Ph.D">Ph.D</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Department *
                                </label>
                                <input {...register("department")} className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Branch/Specialization *
                                </label>
                                <input {...register("branch")} className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Passout Batch (Year) *
                                </label>
                                <input {...register("passoutBatch")} type="number" className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Select Current Semester *
                                </label>
                                <select {...register("currentSemester")} className={inputClasses}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                        <option key={num} value={num}>Semester {num}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Institute Roll No. *
                                </label>
                                <input {...register("rollNo")} className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Select Course Start Date *
                                </label>
                                <input type="date" {...register("startDate")} className={inputClasses} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                    Select Course End Date *
                                </label>
                                <input type="date" {...register("endDate")} className={inputClasses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative flex">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400 z-10">
                                    Your Score *
                                </label>
                                <input {...register("score")} className="w-2/3 px-4 py-3 border border-r-0 border-gray-200 rounded-l-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
                                <select {...register("scoreType")} className="w-1/3 px-4 py-3 border border-l-0 border-gray-200 rounded-r-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50 dark:bg-gray-800 text-sm transition-colors text-gray-800 dark:text-gray-200 font-medium">
                                    <option value="CGPA">CGPA</option>
                                    <option value="SGPA">SGPA</option>
                                </select>
                            </div>
                            <div className="relative flex">
                                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400 z-10">
                                    Percentage Equivalent *
                                </label>
                                <input {...register("percentage")} className="w-2/3 px-4 py-3 border border-r-0 border-gray-200 rounded-l-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
                                <select {...register("percentageType")} className="w-1/3 px-4 py-3 border border-l-0 border-gray-200 rounded-r-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50 dark:bg-gray-800 text-sm transition-colors text-gray-800 dark:text-gray-200 font-medium">
                                    <option value="Percentage">Percentage</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Notes/Highlights
                            </label>
                            <input {...register("notes")} className={inputClasses} />
                            <p className="text-xs text-gray-400 mt-1 ml-1">You can mention your class/college ranks or other highlights, if any</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" {...register("isLateral")} className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                            <label className="text-sm text-gray-700 dark:text-gray-300">I am a lateral entry student in this course.</label>
                        </div>

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

                            {Array.from({ length: currentSemNum }).map((_, idx) => {
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

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-[#333]">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" {...register("hasBacklogs")} className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                                <label className="text-sm font-bold text-gray-900 dark:text-gray-100">I have backlog(s)</label>
                            </div>
                            <p className="text-xs text-orange-500 font-medium">(Check this box if you have any past or ongoing backlog)</p>

                            <div className="grid grid-cols-2 gap-6 pt-2">
                                <div className="relative">
                                    <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                        Ongoing Backlogs *
                                    </label>
                                    <input type="number" {...register("ongoingBacklogs")} className={inputClasses} />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                        Total Backlogs *
                                    </label>
                                    <input type="number" {...register("totalBacklogs")} className={inputClasses} />
                                </div>
                            </div>
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

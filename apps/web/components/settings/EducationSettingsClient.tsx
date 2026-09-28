"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { GraduationCap, Pencil, Upload, FileText, Loader2 } from "lucide-react";
import { CourseEditModal } from "./CourseEditModal";
import { PreviousEducationModal } from "./PreviousEducationModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface EducationSettingsClientProps {
    user: any;
    readonly?: boolean;
}

export function EducationSettingsClient({ user, readonly = false }: EducationSettingsClientProps) {
    const router = useRouter();
    const [isCourseEditOpen, setIsCourseEditOpen] = useState(false);
    const [isPrevEdOpen, setIsPrevEdOpen] = useState(false);
    const [editingPrevEdIndex, setEditingPrevEdIndex] = useState<number | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadTarget, setUploadTarget] = useState<{ type: 'current_marksheet' | 'current_semester_doc' | 'prev_marksheet' | 'prev_semester_doc', eduIndex?: number, semesterIndex?: number } | null>(null);

    // Default or parsed values
    const details = user.educationDetails || {};
    const currentCourse = details.currentCourse || {};
    const previousEducations = details.previousEducations || [];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uploadTarget) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            
            const uploadRes = await fetch("/api/upload-document", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();
            if (!uploadRes.ok || !data.success) {
                throw new Error(data.error || "Failed to upload document");
            }

            const url = data.url;
            const updatedDetails = JSON.parse(JSON.stringify(details));

            if (uploadTarget.type === 'current_marksheet') {
                updatedDetails.currentCourse = updatedDetails.currentCourse || {};
                updatedDetails.currentCourse.marksheetUrl = url;
            } else if (uploadTarget.type === 'current_semester_doc') {
                updatedDetails.currentCourse = updatedDetails.currentCourse || {};
                updatedDetails.currentCourse.semesters = updatedDetails.currentCourse.semesters || [];
                if (!updatedDetails.currentCourse.semesters[uploadTarget.semesterIndex!]) {
                    updatedDetails.currentCourse.semesters[uploadTarget.semesterIndex!] = {};
                }
                updatedDetails.currentCourse.semesters[uploadTarget.semesterIndex!].attachedDocumentUrl = url;
            } else if (uploadTarget.type === 'prev_marksheet') {
                updatedDetails.previousEducations[uploadTarget.eduIndex!].marksheetUrl = url;
            } else if (uploadTarget.type === 'prev_semester_doc') {
                updatedDetails.previousEducations[uploadTarget.eduIndex!].semesters = updatedDetails.previousEducations[uploadTarget.eduIndex!].semesters || [];
                if (!updatedDetails.previousEducations[uploadTarget.eduIndex!].semesters[uploadTarget.semesterIndex!]) {
                    updatedDetails.previousEducations[uploadTarget.eduIndex!].semesters[uploadTarget.semesterIndex!] = {};
                }
                updatedDetails.previousEducations[uploadTarget.eduIndex!].semesters[uploadTarget.semesterIndex!].attachedDocumentUrl = url;
            }

            const dbRes = await updateUserInfo({
                educationDetails: updatedDetails
            });

            if (dbRes.success) {
                toast.success("Document uploaded successfully");
                router.refresh();
            } else {
                throw new Error(dbRes.error || "Failed to save document metadata");
            }

        } catch (error: any) {
            toast.error(error.message || "An error occurred during upload");
        } finally {
            setIsUploading(false);
            setUploadTarget(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf,image/jpeg,image/png,image/webp" />
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Education Details</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your current and previous educational qualifications.
                </p>
            </div>

            <div className="space-y-8">
                {/* Current/Most Recent Course */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Current/Most Recent Course</h2>
                        </div>
                        {!readonly && (currentCourse.courseName || currentCourse.degree || currentCourse.institution) ? (
                            <button
                                onClick={() => setIsCourseEditOpen(true)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit Info
                            </button>
                        ) : null}
                    </div>

                    {(!currentCourse.courseName && !currentCourse.degree && !currentCourse.institution) ? (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-xl bg-gray-50 dark:bg-[#1D1E23]">
                            <GraduationCap className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500 text-center">No current course details provided.</p>
                            {!readonly && (
                                <button
                                    onClick={() => setIsCourseEditOpen(true)}
                                    className="mt-4 px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg font-bold transition-colors text-sm"
                                >
                                    + Add Current Course
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="pl-4 md:pl-8">
                            <div className="space-y-6 relative">
                                <div className="absolute left-[23px] top-[56px] bottom-6 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                <div className="flex items-start gap-4 relative z-10">
                                <div className="p-3 bg-gray-100 dark:bg-[#1D1E23] rounded-xl border border-gray-200 dark:border-[#333]">
                                    <GraduationCap className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                </div>
                                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                            {currentCourse.courseName || currentCourse.degree || "Not Provided"}
                                            <span className="w-4 h-4 rounded-full border border-red-500 text-red-500 flex items-center justify-center font-bold text-[10px]">!</span>
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 font-medium">
                                            {currentCourse.startDate || "N/A"} - {currentCourse.endDate || "N/A"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        {currentCourse.cgpa && (
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-green-500">{currentCourse.cgpa}</span>
                                                <span className="text-xs font-bold text-green-500 uppercase">CGPA</span>
                                            </div>
                                        )}
                                        {currentCourse.percentage && (
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-green-500">{currentCourse.percentage}</span>
                                                <span className="text-xs font-bold text-green-500">%</span>
                                            </div>
                                        )}
                                        {!currentCourse.cgpa && !currentCourse.percentage && (
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-green-500">-</span>
                                                <span className="text-xs font-bold text-green-500 uppercase">SCORE</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 pl-4 sm:pl-16">
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Institution :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.institution || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Department :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.department || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Program/Degree :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.degree || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Branch/Specialization :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.branch || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Current Semester :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.currentSemester || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Institutional Roll No. :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.rollNo || "Not Provided"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Passout Batch :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.passoutBatch || "Not Provided"}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                                <div className="absolute left-[23px] top-[28px] w-[41px] h-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 relative z-10">Semester wise Scores</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden hidden md:table bg-white dark:bg-[#1D1E23]">
                                        <thead className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#333]">
                                            <tr>
                                                <th className="px-6 py-4 font-bold border-r border-gray-200 dark:border-[#333]">Semester</th>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <th key={i} className={`px-6 py-4 font-bold text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        {i + 1}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-200 dark:border-[#333]">
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Cgpa</td>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        {currentCourse.semesters?.[i]?.cgpa || "-"}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-[#333]">
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Sgpa</td>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        {currentCourse.semesters?.[i]?.sgpa || "-"}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-[#333]">
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Ongoing Backlogs</td>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        {currentCourse.semesters?.[i]?.ongoingBacklogs || "0"}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-[#333]">
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Total Backlogs</td>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        {currentCourse.semesters?.[i]?.totalBacklogs || "0"}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Attached Documents</td>
                                                {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                    <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(currentCourse.currentSemester || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {currentCourse.semesters?.[i]?.attachedDocumentUrl && (
                                                                <a href={currentCourse.semesters[i].attachedDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="View Document">
                                                                    <FileText className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                            {!readonly && (
                                                                <button 
                                                                    disabled={isUploading && uploadTarget?.type === 'current_semester_doc' && uploadTarget?.semesterIndex === i}
                                                                    onClick={() => { setUploadTarget({ type: 'current_semester_doc', semesterIndex: i }); fileInputRef.current?.click(); }}
                                                                    className="text-orange-600 hover:text-orange-700 disabled:opacity-50"
                                                                    title="Upload Document"
                                                                >
                                                                    {isUploading && uploadTarget?.type === 'current_semester_doc' && uploadTarget?.semesterIndex === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                                <div className="absolute left-[23px] top-[28px] w-[41px] h-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 relative z-10">Backlogs</h4>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Ongoing Backlogs :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.ongoingBacklogs || "0"}</span>
                                </div>
                                <div className="flex text-sm items-start">
                                    <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Total Backlogs :</span>
                                    <span className="flex-1 text-gray-900 dark:text-gray-100">{currentCourse.totalBacklogs || "0"}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                                <div className="absolute left-[23px] top-[28px] w-[41px] h-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                <div className="flex items-center justify-between relative z-10">
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Marksheet</h4>
                                    {!readonly && (
                                        <button 
                                            disabled={isUploading && uploadTarget?.type === 'current_marksheet'}
                                            onClick={() => { setUploadTarget({ type: 'current_marksheet' }); fileInputRef.current?.click(); }}
                                            className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                                        >
                                            {isUploading && uploadTarget?.type === 'current_marksheet' ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading...</> : (currentCourse.marksheetUrl ? "Change Document" : "+ Add New")}
                                        </button>
                                    )}
                                </div>
                                {currentCourse.marksheetUrl ? (
                                    <a href={currentCourse.marksheetUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"><FileText className="w-3 h-3" /> View Document</a>
                                ) : (
                                    <p className="text-sm text-gray-500">No documents has been added yet.</p>
                                )}
                            </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PREVIOUS EDUCATIONS */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Previous Educations</h2>
                    </div>

                    {previousEducations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-xl bg-gray-50 dark:bg-[#1D1E23]">
                            <GraduationCap className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500 text-center">No previous educations have been added yet.</p>
                            {!readonly && (
                                <button
                                    onClick={() => {
                                        setEditingPrevEdIndex(null);
                                        setIsPrevEdOpen(true);
                                    }}
                                    className="mt-4 px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg font-bold transition-colors text-sm"
                                >
                                    + Add Previous Education
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="pl-4 md:pl-8">
                            {previousEducations.map((edu: any, index: number) => (
                                <div key={index} className="pb-10 pt-4 first:pt-0 border-b-2 border-dotted border-gray-300 dark:border-gray-600 last:border-0 last:pb-0">
                                    <div className="space-y-6 relative">
                                        <div className="absolute left-[23px] top-[56px] bottom-6 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                        <div className="flex items-start gap-4 relative z-10">
                                    <div className="p-3 bg-gray-100 dark:bg-[#1D1E23] rounded-xl border border-gray-200 dark:border-[#333]">
                                        <GraduationCap className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                {edu.program || "Not Provided"}
                                                <span className="w-4 h-4 rounded-full border border-red-500 text-red-500 flex items-center justify-center font-bold text-[10px]">!</span>
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 font-medium">{edu.startYear || "N/A"} - {edu.endYear || "N/A"}</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-green-500">{edu.score || "-"}</span>
                                                <span className="text-xs font-bold text-green-500">{edu.scoreType || "%"}</span>
                                            </div>
                                            {!readonly && (
                                                <button
                                                    onClick={() => {
                                                        setEditingPrevEdIndex(index);
                                                        setIsPrevEdOpen(true);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit Info
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2 pl-4 sm:pl-16">
                                    <div className="flex text-sm items-start">
                                        <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Institution :</span>
                                        <span className="flex-1 text-gray-900 dark:text-gray-100">{edu.schoolName || "Not Provided"}</span>
                                    </div>
                                    <div className="flex text-sm items-start">
                                        <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Board/University :</span>
                                        <span className="flex-1 text-gray-900 dark:text-gray-100">{edu.board || "Not Provided"}</span>
                                    </div>
                                    <div className="flex text-sm items-start">
                                        <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Program/Degree :</span>
                                        <span className="flex-1 text-gray-900 dark:text-gray-100">{edu.program || "Not Provided"}</span>
                                    </div>
                                    <div className="flex text-sm items-start">
                                        <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Branch/Specialization :</span>
                                        <span className="flex-1 text-gray-900 dark:text-gray-100">{edu.branch || "Not Provided"}</span>
                                    </div>
                                    <div className="flex text-sm items-start">
                                        <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Education Type :</span>
                                        <span className="flex-1 text-gray-900 dark:text-gray-100">{edu.educationType || "Not Provided"}</span>
                                    </div>
                                </div>

                                {edu.totalSemesters > 0 && (
                                    <>
                                        <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                                            <div className="absolute left-[23px] top-[28px] w-[41px] h-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 relative z-10">Semester wise Scores</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden hidden md:table bg-white dark:bg-[#1D1E23]">
                                                    <thead className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#333]">
                                                        <tr>
                                                            <th className="px-6 py-4 font-bold border-r border-gray-200 dark:border-[#333]">Semester</th>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <th key={i} className={`px-6 py-4 font-bold text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    {i + 1}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b border-gray-200 dark:border-[#333]">
                                                            <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Cgpa</td>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    {edu.semesters?.[i]?.cgpa || "-"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-[#333]">
                                                            <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Sgpa</td>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    {edu.semesters?.[i]?.sgpa || "-"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-[#333]">
                                                            <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Ongoing Backlogs</td>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    {edu.semesters?.[i]?.ongoingBacklogs || "0"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className="border-b border-gray-200 dark:border-[#333]">
                                                            <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Total Backlogs</td>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    {edu.semesters?.[i]?.totalBacklogs || "0"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr>
                                                            <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#333]">Attached Documents</td>
                                                            {Array.from({ length: Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) }).map((_, i) => (
                                                                <td key={i} className={`px-6 py-4 text-center ${i < Math.max(1, Math.min(8, parseInt(String(edu.totalSemesters || "1").replace(/\D/g, '') || "1", 10))) - 1 ? 'border-r border-gray-200 dark:border-[#333]' : ''}`}>
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        {edu.semesters?.[i]?.attachedDocumentUrl && (
                                                                            <a href={edu.semesters[i].attachedDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="View Document">
                                                                                <FileText className="w-4 h-4" />
                                                                            </a>
                                                                        )}
                                                                        {!readonly && (
                                                                            <button 
                                                                                disabled={isUploading && uploadTarget?.type === 'prev_semester_doc' && uploadTarget?.eduIndex === index && uploadTarget?.semesterIndex === i}
                                                                                onClick={() => { setUploadTarget({ type: 'prev_semester_doc', eduIndex: index, semesterIndex: i }); fileInputRef.current?.click(); }}
                                                                                className="text-orange-600 hover:text-orange-700 disabled:opacity-50"
                                                                                title="Upload Document"
                                                                            >
                                                                                {isUploading && uploadTarget?.type === 'prev_semester_doc' && uploadTarget?.eduIndex === index && uploadTarget?.semesterIndex === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-4 pt-4 pl-4 sm:pl-16 border-b border-gray-200 dark:border-[#333] pb-6 last:border-0 last:pb-0 relative">
                                    <div className="absolute left-[23px] top-[28px] w-[41px] h-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                                    <div className="flex items-center justify-between relative z-10">
                                        <h4 className="font-bold text-gray-900 dark:text-gray-100">Marksheet</h4>
                                        {!readonly && (
                                            <button 
                                                disabled={isUploading && uploadTarget?.type === 'prev_marksheet' && uploadTarget?.eduIndex === index}
                                                onClick={() => { setUploadTarget({ type: 'prev_marksheet', eduIndex: index }); fileInputRef.current?.click(); }}
                                                className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                                            >
                                                {isUploading && uploadTarget?.type === 'prev_marksheet' && uploadTarget?.eduIndex === index ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading...</> : (edu.marksheetUrl ? "Change Document" : "+ Add New")}
                                            </button>
                                        )}
                                    </div>
                                    {edu.marksheetUrl ? (
                                        <a href={edu.marksheetUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"><FileText className="w-3 h-3" /> View Document</a>
                                    ) : (
                                        <p className="text-sm text-gray-500">No documents has been added yet.</p>
                                    )}
                                </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!readonly && previousEducations.length > 0 && (
                    <div className="flex justify-start pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                         <button
                            onClick={() => {
                                setEditingPrevEdIndex(null);
                                setIsPrevEdOpen(true);
                            }}
                            className="px-6 py-2.5 bg-gray-100 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-gray-100 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm"
                         >
                            + Add Education Details
                         </button>
                    </div>
                )}
            </div>

            <CourseEditModal open={isCourseEditOpen} onOpenChange={setIsCourseEditOpen} user={user} onSuccess={() => { router.refresh(); }} />
            <PreviousEducationModal open={isPrevEdOpen} onOpenChange={setIsPrevEdOpen} user={user} onSuccess={() => { router.refresh(); }} editIndex={editingPrevEdIndex} />
        </div>
    );
}

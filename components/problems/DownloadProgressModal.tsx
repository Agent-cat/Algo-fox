"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2, Filter } from "lucide-react";
import { toast } from "sonner";
import { getTeacherClassrooms, getInstitutionClassrooms } from "@/actions/classroom";

interface Classroom {
    id: string;
    name: string;
    section?: string | null;
}

interface DownloadProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryTitle: string;
    categoryId?: string;
    userRole: string;
    domain: string;
}

export default function DownloadProgressModal({
    isOpen,
    onClose,
    categoryTitle,
    categoryId,
    userRole,
    domain
}: DownloadProgressModalProps) {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [format, setFormat] = useState<"csv" | "xlsx">("csv");
    const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");

    useEffect(() => {
        if (isOpen) {
            fetchClassrooms();
        } else {
            // Reset state on close
            setSelectedIds([]);
            setFormat("csv");
            setDifficultyFilter("ALL");
        }
    }, [isOpen]);

    const fetchClassrooms = async () => {
        setIsLoadingClasses(true);
        try {
            if (userRole === "TEACHER") {
                const res = await getTeacherClassrooms();
                if (res.success && res.classrooms) {
                    setClassrooms(res.classrooms);
                } else {
                    toast.error("Failed to load your classrooms.");
                }
            } else if (userRole === "INSTITUTION_MANAGER" || userRole === "ADMIN") {
                // Fetching first page with high limit or relying on dedicated un-paginated action if it existed
                // For now getInstitutionClassrooms uses pagination, so let's request 100
                const res = await getInstitutionClassrooms(1, 100);
                if (res.success && res.classrooms) {
                    setClassrooms(res.classrooms);
                } else {
                    toast.error("Failed to load institution classrooms.");
                }
            }
        } catch (error) {
            console.error("Error fetching classrooms:", error);
            toast.error("Failed to fetch classrooms.");
        } finally {
            setIsLoadingClasses(false);
        }
    };

    const handleSelectAll = () => {
        if (selectedIds.length === classrooms.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(classrooms.map(c => c.id));
        }
    };

    const toggleSelection = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const handleDownload = async () => {
        if (selectedIds.length === 0) {
            toast.error("Please select at least one classroom.");
            return;
        }

        setIsDownloading(true);

        try {
            const classIdsStr = selectedIds.join(",");
            const queryParams = new URLSearchParams({
                classroomIds: classIdsStr,
                mode: categoryId ? "category" : "all",
                format: format,
                difficulty: difficultyFilter,
                domain: domain
            });

            if (categoryId) {
                queryParams.append("categoryId", categoryId);
                queryParams.append("categoryName", categoryTitle);
            }

            const response = await fetch(`/api/progress/export?${queryParams.toString()}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to download progress");
            }

            // Handle file download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const extension = format === "csv" ? "csv" : "xlsx";
            const dateStr = new Date().toISOString().split("T")[0];
            const fileNamePrefix = categoryId
                ? `${domain}_progress_${categoryTitle.replace(/\s+/g, '_')}`
                : `${domain}_progress_all_categories`;
            a.download = `${fileNamePrefix}_${dateStr}.${extension}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success("Download started successfully!");
            onClose();
        } catch (error: any) {
            console.error("Download error:", error);
            toast.error(error.message || "An error occurred while downloading.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!isOpen) return null;

    const ModeName = categoryId ? "Category-wise Export" : "Global Classroom Export";
    const TargetName = categoryId ? (categoryTitle) : "All Categories";

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-white dark:bg-[#121212] w-full max-w-2xl rounded-2xl shadow-xl border border-gray-200 dark:border-[#262626] overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#262626]">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <Download className="w-5 h-5 text-orange-500" />
                                Download Progress
                            </h2>
                            <p className="text-sm font-medium text-gray-500 mt-1">
                                {ModeName}: <span className="text-gray-900 dark:text-gray-300">"{TargetName}"</span>
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {isLoadingClasses ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                                <p className="text-gray-500">Loading your classrooms...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Configuration Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Export Format
                                        </label>
                                        <select
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value as "csv" | "xlsx")}
                                            className="w-full border border-gray-200 dark:border-[#262626] rounded-xl px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-sm"
                                        >
                                            <option value="csv">CSV (Spreadsheet)</option>
                                            <option value="xlsx">Excel (.xlsx)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <Filter className="w-4 h-4" />
                                            Difficulty Filter
                                        </label>
                                        <select
                                            value={difficultyFilter}
                                            onChange={(e) => setDifficultyFilter(e.target.value)}
                                            className="w-full border border-gray-200 dark:border-[#262626] rounded-xl px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-sm"
                                        >
                                            <option value="ALL">All Difficulties</option>
                                            <option value="EASY">Easy Only</option>
                                            <option value="MEDIUM">Medium Only</option>
                                            <option value="HARD">Hard Only</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Classrooms List */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Select Classrooms ({selectedIds.length}/{classrooms.length})
                                        </label>
                                        {classrooms.length > 0 && (
                                            <button
                                                onClick={handleSelectAll}
                                                className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline"
                                            >
                                                {selectedIds.length === classrooms.length ? "Deselect All" : "Select All"}
                                            </button>
                                        )}
                                    </div>

                                    {classrooms.length === 0 ? (
                                        <div className="text-center py-8 border border-gray-100 dark:border-[#262626] rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
                                            <p className="text-gray-500 dark:text-gray-400">No classrooms found.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {classrooms.map((cls) => (
                                                <div
                                                    key={cls.id}
                                                    onClick={() => toggleSelection(cls.id)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        selectedIds.includes(cls.id)
                                                            ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                                                            : "border-gray-200 dark:border-[#262626] hover:border-orange-500/50 dark:bg-[#1a1a1a]"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                                            selectedIds.includes(cls.id)
                                                                ? "border-orange-500 bg-orange-500"
                                                                : "border-gray-300 dark:border-gray-600"
                                                        }`}>
                                                            {selectedIds.includes(cls.id) && <div className="w-2 h-2 bg-white rounded-full scale-100" />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                                                                {cls.name}
                                                            </h3>
                                                            {cls.section && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                    Sec: {cls.section}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-[#262626] bg-gray-50 dark:bg-[#1a1a1a] flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={selectedIds.length === 0 || isDownloading || isLoadingClasses}
                            className="px-5 py-2.5 rounded-xl font-medium bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-orange-500/20 shadow-lg"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    Download Now
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

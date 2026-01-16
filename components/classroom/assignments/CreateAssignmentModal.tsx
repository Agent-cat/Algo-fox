"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2, Search, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { createAssignment } from "@/actions/assignment";
import { searchProblems } from "@/actions/problems";

interface CreateAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    classroomId: string;
    onSuccess: () => void;
}

export function CreateAssignmentModal({ isOpen, onClose, classroomId, onSuccess }: CreateAssignmentModalProps) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Problem Selection
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProblems, setSelectedProblems] = useState<any[]>([]);

    const handleSearch = async (term: string) => {
        setSearchQuery(term);
        if (term.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const results = await searchProblems(term);
            const problems = results.problems || [];

            // Filter out already selected
            const selectedIds = new Set(selectedProblems.map(p => p.id));
            setSearchResults(problems.filter((p: any) => !selectedIds.has(p.id)));
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    const addProblem = (problem: any) => {
        if (selectedProblems.some(p => p.id === problem.id)) return;
        setSelectedProblems([...selectedProblems, problem]);
        setSearchResults(searchResults.filter(p => p.id !== problem.id));
        setSearchQuery("");
    };

    const removeProblem = (problemId: string) => {
        setSelectedProblems(selectedProblems.filter(p => p.id !== problemId));
    };

    const handleSubmit = async () => {
        if (!title.trim()) return toast.error("Title is required");
        if (selectedProblems.length === 0) return toast.error("Select at least one problem");

        setIsSubmitting(true);
        try {
            const res = await createAssignment(classroomId, {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                problemIds: selectedProblems.map(p => p.id)
            });

            if (res.success) {
                toast.success("Assignment created!");
                // Reset form
                setTitle("");
                setDescription("");
                setDueDate("");
                setSelectedProblems([]);
                router.refresh(); // Force refresh to update cache
                onSuccess();
            } else {
                toast.error(res.error || "Failed to create assignment");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <div className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Assignment</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignment Title</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Week 1: Array Basics"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Instructions for students..."
                                className="flex min-h-[80px] w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date & Time (Optional)</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] pl-10 pr-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Problem Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Problems ({selectedProblems.length})</label>

                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search for problems to add..."
                                className="pl-9"
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-3">
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                </div>
                            )}

                            {/* Search Results Dropdown */}
                            {searchResults.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    {searchResults.map(problem => (
                                        <button
                                            key={problem.id}
                                            onClick={() => addProblem(problem)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#262626] flex items-center justify-between group"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{problem.title}</div>
                                                <div className="text-xs text-gray-500">{problem.difficulty} • {problem.domain}</div>
                                            </div>
                                            <Plus className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Selected Problems List */}
                        {selectedProblems.length > 0 ? (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {selectedProblems.map((problem, index) => (
                                    <div
                                        key={problem.id}
                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1f1f1f] rounded-lg border border-gray-100 dark:border-[#333] group"
                                    >
                                        <div className="text-xs font-bold text-gray-400 w-6">#{index + 1}</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{problem.title}</div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                                    problem.difficulty === "EASY" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                    problem.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                }`}>
                                                    {problem.difficulty}
                                                </span>
                                                <span className="text-[10px] text-gray-500">{problem.domain}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeProblem(problem.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl text-gray-500 text-sm">
                                No problems selected yet
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting || selectedProblems.length === 0} className="bg-orange-600 hover:bg-orange-700 text-white">
                        {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Create Assignment
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Search, Plus, Loader2, X, XCircle } from "lucide-react";
import { assignTagsToStudents } from "@/actions/placement-students";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export interface Student {
    id: string;
    name: string;
    email: string;
    collegeId?: string | null;
    branch?: string | null;
    year?: number | null;
    tags?: string[];
    image?: string | null;
}

export function PlacementStudentsClient({ initialStudents }: { initialStudents: Student[] }) {
    const router = useRouter();
    const [students, setStudents] = useState(initialStudents);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
    
    // Modal state
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [tagsToAdd, setTagsToAdd] = useState<string[]>([]);
    const [isAssigning, setIsAssigning] = useState(false);

    // Filtering
    const filteredStudents = students.filter(student => {
        const matchesSearch = (student.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                              (student.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                              (student.collegeId?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudentIds(new Set(filteredStudents.map(s => s.id)));
        } else {
            setSelectedStudentIds(new Set());
        }
    };

    const handleSelectStudent = (id: string) => {
        const newSet = new Set(selectedStudentIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedStudentIds(newSet);
    };

    // Tag Input Handlers
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = tagInput.trim();
            if (val && !tagsToAdd.includes(val)) {
                setTagsToAdd(prev => [...prev, val]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTagsToAdd(prev => prev.filter(t => t !== tagToRemove));
    };

    const handleAssignTags = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalTags = tagsToAdd;
        if (tagInput.trim() && !tagsToAdd.includes(tagInput.trim())) {
            finalTags = [...tagsToAdd, tagInput.trim()];
            setTagsToAdd(finalTags);
            setTagInput("");
        }

        if (finalTags.length === 0) {
            toast.error("Please enter at least one tag");
            return;
        }

        if (selectedStudentIds.size === 0) {
            toast.error("No students selected");
            return;
        }

        setIsAssigning(true);
        const res = await assignTagsToStudents(Array.from(selectedStudentIds), finalTags);
        setIsAssigning(false);

        if (res.success) {
            toast.success("Tags assigned successfully");
            
            // Optimistically update local state
            setStudents(prev => prev.map(student => {
                if (selectedStudentIds.has(student.id)) {
                    const currentTags = student.tags || [];
                    const newTags = Array.from(new Set([...currentTags, ...finalTags]));
                    return { ...student, tags: newTags };
                }
                return student;
            }));
            
            setTagsToAdd([]);
            setSelectedStudentIds(new Set());
            setIsTagModalOpen(false);
        } else {
            toast.error(res.error || "Failed to assign tags");
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col">
            {/* Header & Tools Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-8 pt-8 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        Placement Students
                        <span className="text-sm font-medium text-gray-500 px-2 py-0.5 bg-gray-100 dark:bg-[#333] rounded-full">
                            {students.length} students
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and assign tags to students</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search students..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 pl-9 pr-4 py-2 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                        />
                    </div>

                    <button 
                        onClick={() => setIsTagModalOpen(true)}
                        disabled={selectedStudentIds.size === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> 
                        Assign Tags {selectedStudentIds.size > 0 && `(${selectedStudentIds.size})`}
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 bg-white dark:bg-[#1D1E23] overflow-hidden flex flex-col border-t border-gray-200 dark:border-[#333]">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-[#262626] sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 w-12 border-b border-gray-200 dark:border-[#333]">
                                    <input 
                                        type="checkbox" 
                                        checked={filteredStudents.length > 0 && selectedStudentIds.size === filteredStudents.length}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                    />
                                </th>
                                <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#333]">
                                    Student
                                </th>
                                <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#333]">
                                    ID No
                                </th>
                                <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#333]">
                                    Branch / Year
                                </th>
                                <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#333]">
                                    Tags
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-[#333]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#333]">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student: any) => (
                                    <tr 
                                        key={student.id} 
                                        className="hover:bg-gray-50 dark:hover:bg-[#24262C] transition-colors group/row cursor-pointer"
                                        onClick={() => router.push(`/profile/${student.id}`)}
                                    >
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedStudentIds.has(student.id)}
                                                onChange={() => handleSelectStudent(student.id)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {student.image ? (
                                                    <img src={student.image} alt={student.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-[#444] object-cover" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-xs">
                                                        {student.name?.charAt(0) || "S"}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{student.name}</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {student.collegeId || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                            {student.branch || "N/A"} <span className="text-gray-300 dark:text-gray-600 mx-1">•</span> {student.year || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {student.tags && student.tags.length > 0 ? (
                                                    student.tags.map((tag: string) => (
                                                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-[#333] text-gray-800 dark:text-gray-200">
                                                            {tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">No tags</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/profile/${student.id}`);
                                                }}
                                                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 dark:text-orange-400 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 rounded-lg transition-colors"
                                            >
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Assign Tags Dialog */}
            <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
                <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-[#262626] bg-white dark:bg-[#1D1E23]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center">
                                    <Plus className="w-4 h-4" />
                                </div>
                                Assign Tags
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                Add tags to {selectedStudentIds.size} selected students. Type and press Enter.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    
                    <form onSubmit={handleAssignTags} className="flex flex-col bg-gray-50/50 dark:bg-[#18191C]">
                        <div className="p-6 space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                Tags
                            </label>
                            <div className="min-h-[100px] bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] shadow-sm rounded-xl flex flex-wrap content-start gap-2.5 p-4 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all cursor-text"
                                 onClick={() => document.getElementById("tag-multi-input")?.focus()}
                            >
                                {tagsToAdd.map((t, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-center gap-2 pl-2.5 pr-1 py-1 rounded-full text-[13px] font-semibold border shadow-sm transition-all hover:shadow-md bg-white dark:bg-[#262626] border-gray-200 dark:border-[#444] text-gray-800 dark:text-gray-200 hover:border-gray-300"
                                    >
                                        <span className="truncate max-w-[180px]" title={t}>{t}</span>
                                        <button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTag(t);
                                            }}
                                            className="ml-1 hover:bg-black/10 dark:hover:bg-white/20 rounded-full p-0.5 transition-colors text-gray-400 hover:text-gray-700"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}

                                <input 
                                    id="tag-multi-input"
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder={tagsToAdd.length === 0 ? "e.g. 2024-batch, cse" : ""}
                                    className="flex-1 min-w-[150px] bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium p-1 dark:text-white placeholder:font-normal placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white dark:bg-[#1D1E23] border-t border-gray-100 dark:border-[#262626]">
                            <button 
                                type="button"
                                onClick={() => setIsTagModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333] rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isAssigning || (tagsToAdd.length === 0 && !tagInput.trim())}
                                className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-orange-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {isAssigning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                {isAssigning ? "Assigning..." : "Assign Tags"}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

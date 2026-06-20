"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Bold, Italic, Underline, Link as LinkIcon, Unlink, List, ListOrdered, Superscript, Subscript, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface ProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
}

export function ProjectModal({ open, onOpenChange, user, onSuccess, editIndex }: ProjectModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const details = user.experienceDetails || {};
    const projects = details.projects || [];

    const isEditing = editIndex !== undefined && editIndex !== null;
    const editingProject = isEditing ? projects[editIndex] : null;

    const { register, handleSubmit, watch, reset, setValue, getValues } = useForm({
        defaultValues: {
            title: "",
            domain: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            associatedWith: "",
            description: ""
        }
    });

    // Handle initialization when modal opens
    useEffect(() => {
        if (open) {
            if (isEditing && editingProject) {
                reset(editingProject);
            } else {
                reset({
                    title: "",
                    domain: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    associatedWith: "",
                    description: ""
                });
            }
        }
    }, [open, isEditing, editingProject, reset]);

    const isCurrentlyWorking = watch("currentlyWorking");

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const updatedProjects = [...projects];
            if (isEditing) {
                updatedProjects[editIndex] = data;
            } else {
                updatedProjects.push(data);
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    projects: updatedProjects
                }
            });

            if (res?.success) {
                toast.success("Project saved successfully");
                onSuccess();
                onOpenChange(false);
                reset();
            } else {
                toast.error(res?.error || "Failed to save");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const insertText = (before: string, after: string = "") => {
        if (!textAreaRef.current) return;
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const currentContent = getValues("description");
        const selectedText = currentContent.substring(start, end);
        const newText = currentContent.substring(0, start) + before + selectedText + after + currentContent.substring(end);

        setValue("description", newText);

        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                const newPos = start + before.length + selectedText.length + after.length;
                textAreaRef.current.setSelectionRange(newPos, newPos);
            }
        }, 0);
    };

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                        <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                            Projects
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div>                            <input {...register("title")} required className={inputClasses} placeholder="Project Title" />
                        </div>
                        <div>                            <input {...register("domain")} required className={inputClasses} placeholder="Project domain" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    {...register("startDate")}
                                    type="date"
                                    required
                                    className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent`}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 text-gray-500 pointer-events-none">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                {!watch("startDate") && (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 text-gray-400 pointer-events-none text-sm">
                                        Start Date *
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    {...register("endDate")}
                                    type="date"
                                    required={!isCurrentlyWorking}
                                    disabled={isCurrentlyWorking}
                                    className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent`}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 text-gray-500 pointer-events-none">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                {!watch("endDate") && (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 text-gray-400 pointer-events-none text-sm">
                                        End Date *
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <div className="relative inline-flex items-center">
                                    <input type="checkbox" {...register("currentlyWorking")} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#333] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                </div>
                                <span className="text-[15px] text-gray-700 dark:text-gray-300">I am currently working on this project</span>
                            </label>
                        </div>

                        <div>
                            <select {...register("associatedWith")} required className={`${inputClasses} appearance-none`}>
                                <option value="" disabled hidden>Associated With *</option>
                                <option value="None">None</option>
                                <option value="College">College</option>
                                <option value="Personal">Personal</option>
                                <option value="Work">Work</option>
                            </select>
                        </div>

                        <div className="border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden">
                            {/* Toolbar */}
                            <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-[#333] bg-white dark:bg-[#1D1E23] overflow-x-auto">
                                <button type="button" onClick={() => insertText("**", "**")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><Bold className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("*", "*")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><Italic className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("<u>", "</u>")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><Underline className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("<sup>", "</sup>")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><Superscript className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("<sub>", "</sub>")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><Subscript className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("- ", "")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><List className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("1. ", "")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><ListOrdered className="w-4 h-4" /></button>
                                <button type="button" onClick={() => insertText("[text](url)", "")} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-600 dark:text-gray-400"><LinkIcon className="w-4 h-4" /></button>
                                <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded transition-colors text-gray-400 cursor-not-allowed"><Unlink className="w-4 h-4" /></button>
                            </div>

                            <textarea
                                {...register("description")}
                                ref={(e) => {
                                    register("description").ref(e);
                                    // @ts-ignore
                                    textAreaRef.current = e;
                                }}
                                rows={8}
                                className="w-full p-4 outline-none resize-none bg-transparent text-sm text-gray-800 dark:text-gray-200 custom-scrollbar"
                                placeholder="Type your project description here..."
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
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? "Save" : "Create")}
                        </button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}

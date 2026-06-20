"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Bold, Italic, Underline, Link as LinkIcon, Unlink, List, ListOrdered, Superscript, Subscript, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface PublicationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
}

export function PublicationModal({ open, onOpenChange, user, onSuccess, editIndex }: PublicationModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const details = user.experienceDetails || {};
    const publications = details.publications || [];
    
    const isEditing = editIndex !== undefined && editIndex !== null;
    const editingPublication = isEditing ? publications[editIndex] : null;

    const { register, handleSubmit, watch, reset, setValue, getValues } = useForm({
        defaultValues: {
            title: "",
            publisher: "",
            publicationUrl: "",
            publicationDate: "",
            description: ""
        }
    });

    useEffect(() => {
        if (open) {
            if (isEditing && editingPublication) {
                reset(editingPublication);
            } else {
                reset({
                    title: "",
                    publisher: "",
                    publicationUrl: "",
                    publicationDate: "",
                    description: ""
                });
            }
        }
    }, [open, isEditing, editingPublication, reset]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const updatedPublications = [...publications];
            if (isEditing) {
                updatedPublications[editIndex] = data;
            } else {
                updatedPublications.push(data);
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    publications: updatedPublications
                }
            });

            if (res?.success) {
                toast.success("Publication saved successfully");
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

    const labelClasses = "absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400";
    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        {isEditing ? "Edit Publication" : "Add Publication"}
                    </SheetTitle>
                </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-8">
                        <div className="relative">
                            <label className={labelClasses}>Title *</label>
                            <input {...register("title")} required className={inputClasses} placeholder="e.g. A novel approach to AI" />
                        </div>
                        
                        <div className="relative">
                            <label className={labelClasses}>Publication/Publisher *</label>
                            <input {...register("publisher")} required className={inputClasses} placeholder="e.g. IEEE / Springer" />
                        </div>

                        <div className="relative">
                            <label className={labelClasses}>Publication URL *</label>
                            <input {...register("publicationUrl")} required className={inputClasses} placeholder="e.g. https://doi.org/10.1109/..." />
                        </div>

                        <div className="relative">
                            <label className={labelClasses}>Select Publication Date *</label>
                            <input 
                                {...register("publicationDate")} 
                                type="date" 
                                required 
                                className={inputClasses} 
                            />
                        </div>

                        <div className="border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden">
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
                                placeholder=""
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

"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Bold, Italic, Underline, Link as LinkIcon, Unlink, List, ListOrdered, Superscript, Subscript, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <DialogTitle className="text-center text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                            Add New Publication
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-8 max-h-[75vh] overflow-y-auto space-y-6">
                        <div>
                            <input {...register("title")} required className={inputClasses} placeholder="Enter Title *" />
                        </div>
                        
                        <div>
                            <input {...register("publisher")} required className={inputClasses} placeholder="Enter Publication/Publisher *" />
                        </div>

                        <div>
                            <input {...register("publicationUrl")} required className={inputClasses} placeholder="Publication URL *" />
                        </div>

                        <div className="relative">
                            <input 
                                {...register("publicationDate")} 
                                type="date" 
                                required 
                                className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent`} 
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 text-gray-500 pointer-events-none">
                                <Calendar className="w-5 h-5" />
                            </div>
                            {!watch("publicationDate") && (
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 text-gray-400 pointer-events-none text-sm">
                                    Select Publication Date *
                                </div>
                            )}
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

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-colors flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

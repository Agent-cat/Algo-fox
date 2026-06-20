"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Bold, Italic, Underline, Link as LinkIcon, Unlink, List, ListOrdered, Superscript, Subscript, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface CertificateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
    editIndex?: number | null;
}

export function CertificateModal({ open, onOpenChange, user, onSuccess, editIndex }: CertificateModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const details = user.experienceDetails || {};
    const certificates = details.certificates || [];
    
    const isEditing = editIndex !== undefined && editIndex !== null;
    const editingCertificate = isEditing ? certificates[editIndex] : null;

    const { register, handleSubmit, watch, reset, setValue, getValues } = useForm({
        defaultValues: {
            name: "",
            issuingAuthority: "",
            certificationUrl: "",
            licenceNumber: "",
            certificationDate: "",
            hasExpiryDate: false,
            expiryDate: "",
            hasScore: false,
            score: "",
            description: ""
        }
    });

    useEffect(() => {
        if (open) {
            if (isEditing && editingCertificate) {
                reset(editingCertificate);
            } else {
                reset({
                    name: "",
                    issuingAuthority: "",
                    certificationUrl: "",
                    licenceNumber: "",
                    certificationDate: "",
                    hasExpiryDate: false,
                    expiryDate: "",
                    hasScore: false,
                    score: "",
                    description: ""
                });
            }
        }
    }, [open, isEditing, editingCertificate, reset]);

    const hasExpiryDate = watch("hasExpiryDate");
    const hasScore = watch("hasScore");

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const updatedCertificates = [...certificates];
            
            // Clean up conditional fields if unchecked
            if (!data.hasExpiryDate) data.expiryDate = "";
            if (!data.hasScore) data.score = "";

            if (isEditing) {
                updatedCertificates[editIndex] = data;
            } else {
                updatedCertificates.push(data);
            }

            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    certificates: updatedCertificates
                }
            });

            if (res?.success) {
                toast.success("Certificate saved successfully");
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
            <SheetContent className="sm:max-w-[700px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl  overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <SheetHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <SheetTitle className="text-center text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                            Add New Certification
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-8 flex-1 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input {...register("name")} required className={inputClasses} placeholder="Enter Name *" />
                            </div>
                            <div>
                                <input {...register("issuingAuthority")} required className={inputClasses} placeholder="Issuing Authority *" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input {...register("certificationUrl")} required className={inputClasses} placeholder="Certification URL *" />
                            </div>
                            <div>
                                <input {...register("licenceNumber")} required className={inputClasses} placeholder="Licence Number *" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <input 
                                    {...register("certificationDate")} 
                                    type="date" 
                                    required 
                                    className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent`} 
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 text-gray-500 pointer-events-none">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                {!watch("certificationDate") && (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 text-gray-400 pointer-events-none text-sm">
                                        Certification Date
                                    </div>
                                )}
                            </div>
                            
                            {hasExpiryDate && (
                                <div className="relative animate-in fade-in slide-in-from-left-2 duration-300">
                                    <input 
                                        {...register("expiryDate")} 
                                        type="date" 
                                        required 
                                        className={`${inputClasses} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent border-orange-200 dark:border-orange-900`} 
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 text-gray-500 pointer-events-none">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    {!watch("expiryDate") && (
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-0 text-gray-400 pointer-events-none text-sm">
                                            Expiry Date *
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" {...register("hasExpiryDate")} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-600 dark:text-gray-300">This certificate has an expiry date</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" {...register("hasScore")} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <span className="text-gray-600 dark:text-gray-300">I have a score for this certification</span>
                            </label>
                        </div>

                        {hasScore && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <input {...register("score")} required className={`${inputClasses} border-orange-200 dark:border-orange-900`} placeholder="Enter Score *" />
                            </div>
                        )}

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
            </SheetContent>
        </Sheet>
    );
}

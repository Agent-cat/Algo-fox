"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";

interface SummaryEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
}

export function SummaryEditModal({ open, onOpenChange, user, onSuccess }: SummaryEditModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            bio: user.bio || "",
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await updateUserInfo({
                bio: data.bio || undefined,
            });

            if (res.success) {
                toast.success("Summary updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res.error || "Failed to update summary");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <DialogTitle className="text-center text-lg font-bold text-gray-800 dark:text-gray-100">Edit Summary</DialogTitle>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        <div className="relative">
                            <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                                Bio (Max 200 Characters)
                            </label>
                            <textarea 
                                {...register("bio", { maxLength: 200 })} 
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors resize-none text-gray-800 dark:text-gray-200" 
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full flex items-center transition-colors shadow-sm"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Save
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

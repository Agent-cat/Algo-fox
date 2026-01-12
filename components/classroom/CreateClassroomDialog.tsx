"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { createClassroom } from "@/actions/classroom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const classroomSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    section: z.string().optional().or(z.literal("")),
    subject: z.string().optional().or(z.literal("")),
    institutionId: z.string().min(1, "Institution is required"),
});

type FormData = z.infer<typeof classroomSchema>;

interface CreateClassroomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    institutionId: string;
}

export function CreateClassroomDialog({ isOpen, onClose, institutionId }: CreateClassroomDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(classroomSchema),
        defaultValues: {
            name: "",
            section: "",
            subject: "",
            institutionId: institutionId,
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const res = await createClassroom(data);
            if (res.success) {
                toast.success("Classroom created successfully!");
                reset();
                onClose();
            } else {
                toast.error(res.error || "Failed to create classroom");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg overflow-hidden border border-gray-100 rounded-md shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-black tracking-tight">New Classroom</h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">Setup your learning environment.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[10px] font-bold text-gray-300 hover:text-black uppercase tracking-widest transition-colors"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest block">
                            Name
                        </label>
                        <input
                            {...register("name")}
                            className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-md focus:border-orange-500 focus:outline-none transition-all font-bold text-sm placeholder:text-gray-200"
                            placeholder="e.g. Data Structures"
                        />
                        {errors.name && <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-black uppercase tracking-widest block">
                                Subject
                            </label>
                            <input
                                {...register("subject")}
                                className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-md focus:border-orange-500 focus:outline-none transition-all font-bold text-sm placeholder:text-gray-200"
                                placeholder="e.g. CS-101"
                            />
                        </div>

                        {/* Section */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-black uppercase tracking-widest block">
                                Section
                            </label>
                            <input
                                {...register("section")}
                                className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-md focus:border-orange-500 focus:outline-none transition-all font-bold text-sm placeholder:text-gray-200"
                                placeholder="e.g. A"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-black text-white rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

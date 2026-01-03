"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        bio?: string | null;
        leetCodeHandle?: string | null;
        codeChefHandle?: string | null;
        hackerrankHandle?: string | null;
        githubHandle?: string | null;
    };
}

interface FormData {
    name: string;
    bio: string;
    leetCodeHandle: string;
    codeChefHandle: string;
    hackerrankHandle: string;
    githubHandle: string;
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: user.name || "",
            bio: user.bio || "",
            leetCodeHandle: user.leetCodeHandle || "",
            codeChefHandle: user.codeChefHandle || "",
            hackerrankHandle: user.hackerrankHandle || "",
            githubHandle: user.githubHandle || "",
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const res = await updateUserInfo(data);
            if (res.success) {
                toast.success("Profile updated successfully");
                onClose();
            } else {
                toast.error(res.error || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">

                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Display Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            {...register("bio")}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Social Handles</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">LeetCode</label>
                            <input
                                {...register("leetCodeHandle")}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                placeholder="username"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">CodeChef</label>
                            <input
                                {...register("codeChefHandle")}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                placeholder="username"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">GitHub</label>
                            <input
                                {...register("githubHandle")}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                placeholder="username"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">HackerRank</label>
                            <input
                                {...register("hackerrankHandle")}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                placeholder="username"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

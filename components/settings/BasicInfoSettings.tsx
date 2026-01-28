"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Camera, X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";
import Image from "next/image";

interface BasicInfoSettingsProps {
    user: {
        id: string; // needed for key
        name: string;
        email: string;
        image?: string | null;
        bio?: string | null;
        institutionName?: string | null;
    };
}

interface FormData {
    firstName: string; // UI only -> maps to name
    lastName: string;  // UI only -> maps to name
    bio: string;
    // country, school, degree - UI only for now or partial maps
    school: string;
}

export function BasicInfoSettings({ user }: BasicInfoSettingsProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Naive split for name just for initial value
    const nameParts = user.name.split(" ");
    const initialFirstName = nameParts[0] || "";
    const initialLastName = nameParts.slice(1).join(" ") || "";

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            firstName: initialFirstName,
            lastName: initialLastName,
            bio: user.bio || "",
            school: user.institutionName || "", // Use institution name if available
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            // Reconstruct name
            const fullName = `${data.firstName} ${data.lastName}`.trim();

            const res = await updateUserInfo({
                name: fullName,
                bio: data.bio
                // we aren't updating school/institution here yet as it might need defined structure
            });

            if (res.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(res.error || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Basic Info</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    You can manage your details here.
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-medium font-mono text-gray-900 dark:text-gray-100">Basic Details</h2>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#262626] shadow-lg bg-orange-100 dark:bg-orange-900/20">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-orange-600 dark:text-orange-500">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                         </div>
                         <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors border-2 border-white dark:border-[#0a0a0a]" title="Change Picture">
                            <Pencil className="w-3.5 h-3.5" />
                         </button>
                         <button className="absolute bottom-0 left-0 p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full shadow-md hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 transition-colors border-2 border-white dark:border-[#0a0a0a]" title="Remove Picture">
                            <X className="w-3.5 h-3.5" />
                         </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">
                                First Name <span className="text-red-500">*</span>
                             </label>
                             <input
                                {...register("firstName", { required: "First name is required" })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                placeholder="First Name"
                             />
                             {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">
                                Last Name
                             </label>
                             <input
                                {...register("lastName")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                                placeholder="Last Name"
                             />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">
                            Email
                        </label>
                        <div className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#333] cursor-not-allowed">
                            {user.email}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">
                            Bio (Max 200 Characters)
                        </label>
                        <textarea
                            {...register("bio")}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333] bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>



                    <div className="flex justify-end pt-4">
                         <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
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

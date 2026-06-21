"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LdUserRounded,
  LdWidget,
  LdAltArrowLeft,
  LdPen,
  LdCloseCircle,
  LdDiploma,
  LdCase,
  LdCode,
  LdFolder,
  LdMedalStar,
  LdAltArrowDown,
  LdAltArrowRight,
  LdDiplomaVerified,
  LdLightbulb,
  LdBook,
  LdFileText,
  LdRefresh
} from "solar-icon-react/ld";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const sidebarItems = [
    {
        name: "Basic Info",
        href: "/dashboard/settings/basic-info",
        icon: LdUserRounded
    },
    {
        name: "Education Details",
        href: "/dashboard/settings/education",
        icon: LdDiploma
    },
    {
        name: "Platform",
        href: "/dashboard/settings/platform",
        icon: LdWidget
    },
    {
        name: "Internships & Work Experience",
        href: "/dashboard/settings/experience",
        icon: LdCase
    },
    {
        name: "Skills & Languages",
        href: "/dashboard/settings/skills",
        icon: LdCode
    },
    {
        name: "Projects",
        href: "/dashboard/settings/projects",
        icon: LdFolder
    }
];

const accomplishmentItems = [
    { name: "Awards & Recognitions", href: "/dashboard/settings/accomplishments/awards", icon: LdMedalStar },
    { name: "Certificates", href: "/dashboard/settings/accomplishments/certificates", icon: LdDiplomaVerified },
    { name: "Patents", href: "/dashboard/settings/accomplishments/patents", icon: LdLightbulb },
    { name: "Publications", href: "/dashboard/settings/accomplishments/publications", icon: LdBook }
];

export function SettingsSidebar({ user }: { user: any }) {
    const pathname = usePathname();
    const isAccomplishmentsActive = pathname.includes("/accomplishments");
    const [accomplishmentsOpen, setAccomplishmentsOpen] = useState(isAccomplishmentsActive);

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (isAccomplishmentsActive) {
            setAccomplishmentsOpen(true);
        }
    }, [isAccomplishmentsActive]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            
            const uploadRes = await fetch("/api/upload-document", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();
            if (!uploadRes.ok || !data.success) {
                throw new Error(data.error || "Failed to upload image");
            }

            const dbRes = await updateUserInfo({ image: data.url });

            if (dbRes.success) {
                toast.success("Profile picture updated successfully");
                router.refresh();
            } else {
                throw new Error(dbRes.error || "Failed to save image metadata");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred during upload");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemovePicture = async () => {
        try {
            const dbRes = await updateUserInfo({ image: "" }); // Empty string means no image
            if (dbRes.success) {
                toast.success("Profile picture removed successfully");
                router.refresh();
            } else {
                toast.error(dbRes.error || "Failed to remove image");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        }
    };

    return (
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                    <LdAltArrowLeft className="w-4 h-4" />
                    Back to Profile
                </Link>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg,image/png,image/webp" />

            <div className="flex flex-col items-center gap-4 py-4">
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
                     <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="absolute bottom-0 right-0 p-1.5 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition-colors border-2 border-white dark:border-[#1D1E23] disabled:opacity-50" title="Change Picture">
                        {isUploading ? <LdRefresh className="w-3.5 h-3.5 animate-spin" /> : <LdPen className="w-3.5 h-3.5" />}
                     </button>
                     <button type="button" onClick={handleRemovePicture} disabled={isUploading} className="absolute bottom-0 left-0 p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full shadow-md hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 transition-colors border-2 border-white dark:border-[#1D1E23] disabled:opacity-50" title="Remove Picture">
                        <LdCloseCircle className="w-3.5 h-3.5" />
                     </button>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>


            <nav className="space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-gray-100 dark:bg-[#1D1E23] text-gray-900 dark:text-gray-100"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1D1E23]/50 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}

                {/* Accomplishments Dropdown */}
                <div>
                    <button
                        onClick={() => setAccomplishmentsOpen(!accomplishmentsOpen)}
                        className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                            isAccomplishmentsActive && !accomplishmentsOpen
                                ? "bg-gray-100 dark:bg-[#1D1E23] text-gray-900 dark:text-gray-100"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1D1E23]/50 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <LdMedalStar className={cn("w-5 h-5", isAccomplishmentsActive && !accomplishmentsOpen ? "text-gray-900 dark:text-gray-100" : "text-gray-400")} />
                            Accomplishments
                        </div>
                        {accomplishmentsOpen ? <LdAltArrowDown className="w-4 h-4" /> : <LdAltArrowRight className="w-4 h-4" />}
                    </button>

                    {accomplishmentsOpen && (
                        <div className="mt-1 space-y-1 pl-4 border-l-2 border-gray-100 dark:border-[#262626] ml-6">
                            {accomplishmentItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                                            isActive
                                                ? "bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-500"
                                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1D1E23]/50 hover:text-gray-900 dark:hover:text-gray-200"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4", isActive ? "text-orange-600 dark:text-orange-500" : "text-gray-400")} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                <Link
                    href="/dashboard/settings/resume"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                        pathname === "/dashboard/settings/resume"
                            ? "bg-gray-100 dark:bg-[#1D1E23] text-gray-900 dark:text-gray-100"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1D1E23]/50 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                >
                    <LdFileText className={cn("w-5 h-5", pathname === "/dashboard/settings/resume" ? "text-gray-900 dark:text-gray-100" : "text-gray-400")} />
                    Resume
                </Link>
            </nav>
        </div>
    );
}

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
import { useSidebar, COLLAPSED_WIDTH, EXPANDED_WIDTH } from "@/context/SidebarContext";

const navGroups = [
    {
        label: "",
        items: [
            { name: "Back to Profile", href: "/dashboard", icon: LdAltArrowLeft }
        ]
    },
    {
        label: "Profile Info",
        items: [
            { name: "Basic Info", href: "/dashboard/settings/basic-info", icon: LdUserRounded },
            { name: "Education Details", href: "/dashboard/settings/education", icon: LdDiploma },
            { name: "Platform", href: "/dashboard/settings/platform", icon: LdWidget },
        ]
    },
    {
        label: "Experience",
        items: [
            { name: "Internships & Work", href: "/dashboard/settings/experience", icon: LdCase },
            { name: "Skills & Languages", href: "/dashboard/settings/skills", icon: LdCode },
            { name: "Projects", href: "/dashboard/settings/projects", icon: LdFolder },
        ]
    },
    {
        label: "Achievements",
        items: [
            {
                name: "Accomplishments",
                icon: LdMedalStar,
                basePath: "/dashboard/settings/accomplishments",
                subItems: [
                    { name: "Awards", href: "/dashboard/settings/accomplishments/awards" },
                    { name: "Certificates", href: "/dashboard/settings/accomplishments/certificates" },
                    { name: "Patents", href: "/dashboard/settings/accomplishments/patents" },
                    { name: "Publications", href: "/dashboard/settings/accomplishments/publications" }
                ]
            }
        ]
    },
    {
        label: "Documents",
        items: [
            { name: "Resume", href: "/dashboard/settings/resume", icon: LdFileText }
        ]
    }
];

export function SettingsSidebar({ user }: { user: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { setSidebarWidth } = useSidebar();
    
    // Manage expanded states for items with subItems
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        // Expand accomplishment by default if we are inside it
        return {
            "Accomplishments": pathname.includes("/accomplishments")
        };
    });

    useEffect(() => {
        setSidebarWidth(COLLAPSED_WIDTH);
        return () => {
            setSidebarWidth(EXPANDED_WIDTH);
        };
    }, [setSidebarWidth]);

    const toggleGroup = (name: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

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
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col h-full bg-[#fafafa] dark:bg-[#1D1E23] custom-scrollbar">
            
            {/* User Profile Avatar Section */}
            <div className="px-3 mb-6 mt-6">
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg,image/png,image/webp" />
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm">
                     <div className="relative group flex-shrink-0">
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-[#262626] shadow-sm bg-orange-100 dark:bg-orange-900/20">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-orange-600 dark:text-orange-500">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                         </div>
                         <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-[#111] text-gray-600 dark:text-gray-300 rounded-full shadow-sm hover:text-orange-500 transition-colors border border-gray-200 dark:border-[#333] disabled:opacity-50" title="Change Picture">
                            {isUploading ? <LdRefresh className="w-3 h-3 animate-spin" /> : <LdPen className="w-3 h-3" />}
                         </button>
                         {user.image && (
                             <button type="button" onClick={handleRemovePicture} disabled={isUploading} className="absolute -top-1 -right-1 p-1 bg-white dark:bg-[#111] text-gray-600 dark:text-gray-300 rounded-full shadow-sm hover:text-red-500 transition-colors border border-gray-200 dark:border-[#333] disabled:opacity-50" title="Remove Picture">
                                <LdCloseCircle className="w-3 h-3" />
                             </button>
                         )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                 </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-6 px-1 pb-10">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col">
                        {group.label && (
                            <div className="px-3 mb-2">
                                <span className="text-[12.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
                                    {group.label}
                                </span>
                            </div>
                        )}
                        
                        <div className="space-y-[2px]">
                            {group.items.map((item) => {
                                if ('subItems' in item && item.subItems) {
                                    const isActiveBase = pathname.includes(item.basePath || item.name);
                                    const isExpanded = expandedGroups[item.name];
                                    
                                    return (
                                        <div key={item.name} className="flex flex-col">
                                            <button
                                                onClick={() => toggleGroup(item.name)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-3 py-2 text-[13.5px] font-medium rounded-lg transition-colors group",
                                                    (isActiveBase && !isExpanded)
                                                        ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActiveBase && !isExpanded ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                                    {item.name}
                                                </div>
                                                <LdAltArrowRight className={cn("w-3.5 h-3.5 text-gray-400 transition-transform duration-200", isExpanded && "rotate-90")} />
                                            </button>
                                            
                                            {/* SubItems with smooth animation and vertical line */}
                                            <div
                                                className={cn(
                                                    "grid transition-all duration-300 ease-in-out",
                                                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                )}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="ml-[21px] mt-1 pl-[15px] border-l border-gray-200 dark:border-white/10 space-y-[2px] py-1">
                                                        {item.subItems.map((subItem) => {
                                                            const isSubActive = pathname === subItem.href;
                                                            return (
                                                                <Link
                                                                    key={subItem.href}
                                                                    href={subItem.href}
                                                                    className={cn(
                                                                        "flex items-center px-3 py-[7px] text-[13px] font-medium rounded-lg transition-colors relative",
                                                                        isSubActive
                                                                            ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                                    )}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                const itemHref = (item as any).href;
                                const isActive = pathname === itemHref;
                                return (
                                    <Link
                                        key={itemHref}
                                        href={itemHref}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium rounded-lg transition-colors group",
                                            isActive
                                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                        )}
                                    >
                                        {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
}

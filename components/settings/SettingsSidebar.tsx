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
import CustomTooltip from "@/components/ui/CustomTooltip";

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

const isAddressFilled = (addr: any) => {
    if (!addr) return false;
    if (typeof addr === "string") return addr.trim().length > 0;
    const parts = [
        addr.addressLine,
        addr.city,
        addr.district,
        addr.state,
        addr.country,
        addr.pincode
    ]
        .map(val => (typeof val === "string" ? val.trim() : val))
        .filter(Boolean);
    return parts.length > 0;
};

const StatusIndicator = ({ filled, missingFields }: { filled: boolean; missingFields?: string[] }) => {
    return filled ? (
        <svg className="w-4 h-4 text-emerald-500 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Complete</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
    ) : (
        <CustomTooltip content={missingFields && missingFields.length > 0 ? `Missing: ${missingFields.join(", ")}` : "Incomplete"} side="top">
            <svg className="w-4 h-4 text-amber-500 shrink-0 ml-auto cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Incomplete</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </CustomTooltip>
    );
};

export function SettingsSidebar({ user }: { user: any }) {
    const pathname = usePathname();

    const getMissingFields = (sectionName: string): string[] => {
        const missing: string[] = [];
        switch (sectionName) {
            case "Basic Info":
                if (!user?.name?.trim()) missing.push("Name");
                if (!user?.dateOfBirth) missing.push("Date of Birth");
                if (!user?.gender?.trim()) missing.push("Gender");
                if (!(user?.collegeName?.trim() || user?.institutionName?.trim())) missing.push("College/Institution Name");
                if (!user?.bio?.trim()) missing.push("Bio");
                if (!isAddressFilled(user?.permanentAddress)) missing.push("Permanent Address");
                if (!isAddressFilled(user?.currentAddress)) missing.push("Current Address");
                if (!user?.collegeId?.trim()) missing.push("College ID");
                if (!user?.branch?.trim()) missing.push("Branch");
                break;
            case "Education Details":
                if (!user?.educationDetails?.currentCourse?.courseName) missing.push("Current Course Name");
                if (!user?.educationDetails?.currentCourse?.institution) missing.push("Current Institution");
                if (!user?.educationDetails?.currentCourse?.degree) missing.push("Current Degree");
                if (!user?.educationDetails?.currentCourse?.branch) missing.push("Current Branch");
                if (!user?.educationDetails?.currentCourse?.currentSemester) missing.push("Current Semester");
                if (!user?.educationDetails?.previousEducations || user.educationDetails.previousEducations.length === 0) {
                    missing.push("Previous Education");
                }
                break;
            case "Platform":
                if (!user?.leetCodeHandle) missing.push("LeetCode Handle");
                if (!user?.codeChefHandle) missing.push("CodeChef Handle");
                if (!user?.codeforcesHandle) missing.push("Codeforces Handle");
                if (!user?.githubHandle) missing.push("GitHub Handle");
                break;
            case "Internships & Work":
                if (!(user?.experienceDetails?.experiences?.length > 0 || user?.experienceDetails?.experiencesNone)) {
                    missing.push("Internship/Work Experience");
                }
                break;
            case "Skills & Languages":
                if (!(user?.experienceDetails?.technicalSkills?.length > 0)) {
                    missing.push("Technical Skills");
                }
                break;
            case "Projects":
                if (!(user?.experienceDetails?.projects?.length > 0 || user?.experienceDetails?.projectsNone)) {
                    missing.push("Projects");
                }
                break;
            case "Resume":
                if (!(user?.experienceDetails?.resumes?.length > 0)) {
                    missing.push("Resume");
                }
                break;
            case "Awards":
                if (!(user?.experienceDetails?.awards?.length > 0 || user?.experienceDetails?.awardsNone)) {
                    missing.push("Awards");
                }
                break;
            case "Certificates":
                if (!(user?.experienceDetails?.certificates?.length > 0 || user?.experienceDetails?.certificatesNone)) {
                    missing.push("Certificates");
                }
                break;
            case "Patents":
                if (!(user?.experienceDetails?.patents?.length > 0 || user?.experienceDetails?.patentsNone)) {
                    missing.push("Patents");
                }
                break;
            case "Publications":
                if (!(user?.experienceDetails?.publications?.length > 0 || user?.experienceDetails?.publicationsNone)) {
                    missing.push("Publications");
                }
                break;
            case "Accomplishments":
                if (!isSectionFilled("Awards")) missing.push("Awards");
                if (!isSectionFilled("Certificates")) missing.push("Certificates");
                if (!isSectionFilled("Patents")) missing.push("Patents");
                if (!isSectionFilled("Publications")) missing.push("Publications");
                break;
            default:
                break;
        }
        return missing;
    };

    const isSectionFilled = (sectionName: string): boolean => {
        if ([
            "Basic Info", "Education Details", "Platform", "Internships & Work",
            "Skills & Languages", "Projects", "Resume", "Awards", "Certificates",
            "Patents", "Publications", "Accomplishments"
        ].includes(sectionName)) {
            return getMissingFields(sectionName).length === 0;
        }
        return true;
    };
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    
    // Manage expanded states for items with subItems
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        // Expand accomplishment by default if we are inside it
        return {
            "Accomplishments": pathname.includes("/accomplishments")
        };
    });

    // Expand accomplishments group if route is under it
    useEffect(() => {
        if (pathname.includes("/accomplishments")) {
            setExpandedGroups(prev => ({
                ...prev,
                "Accomplishments": true
            }));
        }
    }, [pathname]);

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
                        <h3 className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                 </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-6 px-1 pb-10">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col">
                        {group.label && (
                            <div className="px-3 mb-2">
                                <span className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
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
                                                    "w-full flex items-center justify-between px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors group",
                                                    (isActiveBase && !isExpanded)
                                                        ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActiveBase && !isExpanded ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                                    <span className="truncate">{item.name}</span>
                                                    <StatusIndicator filled={isSectionFilled(item.name)} missingFields={getMissingFields(item.name)} />
                                                </div>
                                                <LdAltArrowRight className={cn("w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ml-2 shrink-0", isExpanded && "rotate-90")} />
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
                                                                        "flex items-center gap-2 px-3 py-[7px] text-[13.5px] font-medium rounded-lg transition-colors relative",
                                                                        isSubActive
                                                                            ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                                    )}
                                                                >
                                                                    <span className="flex-1 truncate">{subItem.name}</span>
                                                                    <StatusIndicator filled={isSectionFilled(subItem.name)} missingFields={getMissingFields(subItem.name)} />
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
                                const showStatus = item.name !== "Back to Profile";
                                return (
                                    <Link
                                        key={itemHref}
                                        href={itemHref}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors group",
                                            isActive
                                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                        )}
                                    >
                                        {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                        <span className="flex-1 truncate">{item.name}</span>
                                        {showStatus && <StatusIndicator filled={isSectionFilled(item.name)} missingFields={getMissingFields(item.name)} />}
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

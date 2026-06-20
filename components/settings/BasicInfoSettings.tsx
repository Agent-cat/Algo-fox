"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Camera, X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";
import Image from "next/image";
import { AddressEditModal } from "./AddressEditModal";
import { AboutEditModal } from "./AboutEditModal";
import { SummaryEditModal } from "./SummaryEditModal";
import { AcademicEditModal } from "./AcademicEditModal";

interface BasicInfoSettingsProps {
    user: {
        id: string; // needed for key
        name: string;
        email: string;
        image?: string | null;
        bio?: string | null;
        collegeName?: string | null;
        collegeId?: string | null;
        branch?: string | null;
        institutionName?: string | null;
        dateOfBirth?: string | null;
        gender?: string | null;
        permanentAddress?: any;
        currentAddress?: any;
    };
}


export function BasicInfoSettings({ user }: BasicInfoSettingsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isAcademicModalOpen, setIsAcademicModalOpen] = useState(false);

    const formatAddress = (addr: any) => {
        if (!addr) return "-";
        if (typeof addr === "string") return addr;
        const parts = [addr.addressLine, addr.city, addr.district, addr.state, addr.country, addr.pincode].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : "-";
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Basic Info</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    You can manage your details here.
                </p>
            </div>

            <div className="space-y-8">

                {/* About Section */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">About</h2>
                            <span className="w-4 h-4 rounded-full border border-red-500 text-red-500 flex items-center justify-center font-bold text-[10px]">!</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsAboutModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit Info
                        </button>
                    </div>
                    <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                        <div className="absolute left-[23px] top-[16px] bottom-0 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                        <div className="flex text-sm items-start">
                            <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Full Name :</span>
                            <span className="flex-1 text-gray-900 dark:text-gray-100">{user.name || "-"}</span>
                        </div>
                        <div className="flex text-sm items-start">
                            <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Date of Birth :</span>
                            <span className="flex-1 text-gray-900 dark:text-gray-100">
                                {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                            </span>
                        </div>
                        <div className="flex text-sm items-start">
                            <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Gender :</span>
                            <span className="flex-1 text-gray-900 dark:text-gray-100">{user.gender || "-"}</span>
                        </div>
                        <div className="flex text-sm items-start">
                            <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Current/Latest College :</span>
                            <span className="flex-1 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                {user.collegeName || user.institutionName || "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Summary</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSummaryModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit Info
                        </button>
                    </div>
                    <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                        <div className="absolute left-[23px] top-[16px] bottom-0 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                        <div className="flex text-sm items-start">
                            <span className="flex-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">{user.bio || "No summary provided."}</span>
                        </div>
                    </div>
                </div>


                {/* Address Section */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                     <div className="flex items-center justify-between">
                         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Address</h2>
                         <button
                             type="button"
                             onClick={() => setIsAddressModalOpen(true)}
                             className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                         >
                             <Pencil className="w-3.5 h-3.5" />
                             Edit Info
                         </button>
                     </div>

                     <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                         <div className="absolute left-[23px] top-[16px] bottom-0 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                         <div className="flex text-sm items-start">
                             <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Permanent Address :</span>
                             <span className="flex-1 text-gray-900 dark:text-gray-100">{formatAddress(user.permanentAddress)}</span>
                         </div>
                         <div className="flex text-sm items-start">
                             <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Current Address :</span>
                             <span className="flex-1 text-gray-900 dark:text-gray-100">{formatAddress(user.currentAddress)}</span>
                         </div>
                     </div>
                </div>

                {/* Academic Details Section */}
                <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                     <div className="flex items-center justify-between">
                         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Academic Details</h2>
                         <button
                             type="button"
                             onClick={() => setIsAcademicModalOpen(true)}
                             className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-orange-600 dark:text-orange-500 font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                         >
                             <Pencil className="w-3.5 h-3.5" />
                             Edit Info
                         </button>
                     </div>

                     <div className="space-y-4 pt-4 pl-4 sm:pl-16 relative">
                         <div className="absolute left-[23px] top-[16px] bottom-0 w-[2px] bg-gray-200 dark:bg-[#333] hidden sm:block z-0"></div>
                         <div className="flex text-sm items-start">
                             <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">College Name :</span>
                             <span className="flex-1 text-gray-900 dark:text-gray-100">{user.collegeName || user.institutionName || "-"}</span>
                         </div>
                         <div className="flex text-sm items-start">
                             <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">College ID / Roll No :</span>
                             <span className="flex-1 text-gray-900 dark:text-gray-100">{user.collegeId || "-"}</span>
                         </div>
                         <div className="flex text-sm items-start">
                             <span className="w-48 sm:w-56 md:w-64 text-gray-500 dark:text-gray-400 font-medium shrink-0">Branch / Specialization :</span>
                             <span className="flex-1 text-gray-900 dark:text-gray-100">{user.branch || "-"}</span>
                         </div>
                     </div>
                </div>
            </div>
            
            <AboutEditModal
                open={isAboutModalOpen}
                onOpenChange={setIsAboutModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
            />

            <SummaryEditModal
                open={isSummaryModalOpen}
                onOpenChange={setIsSummaryModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
            />

            <AddressEditModal 
                open={isAddressModalOpen} 
                onOpenChange={setIsAddressModalOpen} 
                user={user}
                onSuccess={() => { router.refresh(); }}
            />

            <AcademicEditModal 
                open={isAcademicModalOpen} 
                onOpenChange={setIsAcademicModalOpen} 
                user={user}
                onSuccess={() => { router.refresh(); }}
            />
        </div>
    );
}

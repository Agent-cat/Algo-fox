"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Upload, AlertCircle } from "lucide-react";
import { CertificateModal } from "./CertificateModal";
import { toast } from "sonner";
import { updateUserInfo } from "@/actions/user.action";

interface CertificatesSettingsClientProps {
    user: any;
}

export function CertificatesSettingsClient({ user }: CertificatesSettingsClientProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const details = user.experienceDetails || {};
    const certificates = details.certificates || [];

    const handleDelete = async (index: number) => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;
        
        setIsDeleting(true);
        try {
            const updatedCertificates = [...certificates];
            updatedCertificates.splice(index, 1);
            
            const res = await updateUserInfo({
                experienceDetails: {
                    ...details,
                    certificates: updatedCertificates
                }
            });

            if (res.success) {
                toast.success("Certificate deleted successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete certificate");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDateRange = (start: string, end: string, hasExpiry: boolean) => {
        const formatMonthYear = (dateString: string) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };

        const startStr = formatMonthYear(start);
        if (!hasExpiry || !end) return `Issued ${startStr} - No Expiration`;
        
        return `Issued ${startStr} - Expires ${formatMonthYear(end)}`;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">Certificates</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Manage your certifications and licenses.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-[#333]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Certificates List</h2>
                    <button
                        onClick={() => {
                            setEditingIndex(null);
                            setIsModalOpen(true);
                        }}
                        className="px-6 py-2 border border-orange-600 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-full font-bold transition-colors text-sm flex items-center gap-2"
                    >
                        + Add new
                    </button>
                </div>
                
                {certificates.length === 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        You have not added any certificates yet.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {certificates.map((cert: any, index: number) => (
                            <div key={index} className="pb-8 pt-2 first:pt-0 border-b border-gray-200 dark:border-[#333] last:border-0 last:pb-0">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{cert.name}</h3>
                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {cert.issuingAuthority} | {formatDateRange(cert.certificationDate, cert.expiryDate, cert.hasExpiryDate)}
                                            {cert.hasScore && cert.score && ` | Score: ${cert.score}`}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Licence: {cert.licenceNumber}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <button 
                                            onClick={() => {
                                                setEditingIndex(index);
                                                setIsModalOpen(true);
                                            }}
                                            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            disabled={isDeleting}
                                            className="hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                        <button 
                                            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                            title="Upload Document"
                                        >
                                            <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                                
                                {cert.description && (
                                    <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                                        {cert.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CertificateModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                user={user}
                onSuccess={() => { router.refresh(); }}
                editIndex={editingIndex}
            />
        </div>
    );
}

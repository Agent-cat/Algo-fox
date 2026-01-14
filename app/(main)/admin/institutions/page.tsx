"use client";

import { useEffect, useState, useMemo } from "react";
import { getInstitutions, deleteInstitutionAction } from "@/actions/admin/institution";
import { Building2, Plus, Search, ArrowRight, Globe, Trash2, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Institution {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    domain: string | null;
    managerName: string;
    _count: {
        users: number;
        classrooms: number;
    };
}

export default function InstitutionsPage() {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchInstitutions = async () => {
        setIsLoading(true);
        try {
            const res = await getInstitutions();
            if (res.success) {
                setInstitutions(res.institutions as any);
            } else {
                toast.error(res.error || "Failed to load institutions");
            }
        } catch (error) {
            console.error("Failed to fetch institutions:", error);
            toast.error("Failed to load institutions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const filteredInstitutions = useMemo(() => {
        return institutions.filter(inst =>
            inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inst.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inst.domain && inst.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
            inst.managerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [institutions, searchQuery]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}? This action is irreversible.`)) return;

        try {
            const res = await deleteInstitutionAction(id);
            if (res.success) {
                toast.success("Institution deleted successfully");
                fetchInstitutions();
            } else {
                toast.error(res.error || "Failed to delete institution");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-12 transition-colors">
            {/* Header */}
            <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#262626]">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Institutions</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage educational institutions and their settings</p>
                        </div>
                        <Link
                            href="/admin/institutions/create"
                            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-orange-600 dark:hover:bg-gray-200 transition-colors shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Add Institution
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search institutions, domains, or managers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                    />
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] overflow-hidden rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#262626]">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Institution</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Domain</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-center">Users</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-center">Batches</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Manager</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-[#262626]">
                                {isLoading ? (
                                    [1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={6} className="px-6 py-8">
                                                <div className="h-4 bg-gray-100 dark:bg-[#262626] w-full rounded" />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredInstitutions.length > 0 ? (
                                    filteredInstitutions.map((inst) => (
                                        <tr
                                            key={inst.id}
                                            className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 dark:bg-[#262626] rounded flex items-center justify-center overflow-hidden shrink-0">
                                                        {inst.logo ? (
                                                            <img src={inst.logo} alt={inst.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Building2 className="w-5 h-5 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{inst.name}</div>
                                                        <div className="text-xs text-gray-500">{inst.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {inst.domain ? (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <Globe className="w-4 h-4 text-gray-400" />
                                                        {inst.domain}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{inst._count.users}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{inst._count.classrooms}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/10 rounded flex items-center justify-center text-orange-600 dark:text-orange-400 text-xs font-semibold">
                                                        {inst.managerName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{inst.managerName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleDelete(inst.id, inst.name)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-lg"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <Link
                                                        href={`/admin/institutions/${inst.id}`}
                                                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-[#262626] transition-colors rounded-lg"
                                                        title="View Details"
                                                    >
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <LayoutGrid className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No institutions found</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

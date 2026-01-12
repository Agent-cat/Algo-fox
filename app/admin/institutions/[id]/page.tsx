"use client";

import { useState, useEffect } from "react";
import { getInstitutionById, updateInstitutionAction, assignInstitutionManager, searchUsersByEmail, removeInstitutionManager } from "@/actions/admin/institution";
import { Building2, Mail, Plus, Loader2, Save, Globe, Trash2, ArrowRight, Shield, Activity, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

const institutionSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    logo: z.string().url().optional().or(z.literal("")),
    domain: z.string().optional().or(z.literal("")),
});

type InstitutionFormValues = z.infer<typeof institutionSchema>;

export default function InstitutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string>("");
    const [institution, setInstitution] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"details" | "access">("details");
    const [managerEmail, setManagerEmail] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);

    const debouncedSearch = useDebounce(managerEmail, 300);

    const form = useForm<InstitutionFormValues>({
        resolver: zodResolver(institutionSchema),
    });

    useEffect(() => {
        params.then(p => setId(p.id));
    }, [params]);

    const fetchData = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const res = await getInstitutionById(id);
            if (res.success && res.institution) {
                setInstitution(res.institution);
                form.reset({
                    name: res.institution.name,
                    logo: res.institution.logo || "",
                    domain: res.institution.domain || "",
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to load institution data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearch.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await searchUsersByEmail(debouncedSearch);
                if (res.success) setSuggestions(res.users || []);
            } catch (error) {
                console.error("Search error:", error);
            }
        };
        fetchSuggestions();
    }, [debouncedSearch]);

    const onSubmit = async (values: InstitutionFormValues) => {
        try {
            const res = await updateInstitutionAction(id, values);
            if (res.success) {
                toast.success("Institution updated successfully");
                fetchData();
            } else {
                toast.error(res.error || "Failed to update institution");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("An unexpected error occurred");
        }
    };

    const handleAssignManager = async (email: string) => {
        setIsAssigning(true);
        try {
            const res = await assignInstitutionManager(email, id);
            if (res.success) {
                toast.success("Manager assigned successfully");
                setManagerEmail("");
                setShowSuggestions(false);
                fetchData();
            } else {
                toast.error(res.error || "Failed to assign manager");
            }
        } catch (error) {
            console.error("Assign error:", error);
            toast.error("Failed to assign manager");
        } finally {
            setIsAssigning(false);
        }
    };

    const handleRemoveManager = async (userId: string, name: string) => {
        if (!confirm(`Are you sure you want to remove ${name} as a manager?`)) return;

        try {
            const res = await removeInstitutionManager(userId, id);
            if (res.success) {
                toast.success("Manager removed successfully");
                fetchData();
            } else {
                toast.error(res.error || "Failed to remove manager");
            }
        } catch (error) {
            console.error("Remove manager error:", error);
            toast.error("Protocol failure during removal");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Loading Node...</span>
                </div>
            </div>
        );
    }

    if (!institution) return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
            <p className="text-gray-500 mb-8">Node not found in registry.</p>
            <Link href="/admin/institutions" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-gray-200">
                Back to Registry
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/institutions"
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </Link>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {institution.logo ? (
                                        <img src={institution.logo} alt={institution.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Building2 className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{institution.name}</h1>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-sm text-gray-500">{institution.slug}</span>
                                        <span className="text-sm text-gray-400">•</span>
                                        <span className="text-sm text-gray-500">{institution._count.users} users</span>
                                        <span className="text-sm text-gray-400">•</span>
                                        <span className="text-sm text-gray-500">{institution._count.classrooms} batches</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`px-6 py-4 text-sm font-semibold transition-colors relative ${activeTab === "details"
                                    ? "text-orange-600 border-b-2 border-orange-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab("access")}
                            className={`px-6 py-4 text-sm font-semibold transition-colors relative ${activeTab === "access"
                                    ? "text-orange-600 border-b-2 border-orange-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Access Control
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "details" ? (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-white border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Institution Details</h3>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                                            <input
                                                {...form.register("name")}
                                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        {...form.register("domain")}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all lowercase"
                                                        placeholder="domain.edu"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                                                <div className="relative">
                                                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        {...form.register("logo")}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={form.formState.isSubmitting}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50"
                                            >
                                                {form.formState.isSubmitting ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="access"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-white border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Manager Access</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign New Manager</label>
                                            <div className="flex gap-3">
                                                <div className="relative flex-1">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        placeholder="Enter email address..."
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                                        value={managerEmail}
                                                        onChange={(e) => {
                                                            setManagerEmail(e.target.value);
                                                            setShowSuggestions(true);
                                                        }}
                                                    />

                                                    {/* Suggestions */}
                                                    {showSuggestions && suggestions.length > 0 && (
                                                        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-2 shadow-lg z-50 overflow-hidden">
                                                            {suggestions.map((u) => (
                                                                <button
                                                                    key={u.id}
                                                                    onClick={() => {
                                                                        handleAssignManager(u.email);
                                                                        setShowSuggestions(false);
                                                                    }}
                                                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                                                                >
                                                                    <div>
                                                                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                                        <div className="text-xs text-gray-500">{u.email}</div>
                                                                    </div>
                                                                    <Plus className="w-4 h-4 text-gray-400" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    disabled={!managerEmail || isAssigning}
                                                    onClick={() => handleAssignManager(managerEmail)}
                                                    className="px-6 py-2 bg-gray-900 text-white hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isAssigning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-200">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Active Managers ({institution.users?.length || 0})</h4>
                                            <div className="space-y-3">
                                                {institution.users?.map((user: any) => (
                                                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-orange-600 text-sm font-semibold">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                                <div className="text-xs text-gray-500">{user.email}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveManager(user.id, user.name)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            title="Remove Manager"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!institution.users || institution.users.length === 0) && (
                                                    <div className="py-12 text-center">
                                                        <Shield className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                                        <p className="text-sm text-gray-500">No managers assigned yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="w-5 h-5 text-orange-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`/institutions/${institution.slug}`}
                                target="_blank"
                                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900">Public Portal</span>
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </Link>
                            <div className="p-4 bg-orange-50 border border-orange-100">
                                <p className="text-xs text-orange-700">
                                    Last updated: {new Date().toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

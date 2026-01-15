"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
    createInvite,
    getInstitutionInvites,
    toggleInvite,
    deleteInvite
} from "@/actions/institution/invite";
import {
    Link as LinkIcon,
    Copy,
    Plus,
    RefreshCcw,
    Trash2,
    Check,
    Calendar,
    Users,
    Power,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function InvitesPage() {
    const { data: session } = authClient.useSession();
    const [invites, setInvites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [role, setRole] = useState<"TEACHER" | "CONTEST_MANAGER" | "STUDENT">("TEACHER");
    const [maxUses, setMaxUses] = useState<number | undefined>(undefined);
    const [expiresAt, setExpiresAt] = useState<string>("");

    const institutionId = (session?.user as any)?.institutionId;

    const fetchInvites = async () => {
        if (!institutionId) return;
        setIsLoading(true);
        const res = await getInstitutionInvites(institutionId);
        if (res.success && res.invites) {
            setInvites(res.invites);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (institutionId) fetchInvites();
    }, [institutionId]);

    const handleCreate = async () => {
        if (!institutionId) return;
        setIsCreating(true);
        try {
            const res = await createInvite({
                institutionId,
                role,
                maxUses: maxUses || undefined,
                expiresAt: expiresAt || undefined
            });

            if (res.success) {
                toast.success("Invite link created");
                setMaxUses(undefined);
                setExpiresAt("");
                fetchInvites();
            } else {
                toast.error(res.error || "Failed to create invite");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopy = (code: string) => {
        const url = `${window.location.origin}/invite/${code}`;
        navigator.clipboard.writeText(url);
        toast.success("Invite link copied to clipboard");
    };

    const handleToggle = async (id: string) => {
        const res = await toggleInvite(id);
        if (res.success) {
            toast.success("Invite status updated");
            fetchInvites();
        } else {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this invite?")) return;
        const res = await deleteInvite(id);
        if (res.success) {
            toast.success("Invite deleted");
            fetchInvites();
        } else {
            toast.error("Failed to delete invite");
        }
    };

    if (isLoading && invites.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Invite Links</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Create and manage access links for your staff.</p>
                </div>

                <button
                    onClick={() => document.getElementById("create-section")?.scrollIntoView({ behavior: 'smooth' })}
                    className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm"
                >
                    <Plus className="w-4 h-4" />
                    New Invite
                </button>
            </div>

            {/* Create Section */}
            <div id="create-section" className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                        <Plus className="w-4 h-4" />
                    </div>
                    Create New Invite
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as any)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
                        >
                            <option value="TEACHER">Teacher</option>
                            <option value="CONTEST_MANAGER">Contest Manager</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Max Uses (Optional)</label>
                        <input
                            type="number"
                            min="1"
                            value={maxUses || ""}
                            onChange={(e) => setMaxUses(e.target.value ? parseInt(e.target.value) : undefined)}
                            placeholder="Unlimited"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase">Expires At (Optional)</label>
                         <input
                            type="datetime-local"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
                         />
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={isCreating}
                        className="h-[46px] w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate Link"}
                    </button>
                </div>
            </div>

            {/* List Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invites.map((invite) => (
                    <div key={invite.id} className={`group relative bg-white dark:bg-[#141414] border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        !invite.isActive ? 'border-gray-200 dark:border-[#262626] opacity-75' : 'border-gray-200 dark:border-[#262626] hover:border-orange-500/30'
                    }`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                invite.role === 'TEACHER'
                                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            }`}>
                                {invite.role.replace('_', ' ')}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggle(invite.id)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        invite.isActive
                                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]'
                                    }`}
                                    title={invite.isActive ? "Deactivate" : "Activate"}
                                >
                                    <Power className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(invite.id)}
                                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-[#262626] group-hover:border-orange-200 dark:group-hover:border-orange-500/20 transition-colors">
                                <div className="p-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm">
                                    <LinkIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <code className="flex-1 font-mono text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wider">
                                    {invite.code}
                                </code>
                                <button
                                    onClick={() => handleCopy(invite.code)}
                                    className="p-2 hover:bg-white dark:hover:bg-[#262626] rounded-lg transition-colors text-gray-400 hover:text-orange-500"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1.5" title="Uses">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>{invite.uses} / {invite.maxUses || '∞'}</span>
                                </div>
                                {invite.expiresAt && (
                                    <div className="flex items-center gap-1.5" title="Expires">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{format(new Date(invite.expiresAt), 'MMM d, yyyy')}</span>
                                    </div>
                                )}
                            </div>

                            {!invite.isActive && (
                                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                                    <span className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl">Deactivated</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {invites.length === 0 && !isLoading && (
                 <div className="text-center py-24 bg-gray-50 dark:bg-[#141414]/50 border border-dashed border-gray-200 dark:border-[#262626] rounded-3xl">
                    <div className="w-16 h-16 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <LinkIcon className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No invite links generated</h3>
                    <p className="text-sm text-gray-500 mt-2">Create your first invite link to start adding members.</p>
                 </div>
            )}
        </div>
    );
}

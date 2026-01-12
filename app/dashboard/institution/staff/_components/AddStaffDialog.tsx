"use client";

import { useState, useEffect } from "react";
import { X, Mail, Check, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { searchUsersByEmail } from "@/actions/admin/institution";
import { addStaffMember } from "@/actions/institution/staff";

interface AddStaffDialogProps {
    isOpen: boolean;
    onClose: () => void;
    institutionId: string;
    onSuccess: () => void;
}

export function AddStaffDialog({ isOpen, onClose, institutionId, onSuccess }: AddStaffDialogProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"TEACHER" | "CONTEST_MANAGER">("TEACHER");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedEmail = useDebounce(email, 300);

    useEffect(() => {
        if (debouncedEmail && debouncedEmail.length > 2) {
            searchUsersByEmail(debouncedEmail).then(res => {
                if (res.success && res.users) {
                    setSuggestions(res.users);
                    setShowSuggestions(true);
                }
            });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [debouncedEmail]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !institutionId) return;

        setIsSubmitting(true);
        try {
            const res = await addStaffMember({
                email,
                role,
                institutionId
            });

            if (res.success) {
                toast.success(`${role === "TEACHER" ? "Teacher" : "Contest Manager"} added successfully`);
                setEmail("");
                onSuccess();
                onClose();
            } else {
                toast.error(res.error || "Failed to add staff member");
            }
        } catch (error) {
            console.error("Add staff error:", error);
            toast.error("Failed to add staff member");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-orange-600" />
                        Add Staff Member
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Staff Role</label>
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setRole("TEACHER")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${role === "TEACHER"
                                    ? "bg-white text-orange-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Teacher
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("CONTEST_MANAGER")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${role === "CONTEST_MANAGER"
                                    ? "bg-white text-green-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Manager
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">User Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => email.length > 2 && setShowSuggestions(true)}
                                placeholder="staff@example.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 outline-none transition-all"
                                autoComplete="off"
                                required
                            />
                        </div>

                        {/* recommendations */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50 border-t-0">
                                {suggestions.map((user) => (
                                    <button
                                        key={user.id}
                                        type="button"
                                        onClick={() => {
                                            setEmail(user.email);
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition-colors text-left group"
                                    >
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900">{user.name || "Unnamed User"}</div>
                                            <div className="text-[10px] text-gray-500">{user.email}</div>
                                        </div>
                                        <Check className="w-3 h-3 text-orange-500 opacity-0 group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={isSubmitting || !email}
                            className="w-full py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-gray-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isSubmitting ? "Adding..." : `Add ${role === "TEACHER" ? "Teacher" : "Manager"}`}
                        </button>
                        <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed">
                            Newly added staff will immediately receive access to their respective dashboards.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

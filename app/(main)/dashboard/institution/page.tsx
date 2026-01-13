"use client";

import { useEffect, useState, Suspense } from "react";
import { getInstitutionStatsAction, addStaffMember, getInstitutionStaff } from "@/actions/institution/staff";
import { searchUsersByEmail } from "@/actions/admin/institution";
import {
    Users,
    GraduationCap,
    Building2,
    Mail,
    Plus,
    Loader2,
    Check,
    Trophy,
    BookOpen,
    UserCheck,
    Search,
    ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { authClient } from "@/lib/auth-client";

function InstitutionDashboardContent() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const [stats, setStats] = useState<any>(null);
    const [staff, setStaff] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [managerEmail, setManagerEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<"TEACHER" | "CONTEST_MANAGER">("TEACHER");
    const [isAssigning, setIsAssigning] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedEmail = useDebounce(managerEmail, 300);
    const institutionId = (session?.user as any)?.institutionId;

    const fetchData = async () => {
        if (!institutionId) return;
        setIsLoading(true);
        try {
            const [statsRes, staffRes] = await Promise.all([
                getInstitutionStatsAction(institutionId),
                getInstitutionStaff(institutionId)
            ]);

            if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
            if (staffRes.success && staffRes.staff) setStaff(staffRes.staff);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSessionPending) return;

        if (institutionId) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [institutionId, isSessionPending]);

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

    const handleAddStaff = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!managerEmail || !institutionId) return;

        setIsAssigning(true);
        try {
            const res = await addStaffMember({
                email: managerEmail,
                role: selectedRole,
                institutionId
            });

            if (res.success) {
                toast.success(`${selectedRole === "TEACHER" ? "Teacher" : "Contest Manager"} added successfully`);
                setManagerEmail("");
                setShowSuggestions(false);
                fetchData();
            } else {
                toast.error(res.error || "Failed to add staff member");
            }
        } catch (error) {
            console.error("Add staff error:", error);
            toast.error("Failed to add staff member");
        } finally {
            setIsAssigning(false);
        }
    };

    if (isSessionPending || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!session || !["INSTITUTION_MANAGER", "ADMIN"].includes((session.user as any).role)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-center px-6">
                Unauthorized. Only Institution Managers or Admins can access this page.
            </div>
        );
    }

    if (!institutionId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
                <Building2 className="w-12 h-12 text-gray-300" />
                <div className="text-center md:max-w-md px-6">
                    <h2 className="text-xl font-bold text-gray-900">No Institution Assigned</h2>
                    <p className="mt-2">Your account is not associated with any institution. Please contact an administrator to be assigned to your organization.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white/50">
            <div className="max-w-6xl mx-auto ml-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Institution Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your institution's staff and monitor activity.</p>
                    </div>
                    {(session.user as any).institution?.name && (
                        <div className="px-4 py-2 bg-orange-50 border border-orange-100 rounded-xl flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold text-orange-900">{(session.user as any).institution.name}</span>
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Students"
                        value={stats?.students || 0}
                        icon={<Users className="w-6 h-6 text-blue-600" />}
                        color="blue"
                    />
                    <StatCard
                        title="Total Teachers"
                        value={stats?.teachers || 0}
                        icon={<GraduationCap className="w-6 h-6 text-orange-600" />}
                        color="orange"
                    />
                    <StatCard
                        title="Classrooms"
                        value={stats?.classrooms || 0}
                        icon={<BookOpen className="w-6 h-6 text-purple-600" />}
                        color="purple"
                    />
                    <StatCard
                        title="Contest Managers"
                        value={stats?.contestManagers || 0}
                        icon={<Trophy className="w-6 h-6 text-green-600" />}
                        color="green"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Staff List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-gray-200/30">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-orange-600" />
                                Staff Members
                            </h2>
                            <div className="space-y-4">
                                {staff.length > 0 ? (
                                    staff.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group transition-all hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold overflow-hidden">
                                                    {member.image ? (
                                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        member.name?.[0] || member.email[0]
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{member.name || "Unnamed User"}</div>
                                                    <div className="text-xs text-gray-500">{member.email}</div>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${member.role === "TEACHER"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-green-100 text-green-700"
                                                }`}>
                                                {member.role.replace("_", " ")}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                                        <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-sm text-gray-400">No staff members added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add Staff Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-gray-200/30">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-orange-600" />
                                Add Staff Member
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Staff Role</label>
                                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                                        <button
                                            onClick={() => setSelectedRole("TEACHER")}
                                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedRole === "TEACHER"
                                                ? "bg-white text-orange-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Teacher
                                        </button>
                                        <button
                                            onClick={() => setSelectedRole("CONTEST_MANAGER")}
                                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedRole === "CONTEST_MANAGER"
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
                                            value={managerEmail}
                                            onChange={(e) => setManagerEmail(e.target.value)}
                                            onFocus={() => managerEmail.length > 2 && setShowSuggestions(true)}
                                            placeholder="staff@example.com"
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 outline-none transition-all"
                                            autoComplete="off"
                                        />
                                    </div>

                                    {/* recommendations */}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50">
                                            {suggestions.map((user) => (
                                                <button
                                                    key={user.id}
                                                    onClick={() => {
                                                        setManagerEmail(user.email);
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

                                <button
                                    onClick={() => handleAddStaff()}
                                    disabled={isAssigning || !managerEmail}
                                    className="w-full py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
                                >
                                    {isAssigning ? "Processing..." : `Add ${selectedRole === "TEACHER" ? "Teacher" : "Manager"}`}
                                </button>
                                <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed">
                                    Newly added staff will immediately receive access to their respective dashboards.
                                </p>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
                            <div className="relative z-10">
                                <ShieldCheck className="w-8 h-8 mb-4 opacity-80" />
                                <h3 className="text-lg font-bold mb-2">Manager Access</h3>
                                <p className="text-sm text-blue-100 leading-relaxed">
                                    You have full control over your institution's staff roles. Changes take effect immediately.
                                </p>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InstitutionDashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <InstitutionDashboardContent />
        </Suspense>
    );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
    const colorClasses: any = {
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
        green: "bg-green-50 text-green-600",
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</div>
            <div className="text-3xl font-black text-gray-900 mt-1">{value}</div>
        </div>
    );
}

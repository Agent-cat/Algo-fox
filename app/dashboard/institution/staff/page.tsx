"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { getInstitutionStaff } from "@/actions/institution/staff";
import { authClient } from "@/lib/auth-client";
import {
    UserCheck,
    Plus,
    Loader2,
    Users,
    GraduationCap,
    Trophy,
    Filter,
    ChevronRight,
    Building2
} from "lucide-react";
import { DataTable } from "./_components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddStaffDialog } from "./_components/AddStaffDialog";
import Link from "next/link";
import { toast } from "sonner";

interface StaffMember {
    id: string;
    name: string | null;
    email: string;
    role: "TEACHER" | "CONTEST_MANAGER";
    image: string | null;
}

function StaffManagementContent() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [filterRole, setFilterRole] = useState<"ALL" | "TEACHER" | "CONTEST_MANAGER">("ALL");

    const institutionId = (session?.user as any)?.institutionId;

    const fetchStaff = async () => {
        if (!institutionId) return;
        setIsLoading(true);
        try {
            const res = await getInstitutionStaff(institutionId);
            if (res.success && res.staff) {
                setStaff(res.staff as StaffMember[]);
            } else {
                toast.error(res.error || "Failed to load staff");
            }
        } catch (error) {
            console.error("Fetch staff error:", error);
            toast.error("An error occurred while loading staff");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSessionPending) return;

        if (institutionId) {
            fetchStaff();
        } else {
            setIsLoading(false);
        }
    }, [institutionId, isSessionPending]);

    const filteredStaff = useMemo(() => {
        if (filterRole === "ALL") return staff;
        return staff.filter(member => member.role === filterRole);
    }, [staff, filterRole]);

    const columns: ColumnDef<StaffMember>[] = [
        {
            accessorKey: "name",
            header: "Staff Member",
            cell: ({ row }) => {
                const member = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold overflow-hidden border border-gray-100">
                            {member.image ? (
                                <img src={member.image} alt={member.name || ""} className="w-full h-full object-cover" />
                            ) : (
                                (member.name?.[0] || member.email[0]).toUpperCase()
                            )}
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{member.name || "Unnamed User"}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const role = row.getValue("role") as string;
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${role === "TEACHER"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                        }`}>
                        {role === "TEACHER" ? (
                            <GraduationCap className="w-3 h-3 mr-1" />
                        ) : (
                            <Trophy className="w-3 h-3 mr-1" />
                        )}
                        {role.replace("_", " ")}
                    </div>
                );
            }
        },
        {
            id: "actions",
            header: () => <div className="text-right">Manage</div>,
            cell: ({ row }) => {
                return (
                    <div className="text-right">
                        <button className="text-xs font-bold text-gray-400 hover:text-orange-600 transition-colors">
                            Manage
                        </button>
                    </div>
                );
            }
        }
    ];

    if (isSessionPending || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!session || !["INSTITUTION_MANAGER", "ADMIN"].includes((session.user as any).role)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium text-center px-6">
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
                    <p className="mt-2 text-sm">Your account is not associated with any institution. Please contact an administrator to be assigned to your organization.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white/50">
            <div className="max-w-6xl mx-auto ml-0">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <Link href="/dashboard/institution" className="hover:text-orange-600 transition-colors">Dashboard</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900">Staff Management</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <Users className="w-8 h-8 text-orange-600" />
                            Staff Management
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium italic">Manage roles and access for your institution's team.</p>
                    </div>

                    <button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl shadow-gray-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Staff
                    </button>
                </div>

                {/* Filters and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                    <select
                                        value={filterRole}
                                        onChange={(e) => setFilterRole(e.target.value as any)}
                                        className="text-sm font-bold text-gray-700 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                                    >
                                        <option value="ALL">All Staff</option>
                                        <option value="TEACHER">Teachers</option>
                                        <option value="CONTEST_MANAGER">Contest Managers</option>
                                    </select>
                                </div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Showing {filteredStaff.length} Result{filteredStaff.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        <DataTable
                            columns={columns}
                            data={filteredStaff}
                            searchKey="name"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-gray-200/30">
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-orange-600" />
                                Institution
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100/50">
                                    <div className="text-xs font-bold text-orange-600 uppercase mb-1">Current Institution</div>
                                    <div className="text-lg font-black text-orange-900">{(session.user as any).institution?.name || "Loading..."}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl text-center">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Teachers</div>
                                        <div className="text-xl font-black text-gray-900">{staff.filter(s => s.role === "TEACHER").length}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl text-center">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Managers</div>
                                        <div className="text-xl font-black text-gray-900">{staff.filter(s => s.role === "CONTEST_MANAGER").length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
                            <div className="relative z-10">
                                <UserCheck className="w-10 h-10 mb-4 text-blue-200" />
                                <h3 className="text-lg font-black mb-2 tracking-tight">Role Definitions</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 group/item">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0 group-hover/item:scale-125 transition-transform" />
                                        <p className="text-xs font-medium text-blue-100 leading-relaxed italic">
                                            <span className="font-bold text-white uppercase tracking-wider block mb-0.5">Teacher</span>
                                            Can manage classrooms and view student progress.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-2 group/item">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0 group-hover/item:scale-125 transition-transform" />
                                        <p className="text-xs font-medium text-blue-100 leading-relaxed italic">
                                            <span className="font-bold text-white uppercase tracking-wider block mb-0.5">Contest Manager</span>
                                            Can create and manage institution-level contests.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>

            <AddStaffDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                institutionId={institutionId}
                onSuccess={fetchStaff}
            />
        </div>
    );
}

export default function StaffManagementPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <StaffManagementContent />
        </Suspense>
    );
}

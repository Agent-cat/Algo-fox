"use client";

import { useState } from "react";
import { deleteStaffMember } from "@/actions/institution/staff";
import {
    Trash2,
    MoreVertical,
    Mail,
    Calendar,
    BookOpen,
    Shield,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface UserListProps {
    users: any[];
    role: "TEACHER" | "CONTEST_MANAGER" | "STUDENT";
    pagination?: {
        total: number;
        pages: number;
        current: number;
        limit: number;
    };
    onPageChange?: (page: number) => void;
    onRefresh: () => void;
    isLoading?: boolean;
}

export default function UserList({ users, role, pagination, onPageChange, onRefresh, isLoading }: UserListProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to remove this user from the institution? They will be downgraded to a regular student (if not already) and removed from the institution.")) return;

        setIsDeleting(userId);
        try {
            const res = await deleteStaffMember(userId);
            if (res.success) {
                toast.success("User removed successfully");
                onRefresh();
            } else {
                toast.error("Failed to remove user");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setIsDeleting(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-[#141414] border border-dashed border-gray-200 dark:border-[#262626] rounded-2xl">
                <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <UsersIcon role={role} className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No {role.toLowerCase().replace("_", " ")}s found</h3>
                <p className="text-sm text-gray-500 mt-2">
                    {role === "STUDENT"
                        ? "Students will appear here once they join your institution."
                        : "Add manually or use invite links to grow your team."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="group bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 dark:hover:border-orange-500/20 relative overflow-hidden">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button
                                onClick={() => handleDelete(user.id)}
                                disabled={isDeleting === user.id}
                                className="p-2 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                title="Remove from institution"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] flex items-center justify-center overflow-hidden shadow-inner">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xl font-black text-gray-300 dark:text-gray-600">{user.name?.[0]}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{user.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <Mail className="w-3 h-3" />
                                    <span className="truncate max-w-[150px]">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm py-2 border-t border-gray-50 dark:border-[#1a1a1a]">
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Joined</span>
                                <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300 text-xs">
                                    <Calendar className="w-3 h-3 text-gray-400" />
                                    {format(new Date(user.createdAt), 'MMM d, yyyy')}
                                </div>
                            </div>

                            {role === "TEACHER" && (
                                <div className="flex items-center justify-between text-sm py-2 border-t border-gray-50 dark:border-[#1a1a1a]">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Classrooms</span>
                                    <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300 text-xs">
                                        <BookOpen className="w-3 h-3 text-gray-400" />
                                        {user._count?.taughtClassrooms || 0}
                                    </div>
                                </div>
                            )}

                             <div className="pt-4 flex items-center justify-between">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    role === 'TEACHER' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' :
                                    role === 'CONTEST_MANAGER' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                }`}>
                                    {role.replace('_', ' ')}
                                </span>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#262626] pt-4">
                     <p className="text-xs text-gray-500 dark:text-gray-400">
                        Showing <span className="font-bold">{((pagination.current - 1) * pagination.limit) + 1}</span> to <span className="font-bold">{Math.min(pagination.current * pagination.limit, pagination.total)}</span> of <span className="font-bold">{pagination.total}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange?.(pagination.current - 1)}
                            disabled={pagination.current <= 1}
                            className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 px-2">{pagination.current}</span>
                        <button
                            onClick={() => onPageChange?.(pagination.current + 1)}
                            disabled={pagination.current >= pagination.pages}
                            className="p-2 rounded-lg border border-gray-200 dark:border-[#262626] disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function UsersIcon({ role, className }: { role: string, className?: string }) {
    if (role === 'TEACHER') return <BookOpen className={className} />;
    if (role === 'CONTEST_MANAGER') return <Shield className={className} />;
    return <UsersIcon.Default className={className} />;
}
UsersIcon.Default = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

"use client";

import { useEffect, useState } from "react";
import { getInstitutionUsers } from "@/actions/institution/staff";
import { authClient } from "@/lib/auth-client";
import UserList from "@/components/institution/UserList";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

export default function TeachersPage() {
    const { data: session } = authClient.useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const institutionId = (session?.user as any)?.institutionId;

    const fetchData = async () => {
        if (!institutionId) return;
        setIsLoading(true);
        const res = await getInstitutionUsers(institutionId, "TEACHER", currentPage);
        if (res.success && res.users) {
            setUsers(res.users);
            setPagination(res.pagination);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (institutionId) fetchData();
    }, [institutionId, currentPage]);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Teachers</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your academic staff and educators.</p>
                </div>
                <Link
                    href="/dashboard/institution/invites"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-gray-200 dark:shadow-none"
                >
                    <Plus className="w-4 h-4" />
                    Invite Teachers
                </Link>
            </div>

            <UserList
                users={users}
                role="TEACHER"
                onRefresh={fetchData}
                pagination={pagination}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />
        </div>
    );
}

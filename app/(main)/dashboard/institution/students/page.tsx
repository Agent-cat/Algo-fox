"use client";

import { useEffect, useState } from "react";
import { getInstitutionUsers } from "@/actions/institution/staff";
import { authClient } from "@/lib/auth-client";
import UserList from "@/components/institution/UserList";
import { Loader2 } from "lucide-react";

export default function StudentsPage() {
    const { data: session } = authClient.useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const institutionId = (session?.user as any)?.institutionId;

    const fetchData = async () => {
        if (!institutionId) return;
        setIsLoading(true);
        const res = await getInstitutionUsers(institutionId, "STUDENT", currentPage);
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
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Students</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">All students currently enrolled in your institution.</p>
                </div>
            </div>

            <UserList
                users={users}
                role="STUDENT"
                onRefresh={fetchData}
                pagination={pagination}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />
        </div>
    );
}

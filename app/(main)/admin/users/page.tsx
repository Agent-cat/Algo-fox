import { Suspense } from "react";
import UserList from "@/components/admin/users/UserList";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateUserDialog from "@/components/admin/users/CreateUserDialog";

export default function UsersPage() {
    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Users</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage users, roles, and permissions.</p>
                </div>
                <CreateUserDialog />
            </div>

            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm overflow-hidden">
                <Suspense fallback={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading users...</div>}>
                    <UserList />
                </Suspense>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserActions from "./UserActions";
import { format } from "date-fns";

export default function UserList() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to page 1 on search
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await authClient.admin.listUsers({
                query: {
                    limit,
                    offset: (page - 1) * limit,
                    searchValue: debouncedSearch,
                    searchField: "name" // or email
                }
            });

            if (data) {
                setUsers(data.users);
                setTotal(data.total || 0);
            }
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, limit, debouncedSearch]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        placeholder="Search users..."
                        className="pl-9 bg-white dark:bg-[#141414] dark:border-[#333] dark:text-white dark:placeholder:text-gray-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={fetchUsers} title="Refresh List">
                        <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total: <span className="font-medium text-gray-900 dark:text-white">{total}</span> users
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="relative min-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-[#262626]">
                            <TableHead className="text-gray-500 dark:text-gray-400">User</TableHead>
                            <TableHead className="text-gray-500 dark:text-gray-400">Role</TableHead>
                            <TableHead className="text-gray-500 dark:text-gray-400">Status</TableHead>
                            <TableHead className="text-gray-500 dark:text-gray-400">Joined</TableHead>
                            <TableHead className="text-right text-gray-500 dark:text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-[400px] text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <Loader2 className="w-8 h-8 animate-spin mb-2 text-orange-500" />
                                        <p>Loading users...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-[200px] text-center text-gray-500">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id} className="group hover:bg-orange-50/30 dark:hover:bg-orange-500/5 transition-colors border-gray-100 dark:border-[#262626]">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize bg-white dark:bg-[#1a1a1a] shadow-sm dark:border-[#333] dark:text-gray-300">
                                            {user.role || "user"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.banned ? (
                                            <Badge variant="destructive" className="items-center gap-1">
                                                Banned
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20 hover:bg-green-100 dark:hover:bg-green-500/10">
                                                Active
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400 text-sm">
                                        {user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <UserActions user={user} onUpdate={fetchUsers} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                    className="dark:bg-[#141414] dark:border-[#333] dark:text-gray-300 dark:hover:bg-[#262626]"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                </Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Page {page} of {Math.max(1, totalPages)}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || loading}
                    className="dark:bg-[#141414] dark:border-[#333] dark:text-gray-300 dark:hover:bg-[#262626]"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

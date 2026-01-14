"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Ban, CheckCircle, Trash2, UserCog, Key, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserActionsProps {
    user: any; // Type from better-auth
    onUpdate?: () => void;
}

export default function UserActions({ user, onUpdate }: UserActionsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [actionDialog, setActionDialog] = useState<"ban" | "role" | "delete" | null>(null);
    const [banReason, setBanReason] = useState("");
    const [selectedRole, setSelectedRole] = useState(user.role || "user");

    const handleImpersonate = async () => {
        try {
            setLoading(true);
            const { data, error } = await authClient.admin.impersonateUser({
                userId: user.id
            });
            if (error) throw error;
            toast.success(`Impersonating ${user.name}`);
            window.location.href = "/dashboard"; // Redirect to dashboard as user
        } catch (err: any) {
            toast.error(err.message || "Failed to impersonate");
        } finally {
            setLoading(false);
        }
    };

    const handleBan = async () => {
        try {
            setLoading(true);
            const { error } = await authClient.admin.banUser({
                userId: user.id,
                banReason: banReason || "No reason provided"
            });
            if (error) throw error;
            toast.success("User banned successfully");
            setActionDialog(null);
            router.refresh();
            onUpdate?.();
        } catch (err: any) {
            toast.error(err.message || "Failed to ban user");
        } finally {
            setLoading(false);
        }
    };

    const handleUnban = async () => {
        try {
            setLoading(true);
            const { error } = await authClient.admin.unbanUser({
                userId: user.id
            });
            if (error) throw error;
            toast.success("User unbanned successfully");
            router.refresh();
            onUpdate?.();
        } catch (err: any) {
            toast.error(err.message || "Failed to unban user");
        } finally {
            setLoading(false);
        }
    };

    const handleSetRole = async () => {
        try {
            setLoading(true);
            const { error } = await authClient.admin.setRole({
                userId: user.id,
                role: selectedRole
            });
            if (error) throw error;
            toast.success("Role updated successfully");
            setActionDialog(null);
            router.refresh();
            onUpdate?.();
        } catch (err: any) {
            toast.error(err.message || "Failed to update role");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const { error } = await authClient.admin.removeUser({
                userId: user.id
            });
            if (error) throw error;
            toast.success("User deleted successfully");
            setActionDialog(null);
            router.refresh();
            onUpdate?.();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                title="Impersonate"
                onClick={handleImpersonate}
                disabled={loading}
            >
                <LogIn className="w-4 h-4 text-blue-500" />
            </Button>

            {user.banned ? (
                <Button
                    variant="ghost"
                    size="icon"
                    title="Unban"
                    onClick={handleUnban}
                    disabled={loading}
                >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                </Button>
            ) : (
                <Button
                    variant="ghost"
                    size="icon"
                    title="Ban"
                    onClick={() => setActionDialog("ban")}
                    disabled={loading}
                >
                    <Ban className="w-4 h-4 text-orange-500" />
                </Button>
            )}

            <Button
                variant="ghost"
                size="icon"
                title="Change Role"
                onClick={() => setActionDialog("role")}
                disabled={loading}
            >
                <UserCog className="w-4 h-4 text-gray-500" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                title="Delete User"
                className="hover:bg-red-50"
                onClick={() => setActionDialog("delete")}
                disabled={loading}
            >
                <Trash2 className="w-4 h-4 text-red-500" />
            </Button>

            {/* Ban Dialog */}
            <Dialog open={actionDialog === "ban"} onOpenChange={(open) => !open && setActionDialog(null)}>
                <DialogHeader>
                    <DialogTitle>Ban User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to ban {user.name}? They will not be able to log in.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <label className="text-sm font-medium mb-2 block">Reason</label>
                    <Input
                        value={banReason}
                        onChange={(e) => setBanReason(e.target.value)}
                        placeholder="Violation of terms..."
                    />
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setActionDialog(null)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleBan} disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Ban User
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Role Dialog */}
            <Dialog open={actionDialog === "role"} onOpenChange={(open) => !open && setActionDialog(null)}>
                <DialogHeader>
                    <DialogTitle>Change Role</DialogTitle>
                    <DialogDescription>
                        Update the role for {user.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <label className="text-sm font-medium mb-2 block">Role</label>
                    <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="INSTITUTION_MANAGER">Institution Manager</option>
                        <option value="TEACHER">Teacher</option>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setActionDialog(null)}>Cancel</Button>
                    <Button onClick={handleSetRole} disabled={loading} className="bg-orange-600 text-white">
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Update Role
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={actionDialog === "delete"} onOpenChange={(open) => !open && setActionDialog(null)}>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {user.name}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setActionDialog(null)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Delete User
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

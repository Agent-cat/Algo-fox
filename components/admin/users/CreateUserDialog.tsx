"use client";

import { useState } from "react";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Since I implemented a custom Dialog in the previous step that uses different exports (Dialog, DialogHeader... but not DialogContent/Trigger in the exact way radix does),
// I need to adjust my usage or update the Dialog component.
// My custom Dialog implementation in step 127 exported Dialog, DialogHeader, etc directly.
// But typically Shadcn uses DialogTrigger, DialogContent.
// My implementation: <Dialog open={open} onOpenChange={setOpen}> <children> </Dialog>
// So I will wrap it myself.

export default function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.admin.createUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role as any
            });

            if (error) {
                toast.error(error.message || "Failed to create user");
            } else {
                toast.success("User created successfully");
                setOpen(false);
                setFormData({ name: "", email: "", password: "", role: "user" });
                router.refresh(); // Refresh to show new user
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add User
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Add a new user to the system. They will receive an email with their login details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <Input
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white dark:bg-[#1a1a1a] dark:border-[#333] dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white dark:bg-[#1a1a1a] dark:border-[#333] dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Input
                            required
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="bg-white dark:bg-[#1a1a1a] dark:border-[#333] dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <Select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="bg-white dark:bg-[#1a1a1a] dark:border-[#333] dark:text-white"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="INSTITUTION_MANAGER">Institution Manager</option>
                            <option value="TEACHER">Teacher</option>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white">
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create User
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}

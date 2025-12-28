"use client";

import { deleteProblem } from "@/actions/problems";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteProblemButtonProps {
    id: string;
}

export default function DeleteProblemButton({ id }: DeleteProblemButtonProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this problem?")) return;

        const res = await deleteProblem(id);
        if (res.success) {
            toast.success("Problem deleted");
            router.refresh();
        } else {
            toast.error(res.error || "Failed to delete");
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}

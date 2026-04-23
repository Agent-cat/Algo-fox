"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCourse } from "@/actions/admin/course";
import { toast } from "sonner";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteCourseButtonProps {
    courseId: string;
    courseTitle: string;
    onSuccess?: () => void;
}

export default function DeleteCourseButton({ courseId, courseTitle, onSuccess }: DeleteCourseButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCourse(courseId);
            toast.success("Course deleted successfully");
            setIsOpen(false);
            onSuccess?.();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete course");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                disabled={isDeleting}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Delete Course"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>

            <Dialog open={isOpen} onOpenChangeAction={(open) => !isDeleting && setIsOpen(open)}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Delete Course?</DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400 font-medium py-2">
                            Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{courseTitle}"</span>?
                            This will permanently remove all modules, curriculum mappings, and student enrollments associated with this course.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="secondary"
                            disabled={isDeleting}
                            onClick={() => setIsOpen(false)}
                            className="rounded-2xl font-bold border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#262626]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white border-none shadow-lg shadow-red-500/20"
                        >
                            {isDeleting ? "Deleting..." : "Delete Permanently"}
                        </Button>
                    </DialogFooter>
            </Dialog>
        </>
    );
}

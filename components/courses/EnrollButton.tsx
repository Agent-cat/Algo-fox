"use client";

/** Enrollment button with confirmation modal */
import { useState } from "react";
import { enrollInCourse } from "@/actions/course";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
    courseId: string;
    slug: string;
    session: any;
    course: any;
}

 import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import Image from "next/image";
import { Check, ShieldCheck, Database, FileText } from "lucide-react";

export default function EnrollButton({ courseId, slug, session, course }: EnrollButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const router = useRouter();

    const handleEnroll = async () => {
        if (!session) {
            toast.error("Please login to enroll");
            router.push(`/signin?callbackUrl=/courses/${slug}`);
            return;
        }

        if (!hasAgreed) {
            toast.error("Please agree to the terms and data usage");
            return;
        }

        setIsLoading(true);
        try {
            const result = await enrollInCourse(courseId, slug);
            if (result.success) {
                toast.success("Successfully enrolled in the course!");
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to enroll");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const isUserRole = (session?.user as any)?.role === "USER";

    return (
        <>
            <button
                onClick={() => isUserRole ? router.push("/subscription") : setIsOpen(true)}
                className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isUserRole
                    ? "bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                }`}
            >
                {isUserRole && <ShieldCheck className="w-4 h-4" />}
                {isUserRole ? "Premium Subscription Required" : "Enroll Now"}
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen} className="max-w-[480px] p-0 shadow-2xl">
                    <div className="relative h-44 w-full">
                        {course.image ? (
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                <ShieldCheck className="w-16 h-16 text-white/20" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-[#0f0f0f] via-transparent to-transparent " />
                    </div>

                    <div className="px-8 pb-10 pt-2 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                                Confirm Enrollment
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                You are about to enroll in <span className="text-orange-500 font-bold">{course.title}</span>. Please review the following terms and conditions.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course Integrity</h4>
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                    <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        All submissions must be original work. Any form of plagiarism or academic dishonesty may lead to immediate disqualification from the course and potential institutional action.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Data & Privacy</h4>
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                    <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                        The institution will track your learning progress, including time spent, problem submissions, and scores. This data is used for performance analytics and certification purposes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative pt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={hasAgreed}
                                        onChange={(e) => setHasAgreed(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-200 dark:border-white/10 rounded-md transition-all peer-checked:bg-orange-500 peer-checked:border-orange-500 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform font-bold" />
                                    </div>
                                </div>
                                <span className="text-[12px] font-bold text-gray-500 dark:text-gray-400 leading-snug select-none group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                    I agree to the terms of enrollment and understand that my learning data will be shared with the institution.
                                </span>
                            </label>
                        </div>

                        <DialogFooter className="sm:justify-start pt-2">
                            <button
                                onClick={handleEnroll}
                                disabled={isLoading || !hasAgreed}
                                className="w-full h-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-lg dark:shadow-none"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Enrollment"}
                            </button>
                        </DialogFooter>
                    </div>
            </Dialog>
        </>
    );
}

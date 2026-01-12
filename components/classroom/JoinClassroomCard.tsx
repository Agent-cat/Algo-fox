"use client";

import { useState } from "react";
import { School, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { joinClassroom } from "@/actions/classroom";

export function JoinClassroomCard() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code || code.length < 6) {
            toast.error("Please enter a valid 6-character join code");
            return;
        }

        setIsLoading(true);
        try {
            const res = await joinClassroom(code);
            if (res.success) {
                toast.success(res.message);
                setCode("");
            } else {
                toast.error(res.error || "Failed to join classroom");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <School className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Join a Classroom</h3>
                        <p className="text-sm text-gray-500">Enter code to join your batch</p>
                    </div>
                </div>

                <form onSubmit={handleJoin} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="6-DIGIT CODE"
                            maxLength={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono text-center text-xl tracking-[0.5em] uppercase placeholder:text-gray-300 placeholder:tracking-normal placeholder:font-sans"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || code.length < 6}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn shadow-lg shadow-indigo-100"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Join Classroom
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

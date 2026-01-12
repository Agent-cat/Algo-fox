"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
    children: React.ReactNode;
    className?: string;
}

export function BackButton({ children, className }: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`group flex items-center gap-2 transition-colors text-xs uppercase tracking-wider ${className}`}
        >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {children}
        </button>
    );
}

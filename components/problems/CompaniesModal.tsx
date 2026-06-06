"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { parseCompanies } from "./CompanyAvatars";
import { X } from "lucide-react";

interface CompaniesModalProps {
    isOpen: boolean;
    onClose: () => void;
    companies?: any;
    problemTitle?: string;
}

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } as Transition },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn", delay: 0.05 } as Transition },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as any } as Transition,
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 10,
        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as any } as Transition,
    },
};



export default function CompaniesModal({
    isOpen,
    onClose,
    companies,
    problemTitle,
}: CompaniesModalProps) {
    const list = parseCompanies(companies);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    if (list.length === 0) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            key="modal"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-[#111111] border border-gray-200/80 dark:border-white/[0.07] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="relative px-7 pt-7 pb-5 border-b border-gray-100 dark:border-white/[0.06]">
                                <div>
                                    <h2 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight">
                                        Asked at {list.length} {list.length === 1 ? "Company" : "Companies"}
                                    </h2>
                                    <p className="mt-0.5 text-[13px] text-gray-400 dark:text-gray-500 leading-snug">
                                        {problemTitle
                                            ? `"${problemTitle}" has appeared in real interview rounds at these companies.`
                                            : "This problem has appeared in real interview rounds at these companies."}
                                    </p>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-150"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Company Grid */}
                            <div className="px-7 py-5 max-h-[420px] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {list.map((company, index) => {
                                        const logoSrc = company.logo?.trim();
                                        const displayName = company.name;

                                        return (
                                            <div
                                                key={`${displayName}-${index}`}
                                                className="group flex items-center gap-3.5 px-4 py-3 rounded-xl border border-gray-100 dark:border-white/[0.06] bg-gray-50/60 dark:bg-white/[0.025] hover:bg-white dark:hover:bg-white/[0.05] hover:border-gray-200 dark:hover:border-white/[0.1] hover:shadow-sm transition-all duration-150 cursor-default"
                                            >
                                                {/* Logo bubble */}
                                                <div className="w-9 h-9 rounded-full bg-white border border-gray-200/80 dark:border-white/10 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                                    {logoSrc ? (
                                                        <img
                                                            src={logoSrc}
                                                            alt={displayName}
                                                            className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-200"
                                                            onError={(e) => {
                                                                (e.target as HTMLElement).style.display = "none";
                                                                const fb = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                                                                if (fb) fb.style.display = "flex";
                                                            }}
                                                        />
                                                    ) : null}
                                                    <span
                                                        className="text-xs font-bold text-gray-500 uppercase hidden"
                                                        style={{ display: logoSrc ? "none" : "flex" }}
                                                    >
                                                        {displayName.charAt(0)}
                                                    </span>
                                                </div>

                                                {/* Name */}
                                                <span className="text-[13.5px] font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-150 tracking-tight truncate">
                                                    {displayName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>


                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Use a portal so the modal renders at document.body level
    if (typeof window === "undefined") return null;
    return createPortal(modalContent, document.body);
}

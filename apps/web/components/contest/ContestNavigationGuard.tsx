"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface ContestNavigationGuardProps {
    contestId: string;
    allowedPaths: string[];  // Paths that are allowed during contest
}

/**
 * Navigation Guard for Contest Mode
 * - Blocks browser back/forward
 * - Intercepts route changes
 * - Logs navigation attempts
 */
export default function ContestNavigationGuard({
    contestId,
    allowedPaths
}: ContestNavigationGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const initialPath = useRef(pathname);

    const pathsRef = useRef(allowedPaths);
    useEffect(() => {
        pathsRef.current = allowedPaths;
    }, [allowedPaths]);

    // 1. INITIAL MOUNT & POPSTATE LOCKING
    useEffect(() => {
        if (!contestId) return;

        const pushLockState = () => {
            try {
                // Skip if already locked to prevent browser throttling (SecurityError fix)
                if (window.history.state?.locked) return;
                window.history.pushState({ locked: true }, "", window.location.href);
            } catch (e) {
                // Silently handle throttling
            }
        };

        // Initial lock
        pushLockState();

        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            pushLockState();
            toast.error("Navigation blocked", {
                description: "Browser back/forward is disabled during the contest.",
                duration: 3000,
            });
        };

        const handleLinkClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || href === "#" || href.startsWith("javascript:")) return;

            // Resolve anchor.href which is already absolute relative to the document
            let targetPath = "";
            try {
                const url = new URL(anchor.href);
                // Only care about same-origin paths; external links are blocked by default if not in allowedPaths
                if (url.origin !== window.location.origin) {
                    targetPath = anchor.href; // Keep full URL for external checks
                } else {
                    targetPath = url.pathname;
                }
            } catch (e) {
                targetPath = href;
            }

            // Use ref to check current allowed paths without re-attaching listener
            const isAllowed = pathsRef.current.some(path => targetPath.startsWith(path));
            if (!isAllowed) {
                e.preventDefault();
                e.stopPropagation();
                toast.error("Navigation blocked", {
                    description: "You cannot navigate away during the contest.",
                    duration: 3000,
                });
            }
        };

        window.addEventListener("popstate", handlePopState);
        document.addEventListener("click", handleLinkClick, true);

        return () => {
            window.removeEventListener("popstate", handlePopState);
            document.removeEventListener("click", handleLinkClick, true);
        };
    }, [contestId]); // Only depends on contestId now

    // 2. MONITOR PATH CHANGES
    useEffect(() => {
        if (!contestId || pathname === initialPath.current) return;

        const isAllowed = allowedPaths.some(path => pathname?.startsWith(path));
        if (!isAllowed) {
            toast.error("Navigation blocked", {
                description: "You've been redirected back to the contest.",
                duration: 3000,
            });
            router.replace(initialPath.current || "/");
        }
    }, [contestId, pathname, allowedPaths, router]);

    // This component doesn't render anything
    return null;
}

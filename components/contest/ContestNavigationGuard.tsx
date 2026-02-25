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

    useEffect(() => {
        if (!contestId) return;

        // =============================================
        // 1. BLOCK BROWSER BACK/FORWARD
        // =============================================
        // Push current state to prevent back navigation
        const pushState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        pushState();

        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            pushState();

            // Show toast for navigation attempt
            toast.error("Navigation blocked", {
                description: "Browser back/forward is disabled during the contest.",
                duration: 3000,
            });
        };

        window.addEventListener("popstate", handlePopState);

        // =============================================
        // 2. INTERCEPT LINK CLICKS
        // =============================================
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (anchor) {
                const href = anchor.getAttribute("href");

                // Check if navigation is to an allowed path
                // Ignore hash links, empty links, or javascript:void, or disabled links
                if (href &&
                    href !== "#" &&
                    href.trim() !== "" &&
                    !href.startsWith("javascript:") &&
                    !allowedPaths.some(path => href.startsWith(path))) {
                    e.preventDefault();
                    e.stopPropagation();

                    toast.error("Navigation blocked", {
                        description: `You cannot navigate away during the contest.`,
                        duration: 3000,
                    });

                    return false;
                }
            }
        };

        document.addEventListener("click", handleLinkClick, true);

        // =============================================
        // 3. MONITOR PATH CHANGES
        // =============================================
        // If path changes unexpectedly, redirect back
        if (pathname !== initialPath.current) {
            const isAllowed = allowedPaths.some(path => pathname?.startsWith(path));

            if (!isAllowed) {
                toast.error("Navigation blocked", {
                    description: "You've been redirected back to the contest.",
                    duration: 3000,
                });

                // Redirect back to contest
                router.replace(initialPath.current || "/");
            }
        }

        return () => {
            window.removeEventListener("popstate", handlePopState);
            document.removeEventListener("click", handleLinkClick, true);
        };
    }, [contestId, pathname, allowedPaths, router]);

    // This component doesn't render anything
    return null;
}

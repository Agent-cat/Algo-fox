"use client";

import { usePathname } from "next/navigation";

export default function LayoutSpacer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Logic must match Navbar/Breadcrumbs: Identify workspace pages where Navbar is hidden
    const isWorkspace = pathname?.startsWith("/problems/") && pathname !== "/problems";
    const isContestPage = pathname?.startsWith("/contest/") && pathname !== "/contests";

    return (
        <div className={isWorkspace || isContestPage ? "" : "pt-16"}>
            {children}
        </div>
    );
}


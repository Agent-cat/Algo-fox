"use client";

import { usePathname } from "next/navigation";

export default function LayoutSpacer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Logic must match Navbar/Breadcrumbs: Identify workspace pages where Navbar is hidden
    const isWorkspace = pathname?.startsWith("/problems/") && !["/problems", "/problems/dsa"].includes(pathname || "");

    // If on a workspace page (Navbar hidden), don't add top padding.
    // If normally navigating (Navbar visible), add padding to account for fixed Navbar.
    if (isWorkspace) {
        return <>{children}</>;
    }

    return <div className="pt-16">{children}</div>;
}

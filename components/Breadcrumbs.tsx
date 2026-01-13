"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { useState, useEffect } from "react";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR/Hydration, pathname might be null.
    // We return null if we're not mounted or on the home page.
    if (!mounted || !pathname || pathname === "/" || pathname === "/signin" || pathname === "/signup") return null;

    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    return (
        <nav aria-label="Breadcrumb" className="w-full bg-white border-dashed border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <ol className="flex items-center space-x-2 text-xs text-gray-500">
                    <li>
                        <Link href="/" className="hover:text-orange-600 transition-colors flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                    </li>

                    {pathSegments.map((segment, index) => {
                        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathSegments.length - 1;
                        let title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
                        if (title === "Dsa") title = "DSA";
                        if (title === "Sql") title = "SQL";

                        return (
                            <Fragment key={path}>
                                <li>
                                    <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li>
                                    {isLast ? (
                                        <span className="font-medium text-orange-600" aria-current="page">
                                            {title}
                                        </span>
                                    ) : (
                                        <Link href={path} className="hover:text-orange-600 transition-colors">
                                            {title}
                                        </Link>
                                    )}
                                </li>
                            </Fragment>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}

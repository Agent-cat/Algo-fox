"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isWorkspace = pathname?.startsWith("/problems/") && !["/problems", "/problems/dsa"].includes(pathname || "");

    if (isWorkspace) {
        return null;
    }

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                },
            },
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-dashed border-gray-300 transition-all duration-300">
            <div className="max-w-7xl mx-auto  px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold flex items-center gap-2 group">
                    <span className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 text-sm">
                        A
                    </span>
                    <span className="tracking-tight text-gray-900">Algofox</span>
                </Link>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {!isPending && (
                        <>
                            {session ? (
                                <div className="flex items-center gap-6">
                                    <Link href="/problems" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                                        Problems
                                    </Link>
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                                            <span className="text-sm font-semibold text-gray-700">{session.user.name}</span>
                                            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                                                {session.user.image ? (
                                                    <img
                                                        src={session.user.image}
                                                        alt={session.user.name || "User"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    session.user.name?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                        </button>
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 p-1">
                                            {/* @ts-ignore */}
                                            {session.user.role === "ADMIN" && (
                                                <Link href="/admin/problems" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Admin Panel</Link>
                                            )}
                                            <Link href="/leaderboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Leaderboard</Link>
                                            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Dashboard</Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/signup" className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* MOBILE MENU HAMBURGER ICON */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-5 h-5 flex flex-col justify-center gap-1">
                        <span className={`block w-full h-0.5 bg-current transition-all origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`block w-full h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-full h-0.5 bg-current transition-all origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </div>
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl animate-fadeIn">
                    <div className="flex flex-col gap-4">
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 mb-2 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                        {session.user.image ? (
                                            <img
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            session.user.name?.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{session.user.name}</p>
                                        <p className="text-xs text-gray-500">{session.user.email}</p>
                                    </div>
                                </div>
                                <Link href="/dashboard" className="text-base font-medium text-gray-800 hover:text-orange-600">Dashboard</Link>
                                <Link href="/problems" className="text-base font-medium text-gray-800 hover:text-orange-600">Problems</Link>
                                <button onClick={handleSignOut} className="text-base font-medium text-red-600 text-left hover:text-red-700">Sign Out</button>
                            </>
                        ) : (
                            <>
                                <Link href="/signin" className="text-base font-medium text-gray-800 hover:text-black">Sign In</Link>
                                <Link href="/signup" className="text-base font-medium text-orange-600 hover:text-orange-700">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

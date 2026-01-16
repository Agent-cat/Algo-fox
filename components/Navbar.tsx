"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import UserPoints from "./UserPoints";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);



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

    // Check for active nav link
    const isActive = (path: string) => {
        if (path === "/") return pathname === path;
        return pathname?.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const base = "text-sm font-medium transition-colors";
        return isActive(path)
            ? `${base} text-orange-600 font-semibold`
            : `${base} text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white`;
    };

    // Role checks
    const userRole = (session?.user as any)?.role;
    const isAdmin = userRole === "ADMIN";
    const isInstitutionManager = userRole === "INSTITUTION_MANAGER";
    const isTeacher = userRole === "TEACHER";
    const isContestManager = userRole === "CONTEST_MANAGER";
    const canManage = isAdmin || isTeacher || isContestManager;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0a0a0a] backdrop-blur-md border-b border-dashed border-gray-300 dark:border-[#262626]">
            <div className="max-w-7xl mx-auto  px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold flex items-center gap-2 group">
                    <span className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 text-sm">
                        A
                    </span>
                    <span className="tracking-tight text-gray-900 dark:text-gray-100">Algofox</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {!isPending && (
                        <>
                            {session ? (
                                <div className="flex items-center gap-6">
                                    {/* Main Navigation Links */}
                                    <Link href="/problems" className={navLinkClass("/problems")}>
                                        Practice
                                    </Link>
                                    <Link href="/contests" className={navLinkClass("/contests")}>
                                        Contests
                                    </Link>
                                    <Link href="/leaderboard" className={navLinkClass("/leaderboard")}>
                                        Leaderboard
                                    </Link>

                                    <div className="flex items-center gap-4">
                                        {/* User Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626]"
                                            >
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{session.user.name}</span>
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
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {isDropdownOpen && (
                                                <>
                                                    {/* Backdrop */}
                                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                                    <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl shadow-lg z-50 p-1">
                                                        {/* Primary Links */}
                                                        <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                            My Dashboard
                                                        </Link>
                                                        <Link href="/dashboard/classrooms" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                        My Classrooms
                                                    </Link>
                                                    <Link href="/my-assignments" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                        My Assignments
                                                    </Link>

                                                    {/* Role-specific management links */}
                                                    {(canManage || isInstitutionManager) && (
                                                        <>
                                                            <div className="my-1 border-t border-gray-100 dark:border-[#262626]" />
                                                            <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Manage</div>
                                                        </>
                                                    )}

                                                        {isTeacher && (
                                                            <Link href="/dashboard/teacher/classrooms" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                                Teacher Dashboard
                                                            </Link>
                                                        )}

                                                        {isInstitutionManager && (
                                                            <Link href="/dashboard/institution" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                                Institution
                                                            </Link>
                                                        )}

                                                        {(isAdmin || isContestManager) && (
                                                            <Link href="/dashboard/contests" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg">
                                                                Contest Management
                                                            </Link>
                                                        )}

                                                        {isAdmin && (
                                                            <Link href="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg">
                                                                Admin Panel
                                                            </Link>
                                                        )}

                                                        {/* Bottom section */}
                                                        <div className="my-1 border-t border-gray-100 dark:border-[#262626]" />
                                                        <button
                                                            onClick={() => { setIsDropdownOpen(false); handleSignOut(); }}
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                                        >
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <ThemeToggle />
                                        <UserPoints />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <ThemeToggle />
                                    <Link href="/signin" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/signup" className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* MOBILE MENU HAMBURGER ICON */}
                <button
                    className="md:hidden p-2 text-gray-600 dark:text-gray-400"
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
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] p-6 shadow-xl animate-fadeIn">
                    <div className="flex flex-col gap-4">
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 mb-2 pb-4 border-b border-gray-100 dark:border-[#262626]">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-sm">
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
                                    <div className="flex-1">
                                        <p className="font-semibold dark:text-gray-100">{session.user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                                    </div>
                                    <UserPoints />
                                </div>

                                {/* Main Links */}
                                <Link href="/problems" className={`text-base font-medium ${isActive("/problems") ? "text-orange-600" : "text-gray-800 hover:text-orange-600"}`}>
                                    Practice
                                </Link>
                                <Link href="/contests" className={`text-base font-medium ${isActive("/contests") ? "text-orange-600" : "text-gray-800 hover:text-orange-600"}`}>
                                    Contests
                                </Link>
                                <Link href="/leaderboard" className={`text-base font-medium ${isActive("/leaderboard") ? "text-orange-600" : "text-gray-800 hover:text-orange-600"}`}>
                                    Leaderboard
                                </Link>

                                <div className="my-2 border-t border-gray-100" />

                                <Link href="/dashboard" className="text-base font-medium text-gray-800 hover:text-orange-600">
                                    My Dashboard
                                </Link>
                                <Link href="/dashboard/classrooms" className="text-base font-medium text-gray-800 hover:text-orange-600">
                                    My Classrooms
                                </Link>

                                {/* Role-specific Links */}
                                {isAdmin && (
                                    <Link href="/admin" className="text-base font-medium text-orange-600 hover:text-orange-700">
                                        Admin Panel
                                    </Link>
                                )}
                                {isInstitutionManager && (
                                    <Link href="/dashboard/institution" className="text-base font-medium text-gray-800 hover:text-orange-600">
                                        Institution
                                    </Link>
                                )}
                                {isTeacher && (
                                    <Link href="/dashboard/teacher/classrooms" className="text-base font-medium text-gray-800 hover:text-orange-600">
                                        Teacher Dashboard
                                    </Link>
                                )}
                                {(isAdmin || isContestManager) && (
                                    <Link href="/dashboard/contests" className="text-base font-medium text-gray-800 hover:text-orange-600">
                                        Contest Management
                                    </Link>
                                )}

                                <div className="my-2 border-t border-gray-100" />
                                <button onClick={handleSignOut} className="text-base font-medium text-red-600 text-left hover:text-red-700">
                                    Sign Out
                                </button>
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

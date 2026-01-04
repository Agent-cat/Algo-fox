"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Play,
  Send,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import UserPoints from "@/components/UserPoints";

interface WorkspaceHeaderProps {
  onSubmit: () => void;
  onRun: () => void;
  isSubmitting: boolean;
  isRunning: boolean;
}

export default function WorkspaceHeader({ onSubmit, onRun, isSubmitting, isRunning }: WorkspaceHeaderProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  return (
    <div className="h-16 bg-white border-b border-dashed border-gray-200 flex items-center justify-between px-4 z-10 relative">
      {/* LEFT: NAVIGATION */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group mr-4">
          <span className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-sm font-bold">
            A
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/dsa"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1"
          >
            <span className="sr-only">List</span>
            Problem List
          </Link>
          <span className="text-gray-300">|</span>
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-gray-300">|</span>
          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all disabled:opacity-50"
          onClick={onRun}
          disabled={isRunning || isSubmitting}
        >
          {isRunning ? (
            <div className="w-3 h-3 border-2 border-gray-500/30 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          {isRunning ? 'Running...' : 'Run'}
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? 'Running...' : 'Submit'}
        </button>
      </div>

      {/* RIGHT: USER / SETTINGS */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {session ? (
          <>
            <div className="flex items-center gap-4">
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                >
                  <span className="text-sm font-semibold text-gray-700 hidden md:block">
                    {session.user.name}
                  </span>
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs ring-offset-1">
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

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-1 z-50 origin-top-right"
                    >
                      {(session.user as any).role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          onClick={() => setProfileOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <UserPoints className="hidden md:flex" />
            </div>
          </>
        ) : (
          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-orange-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

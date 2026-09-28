"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#fafafa] dark:bg-[#1D1E23]">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close admin menu" : "Open admin menu"}
        className="lg:hidden fixed bottom-20 left-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg hover:scale-105 transition-transform"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "shrink-0 border-r border-gray-200 dark:border-white/10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#1D1E23]",
          // Mobile: slide-in drawer
          "fixed lg:relative z-[56] -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out",
          "w-64",
          sidebarOpen ? "!translate-x-0" : "",
        ].join(" ")}
      >
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

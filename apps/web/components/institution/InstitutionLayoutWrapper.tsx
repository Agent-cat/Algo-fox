"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import InstitutionSidebar from "./InstitutionSidebar";

export default function InstitutionLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-[#24262C] dark:to-[#24262C]">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close institution menu" : "Open institution menu"}
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
      <div className={[
        "fixed lg:relative z-[56] -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out",
        sidebarOpen ? "!translate-x-0" : "",
      ].join(" ")}>
        <InstitutionSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

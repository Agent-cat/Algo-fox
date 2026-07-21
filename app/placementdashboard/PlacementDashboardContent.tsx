"use client";

import Navbar from "@/components/Navbar";
import { useSidebar } from "@/context/SidebarContext";
import { PlacementDirectorSidebar } from "@/components/placementdashboard/PlacementDirectorSidebar";

export function PlacementDashboardContent({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    const { sidebarWidth, isDragging } = useSidebar();
    
    return (
        <div 
            className={[
                "h-screen bg-[#fafafa] dark:bg-[#1D1E23] font-sans flex flex-col overflow-hidden",
                !isDragging && "transition-[margin-left] duration-300 ease-in-out"
            ].filter(Boolean).join(" ")}
            style={{ marginLeft: sidebarWidth }}
        >
            <Navbar initialSession={session} />
            
            <main className="pt-16 flex-1 flex w-full">
                {/* Sidebar on the extreme left, sticky/fixed height */}
                <div className="hidden lg:block flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide border-r border-gray-200 dark:border-[#262626]">
                    <PlacementDirectorSidebar />
                </div>
                
                {/* Main Content Area with premium rounded styling */}
                <div className="flex-1 w-full min-w-0 h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-[#24262C] border-gray-200 dark:border-[#262626] shadow-sm p-8 lg:p-12 transition-all">
                    {children}
                </div>
            </main>
        </div>
    );
}

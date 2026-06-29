"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";

function PlacementsLayoutContent({ children }: { children: React.ReactNode }) {
    const { sidebarWidth, isDragging } = useSidebar();
    
    return (
        <div 
            className={[
                "h-screen bg-[#fafafa] dark:bg-[#1D1E23] font-sans flex flex-col overflow-hidden",
                !isDragging && "transition-[margin-left] duration-300 ease-in-out"
            ].filter(Boolean).join(" ")}
            style={{ marginLeft: sidebarWidth }}
        >
            <Navbar />
            
            <main className="pt-16 flex-1 flex w-full">
                {/* Main Content Area with premium rounded styling */}
                <div className="flex-1 w-full min-w-0 h-[calc(100vh-4rem)] overflow-y-auto bg-[#fafafa] dark:bg-[#1D1E23] p-8 lg:p-12 transition-all">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function PlacementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <Sidebar />
            <PlacementsLayoutContent>
                {children}
            </PlacementsLayoutContent>
        </SidebarProvider>
    );
}

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import { PlacementDirectorSidebar } from "@/components/placementdashboard/PlacementDirectorSidebar";
import { getSession } from "@/lib/auth-utils";

export default async function PlacementDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <SidebarProvider>
        <Sidebar initialSession={session} />
        <div className="h-screen bg-[#fafafa] dark:bg-[#1D1E23] font-sans flex flex-col overflow-hidden" style={{ marginLeft: 56 }}>
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
        </SidebarProvider>
    );
}

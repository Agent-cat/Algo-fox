import Navbar from "@/components/Navbar";
import { PlacementsSidebar } from "@/components/placements/PlacementsSidebar";

export default function PlacementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen bg-[#fafafa] dark:bg-[#1D1E23] font-sans flex flex-col overflow-hidden">
            <Navbar />
            
            <main className="pt-16 flex-1 flex w-full">
                {/* Sidebar on the extreme left, sticky/fixed height */}
                <div className="hidden lg:block flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide border-r border-gray-200 dark:border-[#262626]">
                    <PlacementsSidebar />
                </div>
                
                {/* Main Content Area with premium rounded styling */}
                <div className="flex-1 w-full min-w-0 h-[calc(100vh-4rem)] overflow-y-auto bg-white dark:bg-[#24262C] lg:rounded-tl-[2rem] lg:border-t lg:border-l border-gray-200 dark:border-[#262626] shadow-sm p-8 lg:p-12 transition-all">
                    {children}
                </div>
            </main>
        </div>
    );
}

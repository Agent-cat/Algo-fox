import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { PlacementDashboardContent } from "./PlacementDashboardContent";

export default async function PlacementDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
        redirect("/dashboard");
    }

    return (
        <SidebarProvider>
            <Sidebar initialSession={session} />
            <PlacementDashboardContent session={session}>
                {children}
            </PlacementDashboardContent>
        </SidebarProvider>
    );
}

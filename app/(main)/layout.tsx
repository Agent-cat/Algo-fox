import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContentWrapper from "@/components/shared/MainContentWrapper";
import { SidebarProvider } from "@/context/SidebarContext";
import { getSession } from "@/lib/auth-utils";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  return (
    <SidebarProvider>
      {/* Left sidebar */}
      <Suspense fallback={null}>
        <Sidebar initialSession={session} />
      </Suspense>

      {/* Top navbar — starts after sidebar */}
      <Suspense fallback={null}>
        <Navbar initialSession={session} />
      </Suspense>

      {/* Main content — offset by sidebar + navbar */}
      <MainContentWrapper>{children}</MainContentWrapper>
    </SidebarProvider>
  );
}

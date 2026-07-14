import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContentWrapper from "@/components/shared/MainContentWrapper";
import { SidebarProvider } from "@/context/SidebarContext";
import { getSession } from "@/lib/auth-utils";

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <Sidebar initialSession={session} />
      </Suspense>
      <Suspense fallback={null}>
        <Navbar initialSession={session} />
      </Suspense>
      <MainContentWrapper initialSession={session}>{children}</MainContentWrapper>
    </SidebarProvider>
  );
}

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContentWrapper from "@/components/shared/MainContentWrapper";
import { SidebarProvider } from "@/context/SidebarContext";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <MainContentWrapper>{children}</MainContentWrapper>
    </SidebarProvider>
  );
}

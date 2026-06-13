import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import MainContentWrapper from "@/components/shared/MainContentWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <MainContentWrapper>
        {children}
      </MainContentWrapper>
    </>
  );
}

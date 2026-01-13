
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutSpacer from "@/components/LayoutSpacer";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
        <LayoutSpacer>
          <Breadcrumbs />
        </LayoutSpacer>
      </Suspense>
      {children}
    </>
  );
}

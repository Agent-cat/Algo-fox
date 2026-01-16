import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
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
        <div className="pt-16">
          <Breadcrumbs />
        </div>
      </Suspense>
      {children}
    </>
  );
}

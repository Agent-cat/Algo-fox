import Navbar from "@/components/Navbar";
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
      </Suspense>
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}

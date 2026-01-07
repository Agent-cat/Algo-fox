import AdminSidebar from "@/components/admin/AdminSidebar";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <Suspense fallback={<div className="w-72 h-screen bg-white" />}>
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}



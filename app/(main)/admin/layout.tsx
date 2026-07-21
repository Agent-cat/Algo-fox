import AdminSidebar from "@/components/admin/AdminSidebar";
import { Suspense } from "react";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#fafafa] dark:bg-[#1D1E23]">
      <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-white/10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
        <Suspense fallback={<div className="w-full h-full" />}>
          <AdminSidebar />
        </Suspense>
      </aside>
      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  );
}

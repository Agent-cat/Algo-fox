import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
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

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

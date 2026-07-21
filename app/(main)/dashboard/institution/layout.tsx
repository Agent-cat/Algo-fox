import InstitutionSidebar from "@/components/institution/InstitutionSidebar";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const role = session?.user?.role;

  if (!session || !role || (role !== "ADMIN" && role !== "INSTITUTION_MANAGER")) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 dark:from-[#24262C] dark:to-[#24262C]">
        <InstitutionSidebar />
        <main className="flex-1 ml-64 p-8 transition-all duration-300">
          {children}
        </main>
    </div>
  );
}

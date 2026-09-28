import InstitutionLayoutWrapper from "@/components/institution/InstitutionLayoutWrapper";
import { getSession } from "@algofox/auth";
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

  return <InstitutionLayoutWrapper>{children}</InstitutionLayoutWrapper>;
}

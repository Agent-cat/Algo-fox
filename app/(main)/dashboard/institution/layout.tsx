import InstitutionSidebar from "@/components/institution/InstitutionSidebar";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
        <InstitutionSidebar />
        <main className="flex-1 ml-72 transition-all duration-300">
          {children}
        </main>
    </div>
  );
}

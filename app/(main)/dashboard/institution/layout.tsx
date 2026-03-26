import InstitutionSidebar from "@/components/institution/InstitutionSidebar";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-[#0a0a0a] dark:to-[#141414]">
        <InstitutionSidebar />
        <main className="flex-1 ml-64 p-8 transition-all duration-300">
          {children}
        </main>
    </div>
  );
}

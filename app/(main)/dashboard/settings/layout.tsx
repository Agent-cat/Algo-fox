import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
            {/* Added a container wrapper to center and constrain width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                     <aside className="lg:w-64 flex-shrink-0">
                        <SettingsSidebar />
                     </aside>
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

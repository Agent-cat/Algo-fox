import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { UserService } from "@/core/services/user.service";
import { getCurrentUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authUser = await getCurrentUser();
    
    if (!authUser) {
        redirect("/auth/signin");
    }

    const user = await UserService.getUserSettings(authUser.id);

    if (!user) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#1D1E23]">
            <div className="w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row flex-1">
                     <aside className="lg:w-72 shrink-0 lg:pr-8 pb-8 lg:pb-0 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                        <SettingsSidebar user={user} />
                     </aside>
                    <div className="flex-1 min-w-0 max-w-7xl tracking-wide lg:pl-8 lg:border-l-2 lg:border-dotted lg:border-gray-300 dark:lg:border-[#333] pt-8 lg:pt-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserService } from "@/core/services/user.service";
import { StudentProfileSidebar } from "@/components/placementdashboard/StudentProfileSidebar";

import { BasicInfoSettings } from "@/components/settings/BasicInfoSettings";
import { EducationSettingsClient } from "@/components/settings/EducationSettingsClient";
import { PlatformSettings } from "@/components/settings/PlatformSettings";
import { ExperienceSettingsClient } from "@/components/settings/ExperienceSettingsClient";
import { SkillsSettingsClient } from "@/components/settings/SkillsSettingsClient";
import { ProjectsSettingsClient } from "@/components/settings/ProjectsSettingsClient";
import { AwardsSettingsClient } from "@/components/settings/AwardsSettingsClient";
import { CertificatesSettingsClient } from "@/components/settings/CertificatesSettingsClient";
import { PatentsSettingsClient } from "@/components/settings/PatentsSettingsClient";
import { PublicationsSettingsClient } from "@/components/settings/PublicationsSettingsClient";
import { ResumeSettingsClient } from "@/components/settings/ResumeSettingsClient";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ tab?: string }>;

export default async function PlacementStudentProfilePage({
    params,
    searchParams
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
        redirect("/dashboard");
    }

    const { id } = await params;
    const { tab } = await searchParams;

    const user = await UserService.getUserSettings(id);
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#1D1E23]">
                <div className="text-center p-8 bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm max-w-md w-full">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Student Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        The requested student record could not be found or has been deleted.
                    </p>
                    <a
                        href="/placementdashboard/students"
                        className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors text-sm"
                    >
                        Back to Students List
                    </a>
                </div>
            </div>
        );
    }

    const activeTab = tab || "basic-info";

    const renderTabContent = () => {
        switch (activeTab) {
            case "basic-info":
                return <BasicInfoSettings user={user} readonly={true} />;
            case "education":
                return <EducationSettingsClient user={user} readonly={true} />;
            case "platform":
                return <PlatformSettings user={user} readonly={true} />;
            case "experience":
                return <ExperienceSettingsClient user={user} readonly={true} />;
            case "skills":
                return <SkillsSettingsClient user={user} readonly={true} />;
            case "projects":
                return <ProjectsSettingsClient user={user} readonly={true} />;
            case "awards":
                return <AwardsSettingsClient user={user} readonly={true} />;
            case "certificates":
                return <CertificatesSettingsClient user={user} readonly={true} />;
            case "patents":
                return <PatentsSettingsClient user={user} readonly={true} />;
            case "publications":
                return <PublicationsSettingsClient user={user} readonly={true} />;
            case "resume":
                return <ResumeSettingsClient user={user} readonly={true} />;
            default:
                return <BasicInfoSettings user={user} readonly={true} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#1D1E23]">
            <div className="w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row flex-1">
                     <aside className="lg:w-72 shrink-0 lg:pr-8 pb-8 lg:pb-0 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                        <StudentProfileSidebar user={user} activeTab={activeTab} />
                     </aside>
                    <div className="flex-1 min-w-0 max-w-7xl tracking-wide lg:pl-8 lg:border-l-2 lg:border-dotted lg:border-gray-300 dark:lg:border-[#333] pt-8 lg:pt-0">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

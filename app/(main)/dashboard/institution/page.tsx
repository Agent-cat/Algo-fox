import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getInstitutionStatsAction, getInstitutionStaff } from "@/actions/institution/staff";
import { InstitutionDashboardContent } from "./InstitutionDashboardContent";
import { Loader2, Building2 } from "lucide-react";

export const metadata = {
    title: "Institution Dashboard | AlgoFox",
};

async function DashboardData() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const currentUser = session.user as any;

    if (!["INSTITUTION_MANAGER", "ADMIN"].includes(currentUser.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 text-center px-6 bg-white dark:bg-[#0a0a0a]">
                Unauthorized. Only Institution Managers or Admins can access this page.
            </div>
        );
    }

    const institutionId = currentUser.institutionId;

    if (!institutionId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-4 bg-white dark:bg-[#0a0a0a]">
                <Building2 className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                <div className="text-center md:max-w-md px-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Institution Assigned</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Your account is not associated with any institution. Please contact an administrator to be assigned to your organization.
                    </p>
                </div>
            </div>
        );
    }

    // Parallel data fetching for better performance
    const [statsRes, staffRes] = await Promise.all([
        getInstitutionStatsAction(institutionId),
        getInstitutionStaff(institutionId)
    ]);

    const stats = statsRes.success && statsRes.stats ? statsRes.stats : null;
    const staff = staffRes.success && staffRes.staff ? staffRes.staff : [];

    return (
        <InstitutionDashboardContent
            initialStats={stats}
            initialStaff={staff}
            institutionId={institutionId}
            institutionName={currentUser.institution?.name || null}
        />
    );
}

export default function InstitutionDashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 pb-12 px-6 bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <DashboardData />
        </Suspense>
    );
}

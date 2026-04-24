import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Loader2 } from "lucide-react";
import { auth } from "@/lib/auth";
import {
    getStudentsOverview,
    getStudentInsights,
    getInstitutionFilters,
} from "@/actions/institution/analytics";
import { StudentsOverview } from "@/components/institution/analytics/StudentsOverview";
import { StudentInsightsDashboard } from "@/components/institution/analytics/StudentInsightsDashboard";

export const metadata = {
    title: "Student Analytics — Institution",
};

interface PageProps {
    searchParams: Promise<{ student?: string }>;
}

async function AnalyticsContent({ searchParams }: PageProps) {
    const params = await searchParams;
    const studentId = params.student;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) redirect("/signin");

    const currentUser = session.user as any;
    if (!["INSTITUTION_MANAGER", "ADMIN"].includes(currentUser.role)) {
        return (
            <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                Unauthorized. Only Institution Managers or Admins can access this page.
            </div>
        );
    }

    const institutionId = currentUser.institutionId as string | undefined;
    if (!institutionId) {
        return (
            <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                No institution assigned. Contact an administrator.
            </div>
        );
    }

    // Detail view
    if (studentId) {
        const result = await getStudentInsights(studentId, institutionId);
        if (!result.success) {
            return (
                <div className="text-center py-24 text-gray-500 dark:text-gray-400">
                    {result.error || "Student not found."}
                </div>
            );
        }
        return <StudentInsightsDashboard student={result.student} />;
    }

    // List view
    const [studentsResult, filtersResult] = await Promise.all([
        getStudentsOverview(institutionId),
        getInstitutionFilters(institutionId),
    ]);

    const students =
        studentsResult.success && studentsResult.students ? studentsResult.students : [];
    const branches =
        filtersResult.success && filtersResult.branches ? filtersResult.branches : [];
    const years =
        filtersResult.success && filtersResult.years ? filtersResult.years : [];

    return (
        <StudentsOverview
            initialStudents={students}
            branches={branches}
            years={years}
        />
    );
}

export default function AnalyticsPage({ searchParams }: PageProps) {
    return (
        <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                }
            >
                <AnalyticsContent searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

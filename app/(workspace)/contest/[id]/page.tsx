import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getContestDetail } from "@/actions/contest";
import ContestDetails from "@/components/contest/ContestDetails";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";
import { Suspense } from "react";


interface PageProps {
    params: Promise<{ id: string }>;
}

async function ContestDetailContent({ params }: { params: Promise<{ id: string }> }) {
    "use cache: private";

    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const userRole = (session.user as any).role;
    const allowedRoles = ["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"];
    const isAdminOrInstructor = allowedRoles.includes(userRole);
    const backLink = isAdminOrInstructor ? "/dashboard/contests" : "/contests";

    const res = await getContestDetail(id);

    if (!res.success) {
        if (res.error === "Contest not found") {
            notFound();
        }
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Access Denied</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{res.error}</p>
                <Link href={backLink} className="text-orange-600 font-bold hover:underline">
                    Back to Contests
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen">
            {/* Breadcrumbs */}
            <div className="mb-8">
                <BackButton className="text-gray-500 dark:text-gray-400 hover:text-orange-600 font-bold">
                    {isAdminOrInstructor ? "All Arenas" : "Back to Contests"}
                </BackButton>
            </div>

            <ContestDetails
                contest={res.contest}
                user={session.user}
            />
        </div>
    );
}

export default function ContestDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading contest details...</p>
            </div>
        }>
            <ContestDetailContent params={params} />
        </Suspense>
    );
}


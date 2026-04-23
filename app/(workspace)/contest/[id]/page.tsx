import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getContestDetail } from "@/actions/contest";
import ContestDetails from "@/components/contest/ContestDetails";
import SubscriptionOverlay from "@/components/subscription/SubscriptionOverlay";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { Suspense } from "react";
import { cacheLife } from "next/cache";


interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const res = await getContestDetail(id);

    if (!res.success || !res.contest) {
        return {
            title: "Contest Not Found",
        };
    }

    return {
        title: res.contest.title,
        description: res.contest.description || `Join ${res.contest.title} on Algo-fox and solve exciting problems.`,
        openGraph: {
            title: res.contest.title,
            description: res.contest.description || `Join ${res.contest.title} on Algo-fox and solve exciting problems.`,
            type: "article",
        },
    };
}

async function ContestDetailContent({ params }: { params: Promise<{ id: string }> }) {
    "use cache: private";
    cacheLife("minutes");

    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const userRole = (session.user as any).role;

    if (userRole === "USER") {
        return (
            <div className="pt-20">
                <SubscriptionOverlay
                    title="Enter Contest"
                    description="Join the competition and solve problems."
                />
            </div>
        );
    }

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
            {/* Back Button */}
            <div className="mb-8">
                <BackButton>
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
            <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin mb-4" />
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading contest details...</p>
            </div>
        }>
            <ContestDetailContent params={params} />
        </Suspense>
    );
}


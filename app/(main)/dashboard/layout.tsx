import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthCheck({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/signin");
    }

    if (!session.user.onboardingCompleted) {
        redirect("/onboarding");
    }

    return <>{children}</>;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        }>
            <AuthCheck>{children}</AuthCheck>
        </Suspense>
    );
}


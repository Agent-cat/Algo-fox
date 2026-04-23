import { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";
import SubscriptionOverlay from "@/components/subscription/SubscriptionOverlay";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Leaderboard",
    description: "See the top performers on Algo-fox. Check your rank and see how you compare with others in the community.",
};

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user && (session.user as any).role === "USER") {
        return (
            <div className="pt-20">
                <SubscriptionOverlay
                    title="Unlock Leaderboard"
                    description="See the rankings of top performers."
                />
            </div>
        );
    }

    return <LeaderboardClient />;
}

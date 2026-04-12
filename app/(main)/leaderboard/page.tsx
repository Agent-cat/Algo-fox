import { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
    title: "Leaderboard",
    description: "See the top performers on Algo-fox. Check your rank and see how you compare with others in the community.",
};

export default function Page() {
    return <LeaderboardClient />;
}

import { Metadata } from "next";
import SubscriptionClient from "./_components/SubscriptionClient";

export const metadata: Metadata = {
  title: "Subscription | Algo-fox Premium",
  description: "Unlock premium features, contests, and courses with Algo-fox subscription.",
};

export default function SubscriptionPage() {
  return <SubscriptionClient />;
}

import { Metadata } from "next";
import { getTopicSheets } from "@/actions/topic.action";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { TopicsPageClient } from "@/components/topics/TopicsPageClient";

export const metadata: Metadata = {
    title: "Topic Sheets",
    description: "Browse all topic sheets and track your progress.",
};

export default async function TopicsPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/signin");
    }

    const topicSheetsRes = await getTopicSheets();
    const categories = topicSheetsRes?.categories || [];

    return <TopicsPageClient categories={categories} />;
}

import { getProblems } from "@/actions/problems";
import SqlProblemsClient from "./_components/SqlProblemsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SQL Problems | Algofox",
    description: "Practice SQL problems and improve your database query skills.",
};

export default async function SqlProblemsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const difficulty = (params?.difficulty as any) || undefined;

    // tags
    let tags: string[] = [];
    if (typeof params?.tags === 'string') {
        tags = [params.tags];
    } else if (Array.isArray(params?.tags)) {
        tags = params.tags;
    }

    // FETCHING PRACTICE MODE, PAGE 1 FOR SQL DOMAIN
    const { problems, totalPages } = await getProblems(page, 10, "PRACTICE", "SQL", difficulty, tags);

    return (
        <SqlProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}


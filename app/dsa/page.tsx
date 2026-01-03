import { getProblems } from "@/actions/problems";
import DsaProblemsClient from "./_components/DsaProblemsClient";

export const metadata = {
    title: "DSA Problems | Algofox",
    description: "Practice Data Structures and Algorithms problems and improve your skills.",
};

export default async function DsaProblemsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const difficulty = (params?.difficulty as any) || undefined;

    // tags can be string or string[]
    let tags: string[] = [];
    if (typeof params?.tags === 'string') {
        tags = [params.tags];
    } else if (Array.isArray(params?.tags)) {
        tags = params.tags;
    }

    // FETCHING PRACTICE MODE, PAGE 1 FOR DSA DOMAIN
    const { problems, totalPages } = await getProblems(page, 10, "PRACTICE", "DSA", difficulty, tags);

    return (
        <DsaProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}

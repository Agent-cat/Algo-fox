import { getProblems } from "@/actions/problems";
import SqlProblemsClient from "./_components/SqlProblemsClient";

export const metadata = {
    title: "SQL Problems | Algofox",
    description: "Practice SQL problems and improve your database query skills.",
};

export default async function SqlProblemsPage() {
    // FETCHING PRACTICE MODE, PAGE 1 FOR SQL DOMAIN
    const { problems, totalPages } = await getProblems(1, 10, "PRACTICE", "SQL");

    return (
        <SqlProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}


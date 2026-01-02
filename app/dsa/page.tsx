import { getProblems } from "@/actions/problems";
import DsaProblemsClient from "./_components/DsaProblemsClient";

export const metadata = {
    title: "DSA Problems | Algofox",
    description: "Practice Data Structures and Algorithms problems and improve your skills.",
};

export default async function DsaProblemsPage() {
    // FETCHING PRACTICE MODE, PAGE 1 FOR DSA DOMAIN
    const { problems, totalPages } = await getProblems(1, 10, "PRACTICE", "DSA");

    return (
        <DsaProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}

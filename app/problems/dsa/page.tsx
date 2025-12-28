import { getProblems } from "@/actions/problems";
import ProblemsList from "../_components/ProblemsList";
import DsaProblemsClient from "./_components/DsaProblemsClient";

export const metadata = {
    title: "DSA Problems | Algofox",
    description: "Practice Data Structures and Algorithms problems and improve your skills.",
};

export default async function DsaProblemsPage() {
    // Initial fetch for Practice mode, page 1
    const { problems, totalPages } = await getProblems(1, 10, "PRACTICE");

    return (
        <DsaProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}

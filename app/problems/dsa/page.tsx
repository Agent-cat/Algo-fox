import { getProblems } from "@/actions/problems";
import ProblemsList from "../_components/ProblemsList";

export const metadata = {
    title: "DSA Problems | Algofox",
    description: "Practice Data Structures and Algorithms problems and improve your skills.",
};

export default async function DsaProblemsPage() {
    // Initial fetch, page 1
    const { problems, totalPages } = await getProblems(1, 10);

    return (
        <div className="min-h-screen bg-white">
            <ProblemsList
                initialProblems={problems}
                initialTotalPages={totalPages}
            />
        </div>
    );
}

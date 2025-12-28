import PracticeClient from "./PracticeClient";
import { Problem } from "@prisma/client";

type ProblemWithStats = Problem & { acceptance: number; isSolved?: boolean };

interface PracticeListProps {
    initialProblems: ProblemWithStats[];
    initialTotalPages: number;
}

/**
 * Wrapper component for Practice mode
 * Receives initial data from parent server component
 */
export default function PracticeList({ initialProblems, initialTotalPages }: PracticeListProps) {
    return (
        <PracticeClient
            initialProblems={initialProblems}
            initialTotalPages={initialTotalPages}
            type="PRACTICE"
        />
    );
}

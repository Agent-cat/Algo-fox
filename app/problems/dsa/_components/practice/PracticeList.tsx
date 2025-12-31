import PracticeClient from "./PracticeClient";
import { Problem, Difficulty, ProblemType } from "@prisma/client";

type ProblemWithStats = {
    id: string;
    title: string;
    slug: string;
    difficulty: Difficulty;
    type: ProblemType;
    acceptance: number;
    solved?: number | null;
    isSolved?: boolean;
    score: number;
    createdAt: Date;
    _count: { submissions: number };
};

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
            searchTerm=""
        />
    );
}

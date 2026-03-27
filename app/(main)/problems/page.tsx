import { getUserAllocatedCourses } from "@/actions/courseAllocation.action";
import { ProblemDomain } from "@prisma/client";
import ProblemsList from "./_components/ProblemsList";

export default async function ProblemsSelectionPage() {
  const result = await getUserAllocatedCourses();
  const allocatedDomains = (result.success ? result.domains : []) as ProblemDomain[];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl mb-4">
            Practice Problems
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Select a category to start practicing and improving your coding skills.
          </p>
        </div>

        <ProblemsList allocatedDomains={allocatedDomains} />
      </div>
    </div>
  );
}

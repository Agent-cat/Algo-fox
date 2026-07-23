import { prisma } from "../lib/prisma";

async function main() {
  const id = "cmkmkmcm9000bzhcdujcsnpmo";
  const problem = await prisma.problem.findUnique({
    where: { id },
    include: {
      categoryProblems: true,
      tags: true,
      topicTags: true,
    }
  });
  console.log("PROBLEM DATA:", JSON.stringify(problem, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

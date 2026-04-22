import { prisma } from "../lib/prisma";

async function main() {
  const problems = await prisma.problem.findMany({
    where: { hidden: false },
    take: 10,
    select: { id: true, title: true, domain: true }
  });
   console.log(JSON.stringify(problems, null, 2));
}

main();

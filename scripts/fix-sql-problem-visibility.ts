import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixSqlProblemVisibility() {
  console.log("Checking and fixing SQL problem visibility...\n");

  // Find all SQL PRACTICE problems that are hidden
  const hiddenProblems = await prisma.problem.findMany({
    where: {
      domain: "SQL",
      type: "PRACTICE",
      hidden: true
    }
  });

  if (hiddenProblems.length > 0) {
    console.log(`Found ${hiddenProblems.length} hidden SQL PRACTICE problem(s). Making them visible...\n`);
    
    for (const problem of hiddenProblems) {
      await prisma.problem.update({
        where: { id: problem.id },
        data: { hidden: false }
      });
      console.log(`✓ Made "${problem.title}" visible`);
    }
    
    console.log(`\n✅ Fixed ${hiddenProblems.length} problem(s). They should now appear on /sql`);
  } else {
    console.log("✅ All SQL PRACTICE problems are already visible.");
  }

  // Show all SQL problems
  const allProblems = await prisma.problem.findMany({
    where: { domain: "SQL" },
    select: {
      id: true,
      title: true,
      slug: true,
      hidden: true,
      type: true,
      domain: true
    }
  });

  console.log(`\nAll SQL problems (${allProblems.length}):`);
  allProblems.forEach((p, i) => {
    const status = p.hidden ? "🔒 HIDDEN" : "✅ VISIBLE";
    console.log(`${i + 1}. ${p.title} (${p.slug}) - ${status} - ${p.type}`);
  });

  await prisma.$disconnect();
}

fixSqlProblemVisibility().catch(console.error);


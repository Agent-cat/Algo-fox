import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkSqlProblems() {
  console.log("Checking SQL problems...\n");

  const problems = await prisma.problem.findMany({
    where: {
      domain: "SQL"
    },
    select: {
      id: true,
      title: true,
      slug: true,
      hidden: true,
      type: true,
      domain: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  console.log(`Found ${problems.length} SQL problems:\n`);
  
  problems.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title}`);
    console.log(`   Slug: ${p.slug}`);
    console.log(`   Hidden: ${p.hidden}`);
    console.log(`   Type: ${p.type}`);
    console.log(`   Domain: ${p.domain}`);
    console.log(`   Created: ${p.createdAt}`);
    console.log("");
  });

  const hiddenProblems = problems.filter(p => p.hidden);
  const practiceProblems = problems.filter(p => p.type === "PRACTICE" && !p.hidden);

  console.log(`\nSummary:`);
  console.log(`- Total SQL problems: ${problems.length}`);
  console.log(`- Hidden: ${hiddenProblems.length}`);
  console.log(`- Visible PRACTICE: ${practiceProblems.length}`);

  if (hiddenProblems.length > 0) {
    console.log(`\n⚠️  Found ${hiddenProblems.length} hidden SQL problem(s). These won't show on /sql`);
    console.log(`   To make them visible, update hidden=false in the database or use the admin panel.`);
  }

  await prisma.$disconnect();
}

checkSqlProblems().catch(console.error);


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tables = [
    'user',
    'problem',
    'tag',
    'bookmarkList',
    'bookmark',
    'problemTestCase',
    'problemFunctionTemplate',
    'language',
    'userProblemSolved',
    'submission',
    'testCase',
    'category',
    'categoryProblem',
    'institution',
    'classroom',
    'contest',
    'contestProblem',
    'contestSection',
    'contestSectionProblem',
    'contestParticipation',
  ];

  console.log('--- Table Row Counts ---');
  for (const table of tables) {
    try {
      // @ts-ignore
      const count = await prisma[table].count();
      console.log(`${table}: ${count}`);
    } catch (e: any) {
      console.log(`${table}: Error counting (${e.message})`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

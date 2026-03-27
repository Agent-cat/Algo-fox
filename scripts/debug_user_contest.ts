
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'arshavardhan1621@gmail.com';
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true }
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  console.log(`User ID: ${user.id} (${user.name})`);

  const solvedSubmissions = await prisma.submission.findMany({
    where: {
      userId: user.id,
      status: 'ACCEPTED',
      mode: 'SUBMIT',
      contestId: { not: null }
    },
    select: {
      problemId: true,
      contestId: true,
      problem: {
        select: {
          title: true,
          score: true
        }
      },
      contest: {
        select: {
          title: true
        }
      }
    }
  });

  // Unique by problemId and contestId
  const uniqueSolved = Array.from(new Map(solvedSubmissions.map(s => [`${s.problemId}-${s.contestId}`, s])).values());

  console.log('--- Solved Contest Problems ---');
  console.log(JSON.stringify(uniqueSolved, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

import { prisma } from "./lib/prisma";

async function checkStreak() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      currentStreak: true,
      lastStreakDate: true,
      dailyStreaks: {
        orderBy: { date: 'desc' },
        take: 5
      }
    }
  });

  console.log("Users and streaks:");
  users.forEach(u => {
    console.log(`- ${u.email}: Streak ${u.currentStreak}, Last Date ${u.lastStreakDate}`);
    u.dailyStreaks.forEach(ds => {
      console.log(`  - DailyStreak Record: ${ds.date.toISOString()}`);
    });
  });
}

checkStreak()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

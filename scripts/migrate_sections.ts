import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
     console.log("Starting Section architecture data migration...");

    // 1. Fetch all existing contests that don't have sections
    const contests = await prisma.contest.findMany({
        where: { sections: { none: {} } },
        include: { problems: true } // The deprecated relation
    });

     console.log(`Found ${contests.length} legacy contests to migrate.`);

    for (const contest of contests) {
         console.log(`Migrating Contest: ${contest.title} (${contest.id})`);

        // Use transaction to ensure consistency
        await prisma.$transaction(async (tx) => {
            // Create a default "Main Section"
            const section = await tx.contestSection.create({
                data: {
                    contestId: contest.id,
                    title: "Main Section",
                    description: "Default section from migration",
                    order: 1
                }
            });

            // Map old ContestProblem items into ContestSectionProblem
            if (contest.problems.length > 0) {
                await tx.contestSectionProblem.createMany({
                    data: contest.problems.map((p) => ({
                        sectionId: section.id,
                        problemId: p.problemId,
                        order: p.order
                    }))
                });
            }

            // Migrate participation
            const participations = await tx.contestParticipation.findMany({
                where: { contestId: contest.id }
            });

            if (participations.length > 0) {
                // Bulk create unlocked sections for legacy parallel progress
                await tx.contestParticipationSection.createMany({
                    data: participations.map(p => ({
                        participationId: p.id,
                        sectionId: section.id,
                        isUnlocked: true,
                        startedAt: p.sessionStartedAt || p.startedAt || p.createdAt || new Date()
                    }))
                });

                // Update participations to calculate missing timestamps
                for (const p of participations) {
                    const started = p.sessionStartedAt || p.startedAt || p.createdAt || new Date();
                    let effectiveEnd: Date | null = null;
                    if (contest.durationMinutes) {
                        const calculatedEnd = new Date(started.getTime() + contest.durationMinutes * 60 * 1000);
                        // Cap at contest.endTime if it exists
                        if (contest.endTime) {
                            effectiveEnd = calculatedEnd.getTime() < contest.endTime.getTime() ? calculatedEnd : contest.endTime;
                        } else {
                            effectiveEnd = calculatedEnd;
                        }
                    } else {
                        effectiveEnd = contest.endTime;
                    }

                    await tx.contestParticipation.update({
                        where: { id: p.id },
                        data: {
                            startedAt: started,
                            effectiveEndTime: effectiveEnd,
                            currentSectionId: section.id
                        }
                    });
                }
            }
        });
         console.log(`✅ Completed: ${contest.title}`);
    }

     console.log("Migration finished safely! You can now use the new architecture.");
}

main()
    .catch((e) => {
         console.error("Migration failed:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

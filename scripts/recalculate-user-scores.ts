import { prisma } from "../lib/prisma";
import { getPointsForDifficulty } from "../lib/points";

async function recalculateAllUserScores() {
    console.log("Starting score recalculation...");

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    for (const user of users) {
        // Get all unique problems the user has solved (ACCEPTED SUBMIT mode only)
        const solvedSubmissions = await prisma.submission.findMany({
            where: {
                userId: user.id,
                status: "ACCEPTED",
                mode: "SUBMIT"
            },
            select: {
                problemId: true,
                problem: {
                    select: {
                        difficulty: true
                    }
                }
            },
            distinct: ["problemId"]
        });

        // Calculate total score based on difficulty
        let totalScore = 0;
        for (const submission of solvedSubmissions) {
            const points = getPointsForDifficulty(submission.problem.difficulty);
            totalScore += points;
        }

        // Update user's totalScore
        await prisma.user.update({
            where: { id: user.id },
            data: {
                totalScore,
                problemsSolved: solvedSubmissions.length
            }
        });

        console.log(`Updated ${user.name} (${user.email}): ${totalScore} points from ${solvedSubmissions.length} problems`);
    }

    console.log("Score recalculation complete!");
}

recalculateAllUserScores()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

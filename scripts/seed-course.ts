import { prisma } from "../lib/prisma";

async function main() {
    const course = await prisma.course.upsert({
        where: { slug: "dsa-fundamentals" },
        update: {},
        create: {
            title: "DSA Fundamentals",
            slug: "dsa-fundamentals",
            description: "Master the core concepts of Data Structures and Algorithms with this structured path. From Arrays to Linked Lists and beyond.",
            difficulty: "EASY",
            tags: ["DSA", "Beginner", "Placement"],
            duration: "15 hours",
            isPublished: true,
            modules: {
                create: [
                    {
                        name: "Arrays & Strings",
                        slug: "arrays-and-strings",
                        domain: "DSA",
                        order: 1,
                        categoryProblems: {
                            create: [
                                {
                                    problemId: "cmkmgfl9v0001k9a12fq1sg3b", // Max value in array
                                    order: 1
                                }
                            ]
                        }
                    },
                    {
                        name: "Linked Lists",
                        slug: "linked-lists-module",
                        domain: "DSA",
                        order: 2,
                        categoryProblems: {
                            create: [
                                {
                                    problemId: "cmkiheuv9000mz63xc3ceiop3", // Traverse linked list
                                    order: 1
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });

     console.log("Course seeded:", course.title);
}

main();

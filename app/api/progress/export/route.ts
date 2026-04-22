import { NextRequest, NextResponse, connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
    await connection();
    const headersList = await headers();
    try {
        const session = await auth.api.getSession({
            headers: headersList
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const role = (session.user as any).role;
        if (!["TEACHER", "INSTITUTION_MANAGER"].includes(role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const url = new URL(req.url);
        const classroomIdsParam = url.searchParams.get("classroomIds");
        const mode = url.searchParams.get("mode") || "all";
        const categoryId = url.searchParams.get("categoryId");
        const format = url.searchParams.get("format") || "csv";
        const difficulty = url.searchParams.get("difficulty") || "ALL";
        const domain = (url.searchParams.get("domain") as any) || "DSA";

        if (!classroomIdsParam) {
            return NextResponse.json({ error: "classrooms are required" }, { status: 400 });
        }

        const classroomIds = classroomIdsParam.split(",");

        // Fetch classrooms and students
        const classrooms = await prisma.classroom.findMany({
            where: { id: { in: classroomIds } },
            include: {
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        submissions: {
                            where: { status: "ACCEPTED", mode: "SUBMIT" },
                            select: { problemId: true }
                        }
                    }
                }
            }
        });

        const studentsMap = new Map();
        for (const classroom of classrooms) {
            for (const student of classroom.students) {
                if (!studentsMap.has(student.id)) {
                    studentsMap.set(student.id, {
                        ...student,
                        classroomNames: [classroom.name],
                        solvedProblemIds: new Set(student.submissions.map(s => s.problemId))
                    });
                } else {
                    studentsMap.get(student.id).classroomNames.push(classroom.name);
                }
            }
        }
        const uniqueStudents = Array.from(studentsMap.values());

        // Fetch ALL categories for hierarchy awareness
        const allCategories = await prisma.category.findMany({
            where: { domain: domain },
            orderBy: { order: "asc" },
            include: {
                categoryProblems: {
                    include: {
                        problem: {
                            select: { id: true, title: true, difficulty: true }
                        }
                    },
                    orderBy: { order: "asc" }
                }
            }
        });

        // Recursively get problems from a category and its descendants
        const getProblemsRecursive = (catId: string, visited = new Set()): any[] => {
            if (visited.has(catId)) return [];
            visited.add(catId);

            const cat = allCategories.find(c => c.id === catId);
            if (!cat) return [];

            let problems = cat.categoryProblems.map(cp => cp.problem);
            if (difficulty !== "ALL") {
                problems = problems.filter(p => p.difficulty === difficulty);
            }

            const subCats = allCategories.filter(c => c.parentId === catId);
            for (const sub of subCats) {
                problems = [...problems, ...getProblemsRecursive(sub.id, visited)];
            }
            return problems;
        };

        if (mode === "category" && categoryId) {
            /**
             * CATEGORY-WISE DOWNLOAD: Problem-wise data columns
             */
            const cat = allCategories.find(c => c.id === categoryId);
            if (!cat) return NextResponse.json({ error: "Category not found" }, { status: 404 });

            const categoryProblems = getProblemsRecursive(cat.id);
            // Deduplicate problems while preserving order if possible
            const seenProblemIds = new Set();
            const uniqueProblems: any[] = [];
            categoryProblems.forEach(p => {
                if (!seenProblemIds.has(p.id)) {
                    seenProblemIds.add(p.id);
                    uniqueProblems.push(p);
                }
            });

            const headersRow = [
                "Student Name",
                "Email",
                "Classroom(s)",
                "Total Solved",
                "Total Questions",
                "Completion (%)"
            ];
            uniqueProblems.forEach((p, idx) => {
                headersRow.push(`Q${idx + 1}: ${p.title}`);
            });

            const dataRows = uniqueStudents.map(student => {
                let solvedCount = 0;
                const problemStatuses: string[] = [];

                uniqueProblems.forEach(p => {
                    const isSolved = student.solvedProblemIds.has(p.id);
                    if (isSolved) solvedCount++;
                    problemStatuses.push(isSolved ? "Solved" : "Pending");
                });

                const percentage = uniqueProblems.length > 0 ? (solvedCount / uniqueProblems.length) * 100 : 0;

                return [
                    student.name || "Unknown",
                    student.email || "No Email",
                    student.classroomNames.join(" | "),
                    solvedCount.toString(),
                    uniqueProblems.length.toString(),
                    `${percentage.toFixed(1)}%`,
                    ...problemStatuses
                ];
            });

            return generateResponse(headersRow, dataRows, format, `progress_${cat.name}`);

        } else {
            /**
             * GLOBAL DOWNLOAD: Summary per main category
             */
            const rootCategories = allCategories.filter(c => !c.parentId);
            const targetCategories: any[] = [];

            rootCategories.forEach(root => {
                const problems = getProblemsRecursive(root.id);
                const uniqueProblemIds = Array.from(new Set(problems.map(p => p.id)));
                if (uniqueProblemIds.length > 0) {
                    targetCategories.push({
                        name: root.name,
                        problemIds: uniqueProblemIds,
                        totalCount: uniqueProblemIds.length
                    });
                }
            });

            const headersRow = [
                "Student Name",
                "Email",
                "Classroom(s)",
                "Overall Completion (%)"
            ];
            targetCategories.forEach(cat => {
                headersRow.push(`${cat.name} (%)`);
            });

            const allSelectedProblemIds = new Set();
            targetCategories.forEach(cat => cat.problemIds.forEach((id: string) => allSelectedProblemIds.add(id)));

            const dataRows = uniqueStudents.map(student => {
                const catPercentages: string[] = [];
                targetCategories.forEach(cat => {
                    let solvedInCat = 0;
                    cat.problemIds.forEach((pId: string) => {
                        if (student.solvedProblemIds.has(pId)) solvedInCat++;
                    });
                    const p = cat.totalCount > 0 ? (solvedInCat / cat.totalCount) * 100 : 0;
                    catPercentages.push(`${p.toFixed(1)}%`);
                });

                let solvedOverall = 0;
                allSelectedProblemIds.forEach((pId: any) => {
                    if (student.solvedProblemIds.has(pId)) solvedOverall++;
                });
                const overallPercentage = allSelectedProblemIds.size > 0 ? (solvedOverall / allSelectedProblemIds.size) * 100 : 0;

                return [
                    student.name || "Unknown",
                    student.email || "No Email",
                    student.classroomNames.join(" | "),
                    `${overallPercentage.toFixed(1)}%`,
                    ...catPercentages
                ];
            });

            return generateResponse(headersRow, dataRows, format, `${domain}_progress_all`);
        }

    } catch (error) {
         console.error("Progress export error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

/**
 * Shared helper to generate CSV or XLSX response
 */
function generateResponse(headers: string[], data: any[][], format: string, filename: string) {
    if (format === "xlsx") {
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Progress");
        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new NextResponse(buf, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        });
    } else {
        const csvContent = [headers, ...data].map(row =>
            row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ).join("\n");

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${filename}.csv"`,
                "Content-Type": "text/csv"
            }
        });
    }
}

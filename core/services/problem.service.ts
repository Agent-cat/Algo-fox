
import { prisma } from "@/lib/prisma";
import { Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import redis from "@/lib/redis";

const CACHE_TTL = 300; // 5 minutes
const PROBLEM_CACHE_TTL = 3600; // 1 hour

// CACHE KEY HELPERS
const getProblemsCacheKey = (type: ProblemType, domain: ProblemDomain, page: number) =>
    `problems:list:${domain}:${type}:page:${page}`;
const getAdminProblemsCacheKey = (domain: string | undefined, page: number) =>
    `admin:problems:${domain || 'all'}:page:${page}`;
const getProblemCacheKey = (slug: string) => `problem:${slug}`;

export class ProblemService {

    // CACHED FETCHER FOR PUBLIC PROBLEM LIST
    private static async getCachedProblems(page: number, pageSize: number, type: ProblemType, domain: ProblemDomain = "DSA") {
        const cacheKey = getProblemsCacheKey(type, domain, page);
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] Problems List: ${domain} ${type} Page ${page}`);
                return JSON.parse(cached);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const skip = (page - 1) * pageSize;
        const [problems, total] = await Promise.all([
            prisma.problem.findMany({
                where: {
                    type,
                    domain,
                    hidden: false
                },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                    score: true,
                    solved: true,
                    createdAt: true,
                    type: true,
                    _count: {
                        select: { submissions: true }
                    }
                }
            }),
            prisma.problem.count({
                where: {
                    type,
                    domain,
                    hidden: false
                }
            })
        ]);

        const result = { problems, total };
        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error("Redis set error:", error);
        }
        return result;
    }

    // GETTING PUBLIC PROBLEMS
    static async getProblems(
        page: number = 1,
        pageSize: number = 10,
        type: ProblemType = "PRACTICE",
        domain: ProblemDomain = "DSA",
        userId?: string
    ) {
        // FETCHING PUBLIC DATA (CACHED)
        const { problems, total } = await this.getCachedProblems(page, pageSize, type, domain);

        // IF USER IS LOGGED IN, FETCHING THEIR SOLVED STATUS FOR THESE SPECIFIC PROBLEMS
        let solvedSet = new Set<string>();
        if (userId && problems.length > 0) {
            const problemIds = problems.map((p: any) => p.id);
            const solvedSubmissions = await prisma.submission.findMany({
                where: {
                    userId,
                    problemId: { in: problemIds },
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: { problemId: true },
                distinct: ["problemId"]
            });
            solvedSet = new Set(solvedSubmissions.map(s => s.problemId));
        }

        // MERGING DATA
        const problemsWithStats = problems.map((p: any) => {
            return {
                ...p,
                isSolved: solvedSet.has(p.id),
                // USING THE STORED 'SOLVED' COUNT WHICH IS NOW MAINTAINED BY WORKER
                // FALLBACK TO 0 IF NULL
                acceptance: p._count.submissions > 0
                    ? ((p.solved || 0) / p._count.submissions) * 100
                    : 0,
            };
        });

        return {
            problems: problemsWithStats,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page
        };
    }

    // GETTING ADMIN PROBLEMS
    static async getAdminProblems(
        page: number = 1,
        pageSize: number = 50,
        domain?: ProblemDomain
    ) {
        const cacheKey = getAdminProblemsCacheKey(domain, page);
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] Admin Problems: ${domain || 'All'} Page ${page}`);
                return JSON.parse(cached);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const skip = (page - 1) * pageSize;
        const where = domain ? { domain } : {};
        const [problems, total] = await Promise.all([
            prisma.problem.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                    hidden: true,
                    score: true,
                    type: true,
                    domain: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }),
            prisma.problem.count({ where })
        ]);

        const result = {
            problems,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
            total
        };

        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error("Redis set error:", error);
        }
        return result;
    }

    // SEARCHING FOR PROBLEMS
    static async searchProblems(
        term: string,
        type: ProblemType = "PRACTICE",
        domain: ProblemDomain = "DSA",
        userId?: string
    ) {
        const problems = await prisma.problem.findMany({
            where: {
                type,
                domain,
                hidden: false,
                title: {
                    contains: term,
                    mode: 'insensitive'
                }
            },
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                score: true,
                solved: true,
                createdAt: true,
                type: true,
                _count: {
                    select: { submissions: true }
                }
            }
        });

        let solvedSet = new Set<string>();
        if (userId && problems.length > 0) {
            const problemIds = problems.map(p => p.id);
            const solvedSubmissions = await prisma.submission.findMany({
                where: {
                    userId,
                    problemId: { in: problemIds },
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: { problemId: true },
                distinct: ["problemId"]
            });
            solvedSet = new Set(solvedSubmissions.map(s => s.problemId));
        }

        const problemsWithStats = problems.map((p) => {
            return {
                ...p,
                isSolved: solvedSet.has(p.id),
                acceptance: p._count.submissions > 0
                    ? ((p.solved || 0) / p._count.submissions) * 100
                    : 0,
            };
        });

        return { problems: problemsWithStats };
    }

    // CACHED FETCHER FOR SINGLE PROBLEM
    private static async getCachedProblem(slug: string) {
        const cacheKey = getProblemCacheKey(slug);

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] Problem: ${slug}`);
                return JSON.parse(cached);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const problem = await prisma.problem.findUnique({
            where: { slug },
            include: { testCases: true, user: { select: { name: true, image: true } } }
        });

        if (problem) {
            try {
                await redis.setex(cacheKey, PROBLEM_CACHE_TTL, JSON.stringify(problem));
            } catch (error) {
                console.error("Redis set error:", error);
            }
        }
        return problem;
    }

    // GETTING A PROBLEM BY SLUG CACHED
    static async getProblem(slug: string) {
        const problem = await this.getCachedProblem(slug);
        return problem;
    }

    // GETTING A PROBLEM BY ID
    static async getProblemById(id: string) {
        try {
            const problem = await prisma.problem.findUnique({
                where: { id },
                include: {
                    testCases: true
                }
            });
            return { success: true, data: problem };
        } catch (error) {
            console.error("Failed to get problem by id:", error);
            return { success: false, error: "Failed to get problem by id" };
        }
    }

    // CREATING A PROBLEM
    static async createProblem(data: {
        title: string;
        description: string;
        difficulty: Difficulty;
        slug: string;
        hidden: boolean;
        hiddenQuery?: string | null;
        domain?: ProblemDomain;
        testCases: { input: string; output: string; hidden?: boolean }[];
    }) {
        try {
            const problem = await prisma.problem.create({
                data: {
                    title: data.title,
                    description: data.description,
                    difficulty: data.difficulty,
                    slug: data.slug,
                    score: 10,
                    hidden: data.hidden,
                    hiddenQuery: data.hiddenQuery || null,
                    domain: data.domain || "DSA",
                    testCases: {
                        create: data.testCases.map(tc => ({
                            input: tc.input,
                            output: tc.output,
                            hidden: tc.hidden ?? false
                        }))
                    }
                },
            });

            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();

            return { success: true, problem };
        } catch (error) {
            console.error("Failed to create problem:", error);
            return { success: false, error: "Failed to create problem" };
        }
    }

    // UPDATING A PROBLEM
    static async updateProblem(id: string, data: any) {
        try {
            const { testCases, ...problemData } = data;

            const updateData: any = { ...problemData };
            if (testCases) {
                updateData.testCases = {
                    deleteMany: {},
                    create: testCases.map((tc: any) => ({
                        input: tc.input,
                        output: tc.output,
                        hidden: tc.hidden ?? false
                    }))
                };
            }

            // UPDATING THE PROBLEM
            const problem = await prisma.problem.update({
                where: { id },
                data: updateData
            });

            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();
            await redis.del(getProblemCacheKey(problem.slug));

            return { success: true, data: problem };
        } catch (error) {
            console.error("Failed to update problem:", error);
            return { success: false, error: "Failed to update problem" };
        }
    }

    // DELETING A PROBLEM
    static async deleteProblem(id: string) {
        try {
            const problem = await prisma.problem.findUnique({ where: { id }, select: { slug: true } });

            await prisma.problem.delete({
                where: { id }
            });

            // INVALIDATING THE CACHE
            await this.invalidateProblemCaches();
            if (problem) {
                await redis.del(getProblemCacheKey(problem.slug));
            }

            // RETURNING THE SUCCESS
            return { success: true };
        } catch (error) {
            console.error("Failed to delete problem:", error);
            return { success: false, error: "Failed to delete problem" };
        }
    }

    private static async invalidateProblemCaches() {
        const cachePattern = "problems:list:*";
        const keys = await redis.keys(cachePattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
        const adminCachePattern = "admin:problems:*";
        const adminKeys = await redis.keys(adminCachePattern);
        if (adminKeys.length > 0) {
            await redis.del(...adminKeys);
        }
    }
}

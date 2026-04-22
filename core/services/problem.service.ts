import { safeJsonParse } from "@/lib/json";
import { prisma } from "@/lib/prisma";
import { Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import redis from "@/lib/redis";
import { scanAndDelete } from "@/lib/redis-utils";

const CACHE_TTL = 300; // 5 minutes
const PROBLEM_CACHE_TTL = 3600; // 1 hour

// CACHE KEY HELPERS
const getProblemsCacheKey = (type: ProblemType, domain: ProblemDomain, page: number, diff?: Difficulty, tags: string[] = [], sortBy: string = 'newest') =>
    `problems:list:${domain}:${type}:page:${page}:diff:${diff || 'all'}:tags:${tags.sort().join(',')}:sort:${sortBy}`;
const getAdminProblemsCacheKey = (
    domain: string | undefined,
    page: number,
    excludeDifficulty?: Difficulty,
    type?: ProblemType
) => `admin:problems:${domain || 'all'}:page:${page}:diff:${excludeDifficulty || 'all'}:type:${type || 'all'}`;
const getProblemCacheKey = (slug: string) => `problem:${slug}`;

export class ProblemService {

    // CACHED FETCHER FOR PUBLIC PROBLEM LIST
    private static async getCachedProblems(page: number, pageSize: number, type: ProblemType, domain: ProblemDomain = "DSA", diff?: Difficulty, tags: string[] = [], cursor?: string, sortBy: string = 'newest') {
        const cacheKey = cursor
            ? `problems:list:${domain}:${type}:cursor:${cursor}:pageSize:${pageSize}:diff:${diff || 'all'}:tags:${tags.sort().join(',')}:sort:${sortBy}`
            : getProblemsCacheKey(type, domain, page, diff, tags, sortBy);

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const parsed = safeJsonParse(cached, null);
                if (parsed) return parsed;
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const orderBy: any = {};
        switch (sortBy) {
            case 'oldest': orderBy.createdAt = 'asc'; break;
            case 'hardest': orderBy.difficulty = 'desc'; orderBy.createdAt = 'desc'; break;
            case 'easiest': orderBy.difficulty = 'asc'; orderBy.createdAt = 'desc'; break;
            case 'acceptance': orderBy.solved = 'desc'; break;
            case 'newest':
            default: orderBy.createdAt = 'desc'; break;
        }

        const query: any = {
            where: {
                type,
                domain,
                difficulty: diff,
                hidden: false,
                tags: tags.length > 0 ? {
                    some: {
                        slug: { in: tags }
                    }
                } : undefined
            },
            take: pageSize,
            orderBy,
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
                },
                tags: {
                    select: {
                        name: true,
                        slug: true
                    }
                }
            }
        };

        if (cursor) {
            query.cursor = { id: cursor };
            query.skip = 1; // Skip the item already fetched
        } else {
            query.skip = (page - 1) * pageSize;
        }

        const [problems, total] = await Promise.all([
            prisma.problem.findMany(query),
            prisma.problem.count({
                where: {
                    type,
                    domain,
                    difficulty: diff,
                    hidden: false,
                    tags: tags.length > 0 ? {
                        some: {
                            slug: { in: tags }
                        }
                    } : undefined
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
        userId?: string,
        diff?: Difficulty,
        tags: string[] = [],
        cursor?: string,
        sortBy: string = 'newest'
    ) {
        // FETCHING PUBLIC DATA (CACHED)
        const { problems, total } = await this.getCachedProblems(page, pageSize, type, domain, diff, tags, cursor, sortBy);

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
                acceptance: p._count.submissions > 0
                    ? ((p.solved || 0) / p._count.submissions) * 100
                    : 0,
            };
        });

        return {
            problems: problemsWithStats,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
            total
        };
    }

    // GETTING ADMIN PROBLEMS
    static async getAdminProblems(
        page: number = 1,
        pageSize: number = 50,
        domain?: ProblemDomain,
        excludeDifficulty?: Difficulty,
        type?: ProblemType
    ) {
        // Cache key now includes ALL filter params to prevent stale data across different filter combinations
        const cacheKey = getAdminProblemsCacheKey(domain, page, excludeDifficulty, type);

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const parsed = safeJsonParse(cached, null);
                if (parsed) return parsed;
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const skip = (page - 1) * pageSize;
        const where: any = domain ? { domain } : {};

        if (type) {
            where.type = type;
        } else {
            where.type = { not: "CONTEST" };
        }

        if (excludeDifficulty) {
            where.difficulty = { not: excludeDifficulty };
        }

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
    // Short-lived cache (30s) for search results to reduce DB load on repeated/concurrent identical searches.
    static async searchProblems(
        term: string,
        type: ProblemType = "PRACTICE",
        domain: ProblemDomain = "DSA",
        userId?: string
    ) {
        const SEARCH_CACHE_TTL = 30;
        const searchCacheKey = `problems:search:${domain}:${type}:${term.toLowerCase().trim()}`;

        let problems: any[] | null = null;
        try {
            const cached = await redis.get(searchCacheKey);
            if (cached) problems = safeJsonParse(cached, null);
        } catch { /* non-fatal */ }

        if (!problems) {
            problems = await prisma.problem.findMany({
                where: {
                    type,
                    domain,
                    hidden: false,
                    title: { contains: term, mode: 'insensitive' }
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
                    _count: { select: { submissions: true } },
                    tags: { select: { name: true, slug: true } }
                }
            });
            try {
                await redis.setex(searchCacheKey, SEARCH_CACHE_TTL, JSON.stringify(problems));
            } catch { /* non-fatal */ }
        }

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

        const problemsWithStats = problems.map((p: any) => ({
            ...p,
            isSolved: solvedSet.has(p.id),
            acceptance: p._count.submissions > 0
                ? ((p.solved || 0) / p._count.submissions) * 100
                : 0,
        }));

        return { problems: problemsWithStats };
    }

    // CACHED FETCHER FOR SINGLE PROBLEM
    private static async getCachedProblem(slug: string) {
        const cacheKey = getProblemCacheKey(slug);

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const parsed = safeJsonParse(cached, null);
                if (parsed) return parsed;
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const problem = await prisma.problem.findUnique({
            where: { slug },
            include: {
                testCases: true,
                user: { select: { name: true, image: true } },
                tags: { select: { name: true, slug: true } },
                functionTemplates: true, // Include for DSA function template boilerplates
                categoryProblems: {
                    include: {
                        category: {
                            include: {
                                course: true
                            }
                        }
                    }
                }
            }
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
                    testCases: true,
                    tags: { select: { name: true, slug: true } },
                    functionTemplates: true,
                    categoryProblems: {
                        include: {
                            category: {
                                include: {
                                    course: true
                                }
                            }
                        }
                    }
                }
            });
            return { success: true, data: problem };
        } catch (error) {
            console.error("Failed to get problem by id:", error);
            return { success: false, error: "Failed to get problem by id" };
        }
    }

    // GETTING NEXT PROBLEM
    // OPTIMIZATION: Course problem ordering is cached in Redis (15min TTL) to avoid
    // full course traversal on every next/prev navigation click.
    static async getNextProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType, courseId?: string, currentProblemId?: string) {
        try {
            if (courseId && currentProblemId) {
                const courseProblems = await this.getCachedCourseProblems(courseId);
                const currentIndex = courseProblems.findIndex(cp => cp.id === currentProblemId);
                if (currentIndex !== -1 && currentIndex < courseProblems.length - 1) {
                    return courseProblems[currentIndex + 1].slug;
                }
                return null; // End of course
            }

            const nextProblem = await prisma.problem.findFirst({
                where: { domain, type, hidden: false, createdAt: { lt: currentCreatedAt } },
                orderBy: { createdAt: 'desc' },
                select: { slug: true }
            });
            return nextProblem?.slug || null;
        } catch (error) {
            console.error("Failed to get next problem:", error);
            return null;
        }
    }

    // GETTING PREVIOUS PROBLEM
    static async getPreviousProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType, courseId?: string, currentProblemId?: string) {
        try {
            if (courseId && currentProblemId) {
                const courseProblems = await this.getCachedCourseProblems(courseId);
                const currentIndex = courseProblems.findIndex(cp => cp.id === currentProblemId);
                if (currentIndex > 0) {
                    return courseProblems[currentIndex - 1].slug;
                }
                return null; // Beginning of course
            }

            const prevProblem = await prisma.problem.findFirst({
                where: { domain, type, hidden: false, createdAt: { gt: currentCreatedAt } },
                orderBy: { createdAt: 'asc' },
                select: { slug: true }
            });
            return prevProblem?.slug || null;
        } catch (error) {
            console.error("Failed to get previous problem:", error);
            return null;
        }
    }

    /**
     * Cached ordered problem list for a course (used by getNextProblem/getPreviousProblem).
     * TTL: 15 minutes. Cache key pattern: course:{courseId}:ordered-problems
     * Invalidation: covered by scanAndDelete("problems:list:*") and course update actions.
     */
    private static async getCachedCourseProblems(courseId: string): Promise<{ id: string; slug: string }[]> {
        const cacheKey = `course:${courseId}:ordered-problems`;
        const COURSE_PROBLEMS_TTL = 900; // 15 minutes
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const parsed = safeJsonParse<{ id: string; slug: string }[] | null>(cached, null);
                if (parsed) return parsed;
            }
        } catch { /* non-fatal */ }

        const rows = await prisma.categoryProblem.findMany({
            where: { category: { courseId } },
            orderBy: [
                { category: { order: 'asc' } },
                { order: 'asc' }
            ],
            select: { problem: { select: { id: true, slug: true } } }
        });
        const problems = rows.map(r => r.problem);

        try {
            await redis.setex(cacheKey, COURSE_PROBLEMS_TTL, JSON.stringify(problems));
        } catch { /* non-fatal */ }

        return problems;
    }

    // GETTING RANDOM PROBLEM
    // OPTIMIZATION: Use keyset pagination instead of OFFSET-based random selection
    // OFFSET-based random is O(n) - with 10000 problems and random offset=5000, scans 5000 rows
    // Keyset pagination with index is O(1) - single index lookup
    static async getRandomProblem(domain: ProblemDomain, type: ProblemType, courseId?: string) {
        try {
            if (courseId) {
                const courseProblems = await prisma.categoryProblem.findMany({
                    where: {
                        category: { courseId }
                    },
                    select: {
                        problem: { select: { slug: true } }
                    }
                });

                if (courseProblems.length === 0) return null;
                const randomIndex = Math.floor(Math.random() * courseProblems.length);
                return courseProblems[randomIndex].problem.slug;
            }

            // Step 1: Find the ID range of problems in this domain/type
            const [minIdRecord, maxIdRecord] = await Promise.all([
                prisma.problem.findFirst({
                    where: { domain, type, hidden: false },
                    orderBy: { id: 'asc' },
                    select: { id: true }
                }),
                prisma.problem.findFirst({
                    where: { domain, type, hidden: false },
                    orderBy: { id: 'desc' },
                    select: { id: true }
                })
            ]);

            if (!minIdRecord || !maxIdRecord) return null;

            // Step 2: Generate random ID within range
            // This assumes IDs are numeric or can be converted to comparable values
            const minNum = parseInt(minIdRecord.id) || 0;
            const maxNum = parseInt(maxIdRecord.id) || 1;
            const randomNum = minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
            const randomId = String(randomNum);

            // Step 3: Use keyset pagination to find next problem with ID >= randomId
            // This uses index and is O(1) vs O(n) for OFFSET-based
            const randomProblem = await prisma.problem.findFirst({
                where: {
                    domain,
                    type,
                    hidden: false,
                    id: { gte: randomId }
                },
                orderBy: { id: 'asc' },
                select: { slug: true }
            });

            // Fallback to first problem in range if random search misses
            if (!randomProblem) {
                const fallback = await prisma.problem.findFirst({
                    where: { domain, type, hidden: false },
                    orderBy: { id: 'asc' },
                    select: { slug: true }
                });
                return fallback?.slug || null;
            }

            return randomProblem.slug;
        } catch (error) {
            console.error("Failed to get random problem:", error);
            return null;
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
        tags?: string[];
        useFunctionTemplate?: boolean;
        functionTemplates?: { languageId: number; functionTemplate: string; driverCode: string }[];
        solution?: string | null;
        isMcq?: boolean;
        options?: any;
        answer?: string | null;
        categoryId?: string | null;
        courseId?: string | null;
        type?: ProblemType;
        allowedLanguages?: string[];
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
                    type: data.type || (data.categoryId ? "LEARN" : "PRACTICE"),
                    useFunctionTemplate: data.useFunctionTemplate || false,
                    solution: data.solution || null,
                    isMcq: data.isMcq || false,
                    options: data.options || null,
                    answer: data.answer || null,
                    courseId: data.courseId || null,
                    allowedLanguages: data.allowedLanguages || [],
                    testCases: {
                        create: data.testCases.map(tc => ({
                            input: tc.input,
                            output: tc.output,
                            hidden: tc.hidden ?? false
                        }))
                    },
                    tags: data.tags ? {
                        connect: data.tags.map(slug => ({ slug }))
                    } : undefined,
                    // Create function templates if provided and enabled
                    functionTemplates: data.useFunctionTemplate && data.functionTemplates?.length ? {
                        create: data.functionTemplates.map(ft => ({
                            languageId: ft.languageId,
                            functionTemplate: ft.functionTemplate,
                            driverCode: ft.driverCode,
                        }))
                    } : undefined,
                    categoryProblems: data.categoryId ? {
                        create: {
                            categoryId: data.categoryId,
                            order: 0
                        }
                    } : undefined
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

    // UPDATING A PROBLEM - Force reload to pick up new Prisma Client
    static async updateProblem(id: string, data: any) {
        try {
            const { testCases, tags, functionTemplates, options, categoryId, type, ...problemData } = data;

            const updateData: any = { ...problemData };
            if (options) {
                updateData.options = options;
            }
            if (type) {
                updateData.type = type;
            }
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

            if (tags) {
                updateData.tags = {
                    set: [], // Disconnect all existing
                    connect: tags.map((slug: string) => ({ slug }))
                };
            }

            // Handle function templates
            if (functionTemplates !== undefined) {
                updateData.functionTemplates = {
                    deleteMany: {}, // Delete all existing templates
                    create: functionTemplates.map((ft: any) => ({
                        languageId: ft.languageId,
                        functionTemplate: ft.functionTemplate,
                        driverCode: ft.driverCode,
                    }))
                };
            }

            if (data.categoryId !== undefined) {
                if (!type) updateData.type = data.categoryId ? "LEARN" : "PRACTICE";
                updateData.categoryProblems = {
                    deleteMany: {}, // Remove from all existing categories
                    create: data.categoryId ? [{
                        categoryId: data.categoryId,
                        order: 0
                    }] : []
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
            // Also invalidate function template cache
            await redis.del(`problem-templates:${id}`);

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
        // Use SCAN-based deletion to avoid blocking Redis event loop.
        // redis.keys() is O(N) and blocks during execution; scanAndDelete() iterates in batches of 100.
        await Promise.all([
            scanAndDelete("problems:list:*"),
            scanAndDelete("admin:problems:*"),
            scanAndDelete("problems:search:*"),
        ]);
    }
}

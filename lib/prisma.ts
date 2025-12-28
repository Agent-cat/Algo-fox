import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
}).$extends({
    query: {
        $allModels: {
            async $allOperations({ operation, model, args, query }) {
                const start = performance.now();
                const result = await query(args);
                const end = performance.now();

                // Warn about slow queries (>1 second)
                if (end - start > 1000) {
                    console.warn(`🐌 Slow query: ${model}.${operation} took ${(end - start).toFixed(2)}ms`);
                }

                return result;
            },
        },
    },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

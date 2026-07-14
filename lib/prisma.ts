import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }).$extends({
        query: {
            $allModels: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const durationMs = performance.now() - start;

                    if (process.env.NODE_ENV === 'development' && durationMs > 100) {
                        // PERF: Lowered from 500ms → 100ms to catch the 100-500ms blind spot
                        // that accumulates and kills P95 latency in production.
                        console.warn(
                            `[slow-query] ${model}.${operation} took ${durationMs.toFixed(2)}ms`
                        );
                    } else if (process.env.NODE_ENV === 'production' && durationMs > 200) {
                        // Structured JSON for Grafana/Loki ingestion
                        console.warn(
                            JSON.stringify({
                                level: 'warn',
                                type: 'slow_query',
                                model,
                                operation,
                                durationMs: Math.round(durationMs),
                                ts: new Date().toISOString(),
                            })
                        );
                    }

                    return result;
                },
            },
        },
    });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare global {
    var prisma_fox_v6: PrismaClientSingleton | undefined;
}

const prisma = globalThis.prisma_fox_v6 ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma_fox_v6 = prisma;

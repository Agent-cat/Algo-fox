import { PrismaClient } from "@prisma/client";
import { env } from "@algofox/env";

// PERF: with PM2 cluster mode (`instances: 'max'`), every worker gets its own
// Prisma pool. The default (num_cpus * 2 + 1 per process) oversubscribes the
// PgBouncer pool (20 server connections) and causes queuing under load.
// An explicit per-worker limit keeps total connections predictable.
function buildDatasourceUrl(): string | undefined {
    const url = env.DATABASE_URL;
    if (!url || url.includes("connection_limit=")) return url;
    const limit = env.PRISMA_POOL_SIZE || "5";
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}connection_limit=${limit}&pool_timeout=10`;
}
const datasourceUrl = buildDatasourceUrl();

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: datasourceUrl ? { db: { url: datasourceUrl } } : undefined,
        log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }).$extends({
        query: {
            $allModels: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const durationMs = performance.now() - start;

                    if (env.NODE_ENV === 'development' && durationMs > 200) {
                        console.warn(
                            `[slow-query] ${model}.${operation} took ${durationMs.toFixed(2)}ms`
                        );
                    } else if (env.NODE_ENV === 'production' && durationMs > 200) {
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

if (env.NODE_ENV !== "production") globalThis.prisma_fox_v6 = prisma;

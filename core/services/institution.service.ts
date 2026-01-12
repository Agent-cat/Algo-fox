import { prisma } from "@/lib/prisma";

export class InstitutionService {
    /**
     * Get all institutions with counts of users and classrooms
     */
    static async getInstitutions() {
        const institutions = await prisma.institution.findMany({
            include: {
                _count: {
                    select: {
                        users: true,
                        classrooms: true,
                    },
                },
                users: {
                    where: {
                        role: "INSTITUTION_MANAGER",
                    },
                    select: {
                        name: true,
                    },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return institutions.map((inst) => ({
            ...inst,
            managerName: inst.users[0]?.name || "Unassigned",
        }));
    }

    /**
     * Get an institution by ID with users and classrooms
     */
    static async getInstitutionById(id: string) {
        return prisma.institution.findUnique({
            where: { id },
            include: {
                users: {
                    where: {
                        role: "INSTITUTION_MANAGER",
                    },
                },
                classrooms: true,
                _count: {
                    select: {
                        users: true,
                        classrooms: true,
                    },
                },
            },
        });
    }

    /**
     * Update institution details
     */
    static async updateInstitution(id: string, data: {
        name?: string;
        logo?: string | null;
        domain?: string | null;
    }) {
        return prisma.institution.update({
            where: { id },
            data,
        });
    }

    /**
     * Delete an institution
     */
    static async deleteInstitution(id: string) {
        return prisma.institution.delete({
            where: { id },
        });
    }

    /**
     * Get detailed stats for an institution
     */
    static async getInstitutionStats(id: string) {
        const stats = await prisma.user.groupBy({
            by: ['role'],
            where: {
                institutionId: id,
            },
            _count: true,
        });

        const classroomCount = await prisma.classroom.count({
            where: { institutionId: id },
        });

        const roleCounts = stats.reduce((acc, curr) => {
            acc[curr.role as string] = curr._count;
            return acc;
        }, {} as Record<string, number>);

        return {
            students: roleCounts["STUDENT"] || 0,
            teachers: roleCounts["TEACHER"] || 0,
            contestManagers: roleCounts["CONTEST_MANAGER"] || 0,
            classrooms: classroomCount,
        };
    }
}

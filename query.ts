import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.findFirst();
    console.log(JSON.stringify(user?.experienceDetails, null, 2));
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());

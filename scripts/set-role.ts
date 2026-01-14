import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = process.argv[2];
const role = process.argv[3]?.toUpperCase() || "ADMIN";

if (!email) {
    console.error("Please provide an email address.");
    console.error("Usage: bun scripts/set-role.ts <email> [ROLE]");
    process.exit(1);
}

async function main() {
    console.log(`Updating role for ${email} to ${role}...`);

    try {
        const user = await prisma.user.update({
            where: { email },
            data: {
                role: role as any
            }
        });
        console.log(`Successfully updated user ${user.name} (${user.email}) to role ${user.role}`);
    } catch (e) {
        console.error("Failed to update user:", e);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

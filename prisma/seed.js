"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const env_1 = require("@/env");
const prisma = new client_1.PrismaClient();
async function main() {
    const createUserForSession = await prisma.session.upsert({
        where: { email: env_1.env.DEFAULT_USER },
        update: {},
        create: {
            email: env_1.env.DEFAULT_USER,
            password_hash: await (0, bcryptjs_1.hash)(env_1.env.DEFAULT_PASSWORD, 8),
        },
    });
    console.log({ createUserForSession });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

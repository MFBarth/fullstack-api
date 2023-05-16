"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSessionRepository = void 0;
const prisma_1 = require("@/infra/database/prisma");
class PrismaSessionRepository {
    async find(email) {
        const session = await prisma_1.prisma.session.findUnique({
            where: {
                email,
            },
        });
        return session;
    }
}
exports.PrismaSessionRepository = PrismaSessionRepository;

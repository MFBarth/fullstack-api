"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_1 = require("@/infra/database/prisma");
class PrismaUserRepository {
    async create(data) {
        const user = await prisma_1.prisma.user.create({ data });
        return user;
    }
    async findById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    async update(id, data) {
        const user = await prisma_1.prisma.user.update({ where: { id }, data });
        return user;
    }
    async delete(id) {
        const user = await prisma_1.prisma.user.delete({ where: { id } });
        return user;
    }
    async findAll() {
        const users = await prisma_1.prisma.user.findMany();
        return users;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;

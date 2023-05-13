import { PrismaUserRepository } from './prisma/user.prisma';

const userRepo = new PrismaUserRepository();

export { userRepo };

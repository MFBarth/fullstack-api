import { PrismaUserRepository } from './prisma/user.prisma';
import { PrismaSessionRepository } from './prisma/session.prisma';

const userRepo = new PrismaUserRepository();
const sessionRepo = new PrismaSessionRepository();

export { userRepo, sessionRepo };

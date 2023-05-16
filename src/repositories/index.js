"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepo = exports.userRepo = void 0;
const user_prisma_1 = require("./prisma/user.prisma");
const session_prisma_1 = require("./prisma/session.prisma");
const userRepo = new user_prisma_1.PrismaUserRepository();
exports.userRepo = userRepo;
const sessionRepo = new session_prisma_1.PrismaSessionRepository();
exports.sessionRepo = sessionRepo;

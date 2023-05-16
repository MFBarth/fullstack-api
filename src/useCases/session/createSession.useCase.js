"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("@/env");
class CreateSessionUseCase {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async execute({ email, password }) {
        const session = await this.sessionRepository.find(email);
        if (!session) {
            throw new Error('Email ou Senha incorretos.');
        }
        const passwordMatched = await (0, bcryptjs_1.compare)(password, session.password_hash);
        if (!passwordMatched) {
            throw new Error('Email ou Senha incorretos.');
        }
        const token = (0, jsonwebtoken_1.sign)({}, env_1.env.SECRET, {
            subject: session.id,
            expiresIn: '1d',
        });
        return token;
    }
}
exports.CreateSessionUseCase = CreateSessionUseCase;

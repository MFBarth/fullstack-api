"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionUseCase = void 0;
const repositories_1 = require("@/repositories");
const createSession_useCase_1 = require("./createSession.useCase");
const createSessionUseCase = new createSession_useCase_1.CreateSessionUseCase(repositories_1.sessionRepo);
exports.createSessionUseCase = createSessionUseCase;

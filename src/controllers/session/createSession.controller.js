"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionController = void 0;
const session_dto_1 = require("@/dtos/session.dto");
const session_1 = require("@/useCases/session");
async function createSessionController(request, response) {
    const dtoResult = session_dto_1.createSessionSchema.safeParse(request.body);
    if (!dtoResult.success) {
        throw new Error(`Não foi possível criar a seção. Erro: ${dtoResult.error.message}`);
    }
    const session = await session_1.createSessionUseCase.execute(dtoResult.data);
    response.cookie('accessToken', session);
    return response.status(200).json(session);
}
exports.createSessionController = createSessionController;

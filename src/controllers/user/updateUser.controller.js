"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
const user_dto_1 = require("@/dtos/user.dto");
const user_1 = require("@/useCases/user");
async function updateUserController(request, response) {
    const dtoResult = user_dto_1.updateUserBodySchema.safeParse(request.body);
    if (!dtoResult.success) {
        throw new Error(`Não foi possível atualizar o usuário. Erro: ${dtoResult.error.message}`);
    }
    const user = await user_1.updateUserUseCase.execute(dtoResult.data);
    return response.status(200).json(user);
}
exports.updateUserController = updateUserController;

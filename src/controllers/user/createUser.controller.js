"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const user_dto_1 = require("@/dtos/user.dto");
const user_1 = require("@/useCases/user");
async function createUserController(request, response) {
    const dtoResult = user_dto_1.createUserBodySchema.safeParse(request.body);
    if (!dtoResult.success) {
        throw new Error(`Não foi possível criar o usuário. Erro: ${dtoResult.error.message}`);
    }
    const user = await user_1.createUserUseCase.execute(dtoResult.data);
    return response.status(200).json(user);
}
exports.createUserController = createUserController;

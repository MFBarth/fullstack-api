"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = void 0;
const zod_1 = require("zod");
const user_1 = require("@/useCases/user");
const requestSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User id is required',
    })
        .uuid({
        message: 'User id must be a valid uuid',
    }),
});
async function deleteUserController(request, response) {
    const dtoResult = requestSchema.safeParse(request.query);
    if (!dtoResult.success) {
        throw new Error(`Não foi possível deletar o usuário. Erro: ${dtoResult.error.message}`);
    }
    const { name } = await user_1.deleteUserUseCase.execute(dtoResult.data);
    return response
        .status(200)
        .send(`Usuário ${name}, foi deletado com sucesso.`);
}
exports.deleteUserController = deleteUserController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const user = await this.userRepository.delete(request.userId);
        if (!user) {
            throw new Error('Não foi possível deletar o usuário.');
        }
        return user;
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;

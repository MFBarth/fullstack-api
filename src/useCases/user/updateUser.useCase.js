"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const user = await this.userRepository.update(request.id, { ...request });
        if (!user) {
            throw new Error('Não foi possível atualizar o usuário.');
        }
        return user;
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;

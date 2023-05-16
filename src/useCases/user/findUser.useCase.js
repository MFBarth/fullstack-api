"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUseCase = void 0;
class FindUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const user = await this.userRepository.findById(request.userId);
        if (!user) {
            throw new Error('Não foi possível encontrar o usuário');
        }
        return user;
    }
}
exports.FindUserUseCase = FindUserUseCase;

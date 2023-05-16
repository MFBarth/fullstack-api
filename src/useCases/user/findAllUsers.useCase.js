"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersUseCase = void 0;
class FindAllUsersUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new Error('Não foi possível encontrar os usuários');
        }
        return users;
    }
}
exports.FindAllUsersUseCase = FindAllUsersUseCase;

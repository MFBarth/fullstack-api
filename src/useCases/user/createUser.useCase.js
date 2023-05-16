"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, lastName, cpf, phone, birthDay, }) {
        const user = await this.userRepository.create({
            name,
            lastName,
            cpf,
            phone,
            birthDay,
        });
        return user;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;

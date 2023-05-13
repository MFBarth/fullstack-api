import { userRepo } from '@/repositories';
import { CreateUserUseCase } from './createUser.useCase';

const createUserUseCase = new CreateUserUseCase(userRepo);

export { createUserUseCase };

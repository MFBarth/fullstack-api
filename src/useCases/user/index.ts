import { userRepo } from '@/repositories';
import { CreateUserUseCase } from './createUser.useCase';
import { FindUserUseCase } from './findUser.useCase';

const createUserUseCase = new CreateUserUseCase(userRepo);
const findUserUseCase = new FindUserUseCase(userRepo);

export { createUserUseCase, findUserUseCase };

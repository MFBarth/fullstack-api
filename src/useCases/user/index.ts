import { userRepo } from '@/repositories';
import { CreateUserUseCase } from './createUser.useCase';
import { FindUserUseCase } from './findUser.useCase';
import { UpdateUserUseCase } from './updateUser.useCase';
import { DeleteUserUseCase } from './deleteUser.useCase';

const createUserUseCase = new CreateUserUseCase(userRepo);
const findUserUseCase = new FindUserUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const deleteUserUseCase = new DeleteUserUseCase(userRepo);

export {
  createUserUseCase,
  findUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
};

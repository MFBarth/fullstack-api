import { userRepo } from '@/repositories';
import { CreateUserUseCase } from './createUser.useCase';
import { FindUserUseCase } from './findUser.useCase';
import { UpdateUserUseCase } from './updateUser.useCase';
import { DeleteUserUseCase } from './deleteUser.useCase';
import { FindAllUsersUseCase } from './findAllUsers.useCase';

const createUserUseCase = new CreateUserUseCase(userRepo);
const findUserUseCase = new FindUserUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const deleteUserUseCase = new DeleteUserUseCase(userRepo);
const findAllUserUseCase = new FindAllUsersUseCase(userRepo);

export {
  createUserUseCase,
  findUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  findAllUserUseCase,
};

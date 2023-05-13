import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

type FindAllUserResponse = User[];

export class FindAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FindAllUserResponse> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new Error('Não foi possível encontrar os usuários');
    }

    return users;
  }
}

import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

interface GetUserRequest {
  userId: string;
}

type FindUserResponse = User;

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<FindUserResponse> {
    const user = await this.userRepository.findById(request.userId);

    if (!user) {
      throw new Error('Não foi possível encontrar o usuário');
    }

    return user;
  }
}

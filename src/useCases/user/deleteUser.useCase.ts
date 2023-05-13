import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

interface DeleteUserRequest {
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<User> {
    const user = await this.userRepository.delete(request.userId);

    if (!user) {
      throw new Error('Não foi possível deletar o usuário.');
    }

    return user;
  }
}

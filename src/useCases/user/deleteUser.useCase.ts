import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

interface DeleteUserRequest {
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<void> {
    await this.userRepository.delete(request.userId);
  }
}

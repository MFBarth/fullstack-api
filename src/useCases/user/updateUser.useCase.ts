import { UserUpdateDTO } from '@/dtos/user.dto';
import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

type UpdateUserRequest = UserUpdateDTO;
type UpdateUserResponse = User;

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.update(request.id, { ...request });

    if (!user) {
      throw new Error('Não foi possível atualizar o usuário.');
    }

    return user;
  }
}

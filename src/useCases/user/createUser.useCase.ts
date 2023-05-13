import { UserDTO } from '@/dtos/user.dto';
import { UserRepository } from '@/repositories/user.repo';
import { User } from '@prisma/client';

type CreateUserResponse = User;

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    lastName,
    cpf,
    phone,
    birthDay,
  }: UserDTO): Promise<CreateUserResponse> {
    const user = this.userRepository.create({
      name,
      lastName,
      cpf,
      phone,
      birthDay,
    });

    return user;
  }
}

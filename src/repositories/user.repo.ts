import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<User>;
}

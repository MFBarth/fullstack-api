import { Prisma, User } from '@prisma/client';

import { prisma } from '@/infra/database/prisma';
import { UserRepository } from '../user.repo';

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}

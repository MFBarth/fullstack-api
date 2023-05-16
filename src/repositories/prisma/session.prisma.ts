import { Prisma, Session } from '@prisma/client';

import { prisma } from '@/infra/database/prisma';
import { SessionRepository } from '../session.repo';

export class PrismaSessionRepository implements SessionRepository {
  async find(email: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: {
        email,
      },
    });

    return session;
  }
}

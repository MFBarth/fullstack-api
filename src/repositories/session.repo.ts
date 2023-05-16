import { Prisma, Session } from '@prisma/client';

export interface SessionRepository {
  find(email: string): Promise<Session | null>;
}

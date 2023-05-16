import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

import { env } from '@/env';

const prisma = new PrismaClient();

async function main() {
  const createUserForSession = await prisma.session.upsert({
    where: { email: env.DEFAULT_USER },
    update: {},
    create: {
      email: env.DEFAULT_USER,
      password_hash: await hash(env.DEFAULT_PASSWORD, 8),
    },
  });

  console.log({ createUserForSession });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

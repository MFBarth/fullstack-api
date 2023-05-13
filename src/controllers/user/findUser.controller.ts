import { Request, Response } from 'express';
import { z } from 'zod';

import { findUserUseCase } from '@/useCases/user';

const requestSchema = z.object({
  userId: z
    .string({
      required_error: 'User id is required',
    })
    .uuid({
      message: 'User id must be a valid uuid',
    }),
});

export async function findUserController(request: Request, response: Response) {
  const dtoResult = requestSchema.safeParse(request.query);

  if (!dtoResult.success) {
    throw new Error(
      `Não foi possível buscar o usuário. Erro: ${dtoResult.error.message}`
    );
  }

  const user = findUserUseCase.execute(dtoResult.data);

  return response.status(200).json(user);
}

import { Request, Response } from 'express';

import { updateUserBodySchema } from '@/dtos/user.dto';

import { updateUserUseCase } from '@/useCases/user';

export async function updateUserController(
  request: Request,
  response: Response
) {
  const dtoResult = updateUserBodySchema.safeParse(request.body);

  if (!dtoResult.success) {
    throw new Error(
      `Não foi possível atualizar o usuário. Erro: ${dtoResult.error.message}`
    );
  }

  const user = updateUserUseCase.execute(dtoResult.data);

  return response.status(200).json(user);
}

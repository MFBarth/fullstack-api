import { createUserBodySchema } from '@/dtos/user.dto';
import { createUserUseCase } from '@/useCases/user';
import { Request, Response } from 'express';

export async function createUserController(
  request: Request,
  response: Response
) {
  const dtoResult = createUserBodySchema.safeParse(request.body);

  if (!dtoResult.success) {
    throw new Error(
      `Não foi possível criar o usuário. Erro: ${dtoResult.error.message}`
    );
  }

  const user = createUserUseCase.execute(dtoResult.data);

  return response.status(200).json(user);
}

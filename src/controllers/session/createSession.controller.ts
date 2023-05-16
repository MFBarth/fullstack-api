import { Request, Response } from 'express';

import { createSessionSchema } from '@/dtos/session.dto';
import { createSessionUseCase } from '@/useCases/session';

export async function createSessionController(
  request: Request,
  response: Response
) {
  const dtoResult = createSessionSchema.safeParse(request.body);

  if (!dtoResult.success) {
    throw new Error(
      `Não foi possível criar a seção. Erro: ${dtoResult.error.message}`
    );
  }

  const session = await createSessionUseCase.execute(dtoResult.data);

  return response.status(200).json(session);
}

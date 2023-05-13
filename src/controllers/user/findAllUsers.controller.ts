import { Request, Response } from 'express';

import { findAllUserUseCase } from '@/useCases/user';

export async function findAllUsersController(
  request: Request,
  response: Response
) {
  const users = await findAllUserUseCase.execute();

  return response.status(200).json(users);
}

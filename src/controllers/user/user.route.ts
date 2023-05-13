import { Router } from 'express';
import { createUserController } from './createUser.controller';
import { findUserController } from './findUser.controller';

export async function userRoutes() {
  const app = Router();

  app.post('/create', createUserController);
  app.get('/find', findUserController);
}

import { Router } from 'express';
import { createUserController } from './createUser.controller';

export async function userRoutes() {
  const app = Router();

  app.post('/users', createUserController);
}

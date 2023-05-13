import { Router } from 'express';
import { createUserController } from './createUser.controller';
import { findUserController } from './findUser.controller';
import { updateUserController } from './updateUser.controller';
import { findAllUsersController } from './findAllUsers.controller';

export async function userRoutes() {
  const app = Router();

  app.post('/create', createUserController);
  app.get('/find', findUserController);
  app.put('/update', updateUserController);
  app.delete('/delete', updateUserController);
  app.get('/findAll', findAllUsersController);
}

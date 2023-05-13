import { Router } from 'express';
import { createUserController } from './createUser.controller';
import { findUserController } from './findUser.controller';
import { updateUserController } from './updateUser.controller';
import { findAllUsersController } from './findAllUsers.controller';

const routes = Router();

routes.post('/create', createUserController);
routes.get('/find', findUserController);
routes.put('/update', updateUserController);
routes.delete('/delete', updateUserController);
routes.get('/findAll', findAllUsersController);

export default routes;

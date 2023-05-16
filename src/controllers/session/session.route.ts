import { Router } from 'express';
import { createSessionController } from './createSession.controller';

const routes = Router();

routes.post('/', createSessionController);

export default routes;

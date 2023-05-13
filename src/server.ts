import express from 'express';

import { env } from '@/env';
import { userRoutes } from './controllers/user/user.route';

const app = express();

app.use(userRoutes);

app.listen(env.API_PORT, () => {
  console.log(`▶️ Server started on port ${env.API_PORT}!`);
});

import express from 'express';

import { env } from '@/env';
import { ensureAuthenticated } from './middlewares/ensureAuthenticate';
import userRoutes from './controllers/user/user.route';
import sessionRoutes from './controllers/session/session.route';

const app = express();

app.use(express.json());
app.use('/api/session', sessionRoutes);
app.use('/api/user', ensureAuthenticated, userRoutes);
app.use(express.static(__dirname + '/public'));

app.get('/login', (_, res) => {
  res.status(200).sendFile(__dirname + '/public/html/login.html');
});

app.get('/', ensureAuthenticated, (_, res) => {
  res.status(200).sendFile(__dirname + '/public/html/home.html');
});

app.listen(env.API_PORT, () => {
  console.log(`▶️ Server started on port ${env.API_PORT}!`);
});

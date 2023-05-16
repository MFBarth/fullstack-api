import express from 'express';
import http from 'http';

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

const server = http.createServer(app);
server.listen(env.API_PORT, env.API_HOST, () => {
  console.log(`Server running at http://${env.API_HOST}:${env.API_PORT}/`);
});

import express from 'express';

import { env } from '@/env';

const app = express();

app.listen(env.API_PORT, () => {
  console.log(`▶️ Server started on port ${env.API_PORT}!`);
});

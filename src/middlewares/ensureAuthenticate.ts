import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { env } from '@/env';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.redirect('/login');
    throw new Error('User is not authenticated');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, env.SECRET);

    return next();
  } catch {
    response.redirect('/login');
    throw new Error('Invalid JWT token');
  }
}

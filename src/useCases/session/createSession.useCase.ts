import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { SessionDTO } from '@/dtos/session.dto';
import { SessionRepository } from '@/repositories/session.repo';
import { env } from '@/env';

export class CreateSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute({ email, password }: SessionDTO): Promise<string> {
    const session = await this.sessionRepository.find(email);

    if (!session) {
      throw new Error('Email ou Senha incorretos.');
    }

    const passwordMatched = await compare(password, session.password_hash);

    if (!passwordMatched) {
      throw new Error('Email ou Senha incorretos.');
    }

    const token = sign({}, env.SECRET, {
      subject: session.id,
      expiresIn: '1d',
    });

    return token;
  }
}

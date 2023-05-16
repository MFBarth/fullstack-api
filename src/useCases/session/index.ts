import { sessionRepo } from '@/repositories';
import { CreateSessionUseCase } from './createSession.useCase';

const createSessionUseCase = new CreateSessionUseCase(sessionRepo);

export { createSessionUseCase };

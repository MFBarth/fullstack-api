import { z } from 'zod';

export interface SessionDTO {
  email: string;
  password: string;
}

export const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

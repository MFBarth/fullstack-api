import { z } from 'zod';

export interface UserDTO {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  birthDay: string;
}

export const createUserBodySchema = z.object({
  name: z.string(),
  lastName: z.string(),
  cpf: z.string(),
  phone: z.string(),
  birthDay: z.string(),
});

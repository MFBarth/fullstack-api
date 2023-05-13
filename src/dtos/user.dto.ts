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

export interface UserUpdateDTO {
  id: string;
  name?: string;
  lastName?: string;
  cpf?: string;
  phone?: string;
  birthDay?: string;
}

export const updateUserBodySchema = z.object({
  id: z
    .string({
      required_error: 'User id is required',
    })
    .uuid({
      message: 'User id must be a valid uuid',
    }),
  name: z.string().optional(),
  lastName: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  birthDay: z.string().optional(),
});

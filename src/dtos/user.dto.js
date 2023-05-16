"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBodySchema = exports.createUserBodySchema = void 0;
const zod_1 = require("zod");
exports.createUserBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    lastName: zod_1.z.string(),
    cpf: zod_1.z.string(),
    phone: zod_1.z.string(),
    birthDay: zod_1.z.string(),
});
exports.updateUserBodySchema = zod_1.z.object({
    id: zod_1.z
        .string({
        required_error: 'User id is required',
    })
        .uuid({
        message: 'User id must be a valid uuid',
    }),
    name: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    cpf: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    birthDay: zod_1.z.string().optional(),
});

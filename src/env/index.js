"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    API_PORT: zod_1.z.coerce.number().default(5000),
    API_HOST: zod_1.z.string().default('localhost'),
    SECRET: zod_1.z.string().default('SECRET'),
    DEFAULT_USER: zod_1.z.string().default('test@test.com'),
    DEFAULT_PASSWORD: zod_1.z.string().default('senha123'),
    DATABASE_NAME: zod_1.z.string().default('test'),
    DATABASE_USERNAME: zod_1.z.string().default('postgres'),
    DATABASE_PASSWORD: zod_1.z.string().default('postgres'),
    DATABASE_PORT: zod_1.z.coerce.number().default(5432),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('Invalid environment variables!', _env.error.format());
    throw new Error('Invalid environment variables!');
}
exports.env = _env.data;

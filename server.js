"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express3 = __toESM(require("express"));

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  API_PORT: import_zod.z.coerce.number().default(5e3),
  SECRET: import_zod.z.string().default("SECRET"),
  DEFAULT_USER: import_zod.z.string().default("test@test.com"),
  DEFAULT_PASSWORD: import_zod.z.string().default("senha123"),
  DATABASE_NAME: import_zod.z.string().default("test"),
  DATABASE_USERNAME: import_zod.z.string().default("postgres"),
  DATABASE_PASSWORD: import_zod.z.string().default("postgres"),
  DATABASE_PORT: import_zod.z.coerce.number().default(5432)
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variables!");
}
var env = _env.data;

// src/middlewares/ensureAuthenticate.ts
var import_jsonwebtoken = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
  const accessToken = request.headers.cookie;
  if (!accessToken) {
    response.redirect("/login");
    throw new Error("User is not authenticated");
  }
  const [, token] = accessToken.split("=");
  try {
    (0, import_jsonwebtoken.verify)(token, env.SECRET);
    return next();
  } catch {
    response.redirect("/login");
    throw new Error("Invalid JWT token");
  }
}

// src/controllers/user/user.route.ts
var import_express = require("express");

// src/dtos/user.dto.ts
var import_zod2 = require("zod");
var createUserBodySchema = import_zod2.z.object({
  name: import_zod2.z.string(),
  lastName: import_zod2.z.string(),
  cpf: import_zod2.z.string(),
  phone: import_zod2.z.string(),
  birthDay: import_zod2.z.string()
});
var updateUserBodySchema = import_zod2.z.object({
  id: import_zod2.z.string({
    required_error: "User id is required"
  }).uuid({
    message: "User id must be a valid uuid"
  }),
  name: import_zod2.z.string().optional(),
  lastName: import_zod2.z.string().optional(),
  cpf: import_zod2.z.string().optional(),
  phone: import_zod2.z.string().optional(),
  birthDay: import_zod2.z.string().optional()
});

// src/infra/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/repositories/prisma/user.prisma.ts
var PrismaUserRepository = class {
  async create(data) {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user;
  }
  async update(id, data) {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }
  async delete(id) {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }
  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }
};

// src/repositories/prisma/session.prisma.ts
var PrismaSessionRepository = class {
  async find(email) {
    const session = await prisma.session.findUnique({
      where: {
        email
      }
    });
    return session;
  }
};

// src/repositories/index.ts
var userRepo = new PrismaUserRepository();
var sessionRepo = new PrismaSessionRepository();

// src/useCases/user/createUser.useCase.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    name,
    lastName,
    cpf,
    phone,
    birthDay
  }) {
    const user = await this.userRepository.create({
      name,
      lastName,
      cpf,
      phone,
      birthDay
    });
    return user;
  }
};

// src/useCases/user/findUser.useCase.ts
var FindUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new Error("N\xE3o foi poss\xEDvel encontrar o usu\xE1rio");
    }
    return user;
  }
};

// src/useCases/user/updateUser.useCase.ts
var UpdateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    const user = await this.userRepository.update(request.id, { ...request });
    if (!user) {
      throw new Error("N\xE3o foi poss\xEDvel atualizar o usu\xE1rio.");
    }
    return user;
  }
};

// src/useCases/user/deleteUser.useCase.ts
var DeleteUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    const user = await this.userRepository.delete(request.userId);
    if (!user) {
      throw new Error("N\xE3o foi poss\xEDvel deletar o usu\xE1rio.");
    }
    return user;
  }
};

// src/useCases/user/findAllUsers.useCase.ts
var FindAllUsersUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute() {
    const users = await this.userRepository.findAll();
    if (!users) {
      throw new Error("N\xE3o foi poss\xEDvel encontrar os usu\xE1rios");
    }
    return users;
  }
};

// src/useCases/user/index.ts
var createUserUseCase = new CreateUserUseCase(userRepo);
var findUserUseCase = new FindUserUseCase(userRepo);
var updateUserUseCase = new UpdateUserUseCase(userRepo);
var deleteUserUseCase = new DeleteUserUseCase(userRepo);
var findAllUserUseCase = new FindAllUsersUseCase(userRepo);

// src/controllers/user/createUser.controller.ts
async function createUserController(request, response) {
  const dtoResult = createUserBodySchema.safeParse(request.body);
  if (!dtoResult.success) {
    throw new Error(
      `N\xE3o foi poss\xEDvel criar o usu\xE1rio. Erro: ${dtoResult.error.message}`
    );
  }
  const user = await createUserUseCase.execute(dtoResult.data);
  return response.status(200).json(user);
}

// src/controllers/user/findUser.controller.ts
var import_zod3 = require("zod");
var requestSchema = import_zod3.z.object({
  userId: import_zod3.z.string({
    required_error: "User id is required"
  }).uuid({
    message: "User id must be a valid uuid"
  })
});
async function findUserController(request, response) {
  const dtoResult = requestSchema.safeParse(request.query);
  if (!dtoResult.success) {
    throw new Error(
      `N\xE3o foi poss\xEDvel buscar o usu\xE1rio. Erro: ${dtoResult.error.message}`
    );
  }
  const user = await findUserUseCase.execute(dtoResult.data);
  return response.status(200).json(user);
}

// src/controllers/user/updateUser.controller.ts
async function updateUserController(request, response) {
  const dtoResult = updateUserBodySchema.safeParse(request.body);
  if (!dtoResult.success) {
    throw new Error(
      `N\xE3o foi poss\xEDvel atualizar o usu\xE1rio. Erro: ${dtoResult.error.message}`
    );
  }
  const user = await updateUserUseCase.execute(dtoResult.data);
  return response.status(200).json(user);
}

// src/controllers/user/deleteUser.controller.ts
var import_zod4 = require("zod");
var requestSchema2 = import_zod4.z.object({
  userId: import_zod4.z.string({
    required_error: "User id is required"
  }).uuid({
    message: "User id must be a valid uuid"
  })
});
async function deleteUserController(request, response) {
  const dtoResult = requestSchema2.safeParse(request.query);
  if (!dtoResult.success) {
    throw new Error(
      `N\xE3o foi poss\xEDvel deletar o usu\xE1rio. Erro: ${dtoResult.error.message}`
    );
  }
  const { name } = await deleteUserUseCase.execute(dtoResult.data);
  return response.status(200).send(`Usu\xE1rio ${name}, foi deletado com sucesso.`);
}

// src/controllers/user/findAllUsers.controller.ts
async function findAllUsersController(request, response) {
  const users = await findAllUserUseCase.execute();
  return response.status(200).json(users);
}

// src/controllers/user/user.route.ts
var routes = (0, import_express.Router)();
routes.post("/create", createUserController);
routes.get("/find", findUserController);
routes.put("/update", updateUserController);
routes.delete("/delete", deleteUserController);
routes.get("/findAll", findAllUsersController);
var user_route_default = routes;

// src/controllers/session/session.route.ts
var import_express2 = require("express");

// src/dtos/session.dto.ts
var import_zod5 = require("zod");
var createSessionSchema = import_zod5.z.object({
  email: import_zod5.z.string().email(),
  password: import_zod5.z.string()
});

// src/useCases/session/createSession.useCase.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken2 = require("jsonwebtoken");
var CreateSessionUseCase = class {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }
  async execute({ email, password }) {
    const session = await this.sessionRepository.find(email);
    if (!session) {
      throw new Error("Email ou Senha incorretos.");
    }
    const passwordMatched = await (0, import_bcryptjs.compare)(password, session.password_hash);
    if (!passwordMatched) {
      throw new Error("Email ou Senha incorretos.");
    }
    const token = (0, import_jsonwebtoken2.sign)({}, env.SECRET, {
      subject: session.id,
      expiresIn: "1d"
    });
    return token;
  }
};

// src/useCases/session/index.ts
var createSessionUseCase = new CreateSessionUseCase(sessionRepo);

// src/controllers/session/createSession.controller.ts
async function createSessionController(request, response) {
  const dtoResult = createSessionSchema.safeParse(request.body);
  if (!dtoResult.success) {
    throw new Error(
      `N\xE3o foi poss\xEDvel criar a se\xE7\xE3o. Erro: ${dtoResult.error.message}`
    );
  }
  const session = await createSessionUseCase.execute(dtoResult.data);
  response.cookie("accessToken", session);
  return response.status(200).json(session);
}

// src/controllers/session/session.route.ts
var routes2 = (0, import_express2.Router)();
routes2.post("/", createSessionController);
var session_route_default = routes2;

// src/server.ts
var app = (0, import_express3.default)();
app.use(import_express3.default.json());
app.use("/api/session", session_route_default);
app.use("/api/user", ensureAuthenticated, user_route_default);
app.use(import_express3.default.static(__dirname + "/public"));
app.get("/login", (_, res) => {
  res.status(200).render(__dirname + "/public/html/login.html");
});
app.get("/", ensureAuthenticated, (_, res) => {
  res.status(200).sendFile(__dirname + "/public/html/home.html");
});
app.listen(env.API_PORT, () => {
  console.log(`\u25B6\uFE0F Server started on port ${env.API_PORT}!`);
});

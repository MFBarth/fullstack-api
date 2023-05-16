"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsersController = void 0;
const user_1 = require("@/useCases/user");
async function findAllUsersController(request, response) {
    const users = await user_1.findAllUserUseCase.execute();
    return response.status(200).json(users);
}
exports.findAllUsersController = findAllUsersController;

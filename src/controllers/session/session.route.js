"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSession_controller_1 = require("./createSession.controller");
const routes = (0, express_1.Router)();
routes.post('/', createSession_controller_1.createSessionController);
exports.default = routes;

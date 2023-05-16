"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("@/env");
function ensureAuthenticated(request, response, next) {
    const accessToken = request.headers.cookie;
    if (!accessToken) {
        response.redirect('/login');
        throw new Error('User is not authenticated');
    }
    const [, token] = accessToken.split('=');
    try {
        (0, jsonwebtoken_1.verify)(token, env_1.env.SECRET);
        return next();
    }
    catch {
        response.redirect('/login');
        throw new Error('Invalid JWT token');
    }
}
exports.ensureAuthenticated = ensureAuthenticated;

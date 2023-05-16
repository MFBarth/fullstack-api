"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("@/env");
const ensureAuthenticate_1 = require("./middlewares/ensureAuthenticate");
const user_route_1 = __importDefault(require("./controllers/user/user.route"));
const session_route_1 = __importDefault(require("./controllers/session/session.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/session', session_route_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup());
app.use('/api/user', ensureAuthenticate_1.ensureAuthenticated, user_route_1.default);
app.use(express_1.default.static(__dirname + '/public'));
app.get('/login', (_, res) => {
    res.status(200).sendFile(__dirname + '/public/html/login.html');
});
app.get('/', ensureAuthenticate_1.ensureAuthenticated, (_, res) => {
    res.status(200).sendFile(__dirname + '/public/html/home.html');
});
app.listen(env_1.env.API_PORT, () => {
    console.log(`▶️ Server started on port ${env_1.env.API_PORT}!`);
});

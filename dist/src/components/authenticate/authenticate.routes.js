"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRouter = void 0;
const express_1 = require("express");
const login_controller_1 = require("./controllers/login.controller");
const register_controller_1 = require("./controllers/register.controller");
const endpointValidation_1 = require("../../middleware/validation/endpointValidation");
const router = (0, express_1.Router)();
function initMiddleware(router) { }
initMiddleware(router);
function bundleRoutes(router) {
    router.post("/login", (0, endpointValidation_1.endpointValidation)(["name", "email", "password"]), login_controller_1.login);
    router.post("/register", (0, endpointValidation_1.endpointValidation)(["name", "surname", "username", "email", "password"]), register_controller_1.register);
}
bundleRoutes(router);
exports.authenticateRouter = router;

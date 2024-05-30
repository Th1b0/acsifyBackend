"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./controllers/user.controller");
const router = (0, express_1.Router)();
function initMiddleware(router) { }
initMiddleware(router);
function bundleRoutes(router) {
    router.get("/data", user_controller_1.userData);
}
bundleRoutes(router);
exports.userRouter = router;

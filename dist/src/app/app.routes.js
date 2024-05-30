"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const authenticate_routes_1 = require("../components/authenticate/authenticate.routes");
const event_routes_1 = require("../components/event/event.routes");
const user_routes_1 = require("../components/user/user.routes");
const authorize_routes_1 = require("../components/authorize/authorize.routes");
const guard_1 = require("../middleware/authenticate/guard/guard");
const router = (0, express_1.Router)();
function initMiddleware(router) { }
initMiddleware(router);
function bundleRoutes(router) {
    router.use("/authenticate", authenticate_routes_1.authenticateRouter);
    router.use("/authorize", authorize_routes_1.authorizeRouter);
    router.use("/event", guard_1.guard, event_routes_1.eventRouter);
    router.use("/user", guard_1.guard, user_routes_1.userRouter);
}
bundleRoutes(router);
exports.appRouter = router;

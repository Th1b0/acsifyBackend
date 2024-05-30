import { Router } from "express";
import { authenticateRouter } from "../components/authenticate/authenticate.routes";
import { eventRouter } from "../components/event/event.routes";
import { userRouter } from "../components/user/user.routes";
import { authorizeRouter } from "../components/authorize/authorize.routes";
import { guard } from "../middleware/authenticate/guard/guard";
import { visitRouter } from "../components/visit/visit.routes";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.use("/authenticate", authenticateRouter);
  router.use("/authorize", authorizeRouter);
  router.use("/event", eventRouter);
  router.use("/user", guard, userRouter);
  router.use("/visit", visitRouter);
}

bundleRoutes(router);

export const appRouter: Router = router;

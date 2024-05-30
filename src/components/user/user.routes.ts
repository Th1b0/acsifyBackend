import { Router } from "express";
import { userData } from "./controllers/user.controller";
import { guard } from "../../middleware/authenticate/guard/guard";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.get("/data", guard, userData);
}

bundleRoutes(router);

export const userRouter: Router = router;

import { Router } from "express";
import { createVisit } from "./controllers/create.controller";
import { guard } from "../../middleware/authenticate/guard/guard";
import { getVisit } from "./controllers/get.controller.";
import { updateBalance } from "./controllers/addBalance.controller";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.post("/create", guard, createVisit);
  router.get("/get", guard, getVisit);
  router.post("/update", updateBalance);
}

bundleRoutes(router);

export const visitRouter: Router = router;

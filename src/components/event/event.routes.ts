import { Router } from "express";

import { endpointValidation } from "../../middleware/validation/endpointValidation";
import {
  createEvent,
  createdGet,
  getEvent,
} from "./controllers/create.controller";
import { guard } from "../../middleware/authenticate/guard/guard";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.get("/get", getEvent);
  router.post("/create", guard, createEvent);
  router.get("/get/created", guard, createdGet);
}

bundleRoutes(router);

export const eventRouter: Router = router;

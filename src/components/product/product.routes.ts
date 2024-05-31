import { Router } from "express";

import { endpointValidation } from "../../middleware/validation/endpointValidation";
import { get } from "./controllers/get.controller";
import { create } from "./controllers/create.controller";
import { deletePro } from "./controllers/delete.controller";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.get("/get", get);
  router.post("/create", endpointValidation(["name", "price"]), create);
  router.post("/delete", endpointValidation(["name", "price"]), deletePro);
}

bundleRoutes(router);

export const productRouer: Router = router;

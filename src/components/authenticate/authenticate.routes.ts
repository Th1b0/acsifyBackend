import { Router } from "express";
import { login, loginCreated } from "./controllers/login.controller";
import { register } from "./controllers/register.controller";
import { endpointValidation } from "../../middleware/validation/endpointValidation";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {
  router.post("/login", endpointValidation(["email", "password"]), login);
  router.post(
    "/register",
    endpointValidation(["name", "surname", "email", "password"]),
    register
  );
  router.post("/login/worker", loginCreated);
}

bundleRoutes(router);

export const authenticateRouter: Router = router;

import { Router } from "express";

const router: Router = Router();

function initMiddleware(router: Router) {}

initMiddleware(router);

function bundleRoutes(router: Router) {}

bundleRoutes(router);

export const authorizeRouter: Router = router;

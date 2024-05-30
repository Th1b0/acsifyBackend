"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
const db_1 = require("../../../../prisma/db");
function guard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionId = req.cookies.session;
            if (!sessionId) {
                throw {
                    status: 401,
                    message: "Not logged in",
                };
            }
            const checkSession = yield db_1.prisma.session.findFirst({
                where: {
                    id: sessionId,
                },
            });
            if (!checkSession) {
                throw {
                    status: 401,
                    message: "session invalid",
                };
            }
            res.locals.id = checkSession.userId;
            return next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.guard = guard;

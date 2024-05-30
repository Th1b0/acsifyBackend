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
exports.register = void 0;
const register_service_1 = require("../services/register.service");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const name = req.body.name;
            const surname = req.body.surname;
            const session = yield (0, register_service_1.registerService)(name, surname, username, email, password);
            res.cookie("session", session).json({
                status: "Succes",
                data: {
                    sessionId: session,
                },
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.register = register;

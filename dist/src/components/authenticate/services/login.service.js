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
exports.loginService = void 0;
const client_1 = require("@prisma/client");
const compare_1 = require("../../../utils/hashing/compare");
const prisma = new client_1.PrismaClient();
function loginService(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
                select: {
                    hash: true,
                    id: true,
                },
            });
            if (!user) {
                throw {
                    status: 400,
                    message: "No user found",
                };
            }
            const result = yield (0, compare_1.comparePasswords)(password, user.hash);
            if (!result) {
                throw {
                    status: 401,
                    message: "Password or user is wrong",
                };
            }
            else {
                const session = yield prisma.session.create({
                    data: {
                        valid: true,
                        userId: user.id,
                    },
                });
                if (!session) {
                    throw {
                        status: 500,
                        message: "Internal server Error",
                    };
                }
                return session.id;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.loginService = loginService;

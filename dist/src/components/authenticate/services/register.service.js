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
exports.registerService = void 0;
const client_1 = require("@prisma/client");
const hash_1 = require("../../../utils/hashing/hash");
const prisma = new client_1.PrismaClient();
function registerService(name, surname, username, email, password) {
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
            if (user) {
                throw {
                    status: 400,
                    message: "User already exist",
                };
            }
            const hash = yield (0, hash_1.hashPassword)(password);
            const result = yield prisma.user.create({
                data: {
                    email,
                    username,
                    surname: surname,
                    name,
                    hash,
                },
                select: {
                    id: true,
                },
            });
            if (!result) {
                throw {
                    status: 500,
                    message: "Internal server Error",
                };
            }
            else {
                const session = yield prisma.session.create({
                    data: {
                        valid: true,
                        userId: result.id,
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
exports.registerService = registerService;

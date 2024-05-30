import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "../../../utils/hashing/compare";

const prisma = new PrismaClient();

export async function loginService(email: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
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

    const result = await comparePasswords(password, user.hash);
    if (!result) {
      throw {
        status: 401,
        message: "Password or user is wrong",
      };
    } else {
      const session = await prisma.session.create({
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
  } catch (err) {
    throw err;
  }
}

import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "../../../utils/hashing/compare";
import { hashPassword } from "../../../utils/hashing/hash";

const prisma = new PrismaClient();

export async function registerService(
  name: string,
  surname: string,

  email: string,
  password: string
) {
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

    if (user) {
      throw {
        status: 400,
        message: "User already exist",
      };
    }

    const hash = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        email,
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
    } else {
      const session = await prisma.session.create({
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
  } catch (err) {
    throw err;
  }
}

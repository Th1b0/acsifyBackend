import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function userService(id: string) {
  console.log(id);
  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        surname: true,
        name: true,
        email: true,
        id: true,

        orders: {
          select: {
            products: {
              select: {
                name: true,
                description: true,
                price: true,
              },
            },
          },
        },
        visits: {
          select: {
            event: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
        createdEvents: {
          select: {
            name: true,
            description: true,
            tickets: true,
            createdAt: true,
          },
        },
      },
    });
    if (!userData) {
      throw {
        satus: "500",
        message: userData,
      };
    }

    return userData;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

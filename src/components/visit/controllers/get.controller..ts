import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { prisma } from "../../../../prisma/db";

export async function getVisit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.id;

    const data = await prisma.visit.findMany({
      where: {
        userId,
      },
      select: {
        balance: true,
        pin: true,
        id: true,
        event: {
          select: {
            name: true,
            description: true,
            cover: true,
            tickets: true,
            id: true,
            startDate: true,
            endData: true,
          },
        },
      },
    });
    return res.status(200).json({ status: "Succes", data });
  } catch (err) {
    next(err);
  }
}

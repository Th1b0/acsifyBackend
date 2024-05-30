import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { prisma } from "../../../../prisma/db";

export async function createVisit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventId: any = req.query.eventId;
    const userId: any = res.locals.id;
    console.log("PRISMA TEST");
    const data = await prisma.visit.create({
      data: {
        eventId,
        userId,
        type: "",
        balance: 0,
        pin: "",
      },
    });

    return res.status(200).json({ status: "Succes", data });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

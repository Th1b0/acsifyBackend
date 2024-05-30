import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { prisma } from "../../../../prisma/db";

export async function updateBalance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const visitId: any = req.query.visitId;
    const balance: any = req.query.balance;

    const baInt = parseFloat(balance);
    console.log("PRISMA TEST " + baInt);
    const data = await prisma.visit.update({
      where: {
        id: visitId,
      },
      data: {
        balance: {
          increment: baInt,
        },
      },
    });

    return res.status(200).json({ status: "Succes", data });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

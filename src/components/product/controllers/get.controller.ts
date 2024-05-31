import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/login.service";
import { prisma } from "../../../../prisma/db";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const workerCode = req.body.workerCode;

    const eventId: any = await prisma.event.findFirst({
      where: {
        workerCode,
      },
      select: {
        id: true,
      },
    });
    if (!eventId) {
      res.status(400).json({ error: "error" });
    }
    const data = await prisma.product.findMany({
      where: {
        eventId: eventId.id,
      },
      select: {
        name: true,
        price: true,
      },
    });

    res.json({ status: "Succes", data: { product: data } });
  } catch (err) {
    next(err);
  }
}

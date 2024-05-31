import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/login.service";
import { prisma } from "../../../../prisma/db";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const name = req.body.name;
    const price = req.body.price;
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
    const data = await prisma.product.create({
      data: {
        name,
        price,
        eventId,
      },
    });
    res.status(201).json({ status: "Succes", data: { product: data } });
  } catch (err) {
    next(err);
  }
}

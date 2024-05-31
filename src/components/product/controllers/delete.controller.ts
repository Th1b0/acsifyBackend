import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../../prisma/db";

export async function deletePro(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workerCode = req.body.workerCode;
    const id: any = req.query.id;

    const eventId: any = await prisma.event.findFirst({
      where: {
        workerCode,
      },
      select: {
        id: true,
      },
    });
    if (!eventId) {
      console.log(eventId);
      res.status(400).json({ error: "error" });
    }

    console.log(eventId);
    const data = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.status(201).json({ status: "Succes", data: { product: data } });
  } catch (err) {
    next(err);
  }
}

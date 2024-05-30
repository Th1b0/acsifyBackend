import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/login.service";
import { prisma } from "../../../../prisma/db";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);
    const session = await loginService(email, password);
    res
      .cookie("session", session)
      .json({ status: "Succes", data: { sessionId: session } });
  } catch (err) {
    next(err);
  }
}

export async function loginCreated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await prisma.event.findFirst({
      where: {
        workerCode: req.body.code,
      },
    });
    return res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
}

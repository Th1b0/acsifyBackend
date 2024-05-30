import { Request, Response, NextFunction } from "express";
import { registerService } from "../services/register.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;

    const session = await registerService(name, surname, email, password);
    res.cookie("session", session).json({
      status: "Succes",
      data: {
        sessionId: session,
      },
    });
  } catch (err) {
    next(err);
  }
}

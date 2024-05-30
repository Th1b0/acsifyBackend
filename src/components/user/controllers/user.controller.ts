import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";

export async function userData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await userService(res.locals.id);

    return res.status(200).json({ status: "Succes", data });
  } catch (err) {
    next(err);
  }
}

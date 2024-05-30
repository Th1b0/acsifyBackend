import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../../prisma/db";
export async function guard(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionId = req.cookies.session;

    if (!sessionId) {
      throw {
        status: 401,
        message: "Not logged in",
      };
    }
    const checkSession = await prisma.session.findFirst({
      where: {
        id: sessionId,
      },
      select: {
        userId: true,
      },
    });

    if (!checkSession) {
      throw {
        status: 401,
        message: "session invalid",
      };
    }
    res.locals.id = checkSession.userId;
    next();
  } catch (err) {
    next(err);
  }
}
